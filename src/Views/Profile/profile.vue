<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import axios from "axios";
import cropper from '@/components/cropper/squereCropper.vue';

export default {
    data() {
        return {
            data: {
                id: localStorage.getItem('id'),
                name: "",
                nickName: "",
                email: localStorage.getItem('email'),
                mobile: "",
                stateId: "",
                cityId: "",
                statusId: 0,
                address: "",
                moreInfo: "",
                password: "",
                confirmPassword: "",
                userTypeCFK: 0,
                zipCode: "",
                questionData: [],
            },

            dataImage: {
                id: 0,
                email : localStorage.getItem('email'),
                image: ""
            },

            cityName: "",

            showImageCropper: false,
            imageCropperSrc: null,
            base64Images: [],
            myFiles: [],

            states: [], // Will hold the list of states
            cities: [], // Will hold the list of cities for the selected state
        }
    },

    components: {
        cropper
    },

    emits: {

    },

    created() {
        // Call the function from the store directly when the component is created
        // this.fetchStates();
        // this.setData(this.getProfileData);
    },
    mounted() {
     
    },
    beforeUnmount() {
        // Properly destroy the instance when the component is unmounted
        if (this.iti) {
            this.iti.destroy();
        }
    },

    computed: {
        ...mapGetters("Users", ["getProfileData"]),

        
        userImage() {
            const imageUrl = this.getProfileData && this.getProfileData.image
                ? this.getProfileData.image
                : "/img/profile-icon.png";
            return imageUrl;
        }
    },
    methods: {
        ...mapActions("Users", ["CustomerProfileInfo", "CustomerUpdate", "CustomerImageUpdate"]),
        async setData(user) {

            this.data.id = user.id;
            this.data.name = user.name;
            this.data.nickName = user.nickName;
            this.data.email = user.email;
            this.data.mobile = user.mobile;
            this.data.address = user.address;
            this.data.moreInfo = user.moreInfo;
            this.data.userTypeCFK = user.userTypeCFK;
            this.data.zipCode = user.zipCode;

            console.log("user : " , user);
            console.log("this.data : " , this.data);
            this.data.stateId = user.stateId;
            await this.fetchCities(user.stateId);
            // Wait for the cities to load and then set the city ID
            this.data.cityId = user.cityId;
            this.data.statusId = user.statusId;
        },

        initFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });

            this.CustomerProfileInfo(this.data.email).then(Response => {
                this.setData(Response);
                loading.close();
            }).catch(error => {
                this.$moshaToast(error.response.data.message, {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                loading.close();
            });
        },

        GetData() {
            this.CustomerProfileInfo(this.data.email).then(Response => {
                this.setData(Response);

            }).catch(error => {
                this.$moshaToast(error.response.data.message, {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
            });
        },

        UpdateFunc() {
            if (this.checkUpdateValidation()) {

                const loading = ElLoading.service({
                    lock: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    text: "",
                });

                //console.log("this.data for update : ", this.data);
                this.CustomerUpdate(this.data).then(Response => {

                    this.$moshaToast('Updated profile successfully', {
                        hideProgressBar: 'false',
                        showIcon: 'true',
                        swipeClose: 'true',
                        type: 'success',
                        timeout: 3000,
                    });
                    loading.close();
                    this.GetData();
                    // $('#edit_personal_details').modal('hide');
                }).catch(error => {
                    this.$moshaToast(error.response.data.message, {
                        hideProgressBar: 'false',
                        position: 'top-center',
                        showIcon: 'true',
                        swipeClose: 'true',
                        type: 'warning',
                        timeout: 3000,
                    });
                    loading.close();
                });
            }
        },

        checkUpdateValidation() {
            if (this.data.name == "") {
                this.$moshaToast('enter a name', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.nickName == "") {
                this.$moshaToast('enter nickname', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.email == "") {
                this.$moshaToast('enter email', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.mobile == "") {
                this.$moshaToast('enter mobile', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            }

            else if (this.data.stateId == "") {
                this.$moshaToast('select state', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.cityId == "") {
                this.$moshaToast('select city', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            }

            return true;
        },

        UpdateImageFunc(image) {
            this.dataImage.image = image;

            if (this.checkUpdateImageValidation()) {

                const loading = ElLoading.service({
                    lock: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    text: "",
                });

                //console.log("this.data for update : ", this.data);
                this.CustomerImageUpdate(this.dataImage).then(Response => {
                    this.$moshaToast('Updated image successfully', {
                        hideProgressBar: 'false',
                        showIcon: 'true',
                        swipeClose: 'true',
                        type: 'success',
                        timeout: 3000,
                    });
                    loading.close();
                    this.GetData();
                    $('#cropper_modal').modal('hide');
                }).catch(error => {
                    this.$moshaToast(error.response.data.message, {
                        hideProgressBar: 'false',
                        position: 'top-center',
                        showIcon: 'true',
                        swipeClose: 'true',
                        type: 'warning',
                        timeout: 3000,
                    });
                    loading.close();
                });
            }
        },

        checkUpdateImageValidation() {
            if (this.dataImage.image == "") {
                this.$moshaToast('add your image', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            }

            return true;
        },

        formatCurrency(value) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: "USD",
                minimumFractionDigits: 0, // No decimals
                maximumFractionDigits: 0  // No decimals
            }).format(value);
        },

        passImgAsBase64(file) {
            var self = this;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const base64Image = reader.result;
                this.dataImage.image = base64Image;
                //self.base64Images.push(base64Image);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        },

        toggleCropperModal() {
            if ($('#cropper_modal').is(':visible')) {
                $('#cropper_modal').modal('hide');
            } else {
                $('#cropper_modal').modal('show');
            }
            //this.showImageCropper = !this.showImageCropper;
        },

        cropperImageLoud(imageFile) {
            //this.imageCropperSrc = URL.createObjectURL(imageFile);
        },

        // Fetch the states from the API
        async fetchStates() {
            try {
                const response = await axios.get("https://api.census.gov/data/2020/dec/pl?get=NAME&for=state:*", {
                    withCredentials: false,
                });
                // API returns the first element as headers, so we slice it off
                this.states = response.data;
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        },

        // Fetch cities based on the selected state
        async fetchCities(stateId) {
            try {
                const response = await axios.get(
                    `https://api.census.gov/data/2020/dec/pl?get=NAME&for=place:*&in=state:${stateId}`, {
                    withCredentials: false,
                });
                this.cities = response.data;
                //console.log(this.cities);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        },

        getStateName(state) {
            const selectedState = this.states.find(x => x[1] === state);
            if (selectedState) {
                this.getCityName(this.getProfileData.stateId, this.getProfileData.cityId);
                return selectedState[0];
            }
            return "";
        },

        async getCityName(stateId, cityId) {
            try {
                const response = await axios.get(
                    `https://api.census.gov/data/2020/dec/pl?get=NAME&for=place:*&in=state:${stateId}`, {
                    withCredentials: false,
                });
                // The response data is an array where the first element contains the column names
                // and the subsequent elements contain the city data.
                const cities = response.data;

                // Find the city that matches the cityId
                const city = cities.find(city => city[2] === cityId);

                if (city) {
                    const cityName = city[0]; // The city name is in the first column
                    this.cityName = cityName;
                    return cityName;
                } else {
                    console.error("City not found");
                    return "";
                }
            } catch (error) {
                console.error("Error fetching cities:", error);
                return "";
            }
        }

    }
};
</script>
<template>
    <!-- right side container -->
    <div class="col-12 col-lg-9">
        <div class="container white_card px-4 pt-4 pb-0 mt-3 mt-lg-0 right-side">
            <form method="" action="" class="mt-2">
                <div class="row ">
                        <div class="ads">
                            <div class="add">
                                <router-link to="/addVehicle" class="option"> اضافة مركبة 
                                    <svg viewBox="0 0 24 24" width="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z" fill="#292D32"></path> <path d="M16 11.25H12.75V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V11.25H8C7.59 11.25 7.25 11.59 7.25 12C7.25 12.41 7.59 12.75 8 12.75H11.25V16C11.25 16.41 11.59 16.75 12 16.75C12.41 16.75 12.75 16.41 12.75 16V12.75H16C16.41 12.75 16.75 12.41 16.75 12C16.75 11.59 16.41 11.25 16 11.25Z" fill="#292D32"></path> </g></svg>
                                </router-link>
                                <router-link to="/addAds" class="option"> اضافة اعلان 
                                    <svg viewBox="0 0 24 24" width="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z" fill="#292D32"></path> <path d="M16 11.25H12.75V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V11.25H8C7.59 11.25 7.25 11.59 7.25 12C7.25 12.41 7.59 12.75 8 12.75H11.25V16C11.25 16.41 11.59 16.75 12 16.75C12.41 16.75 12.75 16.41 12.75 16V12.75H16C16.41 12.75 16.75 12.41 16.75 12C16.75 11.59 16.41 11.25 16 11.25Z" fill="#292D32"></path> </g></svg>
                                </router-link>
                               
                                
                            </div>
                        </div>

                    <div class="d-flex  div-img-profile px-0 justify-content-lg-start mb-4">
                        <img data-bs-toggle="modal" data-bs-target="#cropper_modal" :src="userImage"
                            alt="profile-picture" class="img-fluid hero-profile-pic" id="output">

                        <div
                            class="upload_profile_div d-flex align-items-center justify-content-center justify-content-lg-start">
                            <label for="file-upload file" class="custom-file-upload">
                                <i class="fa-solid fa-plus" style="color: white;"></i>
                            </label>
                            <!-- <input id="file-upload file" type="file" class="upload_profile_input"
                                onchange="loadFile(event)"> -->
                            <a class="upload_profile_input" data-bs-toggle="modal" data-bs-target="#cropper_modal">
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <label class="label-form"> الاسم </label>
                        <input v-model="data.name" name="name" type="text"
                            class="form-control mt-2 mb-4 py-3 text-start list_link  gray-inp" placeholder="الاسم كامل">
                    </div>
                    
                    <div class="col-lg-6">
                        <label class="label-form"> البريد الالكتروني </label>
                        <input v-model="data.email" name="email" type="email"
                            class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp" placeholder="example@email.com">
                    </div>
                    <div class="col-lg-6">
                        <label class="label-form"> رقم الجوال </label>
                        <input v-model="data.mobile" name="mobile" id="phone" type="tel" ref="phoneInput"
                                        class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp" maxlength="10"
                                        placeholder="(201) 555-0123" aria-label="" aria-describedby="basic-addon1"
                                        required>

                        </div>
                    <div class="col-lg-6">
                        <label class="label-form"> عنوان السكن  </label>
                        <input v-model="data.addres" name="addres" type="text"
                            class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp" placeholder="عنوان السكن"
                            required="">
                    </div>

                    <div class="col-lg-6">
                        <label class="label-form"> المحافظة </label>
                        <select v-model="data.stateId"
                            class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp"
                            @change="fetchCities(data.stateId)">
                            <option value="" key="" selected>-- اختر المحافظة --</option>
                            <option v-for="item in states" :key="parseInt(item[1])" :value="item[1]">
                                {{ item[0] }}
                            </option>
                        </select>
                    </div>
                    <div class="col-lg-6">
                        <label class="label-form"> المدينة </label>
                        <select v-model="data.cityId" class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp"
                            :disabled="cities.length === 0">
                            <option value="" key="" selected>-- اختر المدينة --</option>
                            <option v-for="item in cities" :key="parseInt(item[2])" :value="item[2]">
                                {{ item[0] }}
                            </option>
                        </select>
                    </div>
                    <div class="col-lg-6">
                        <label class="label-form">  رخصة الشركة </label>
                        <input  name="" id="phone"
                                        class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp" maxlength="10"
                                        placeholder="(201) 555-0123" aria-label="" aria-describedby="basic-addon1"
                                        required>

                        </div>
                    <div class="col-lg-6">
                        <label class="label-form">  معلومات أخرى  </label>
                        <input v-model="data.addres" name="addres" type="text"
                            class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp" placeholder="أدخل معلومات أخرى"
                            required="">
                    </div>
                    <hr>
                    <div class="row justify-content-start">
                        <div class=" col-12 col-md-4 col-lg-3">

                            <input v-on:click="UpdateFunc()" type="button"
                                class=" form-control party-btn  w-100 my-4 py-3" value="تحديث البيانات">

                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <!-- end right side  -->

    <!-- Edit profile image Modal -->

    <!-- Modal structure -->

    <div class="modal fade" id="cropper_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">تحديث الصورة</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        <cropper @b64image="(x) => UpdateImageFunc(x)" @IsShow="(x) => toggleCropperModal()"
                            @copperImage="(x) => cropperImageLoud(x)"></cropper>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- /Edit profile image Modal -->
</template>
<style scoped></style>