<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import cropper from '@/components/cropper/squereCropper.vue';
import axios from "axios";
import { UserTypeEnum } from '@/config/config';


export default {
    data() {
        return {
            data: {
                id: localStorage.getItem('id'),
                name: "",
                email: "",
                mobile: "",
                userType: localStorage.getItem('userType'),
                ssn: "",
                licenseNumber: "",
                addressState: 0,
                addressCity: 0,
                addressInfo: "",
                moreInfo: "",
                password: "",
                confirmPassword: ""
            },

            changePasswordData: {
                userId: 0,
                email: "",
                mobile: "",
                sendWay: 0,
                oldPassword: "",
                newPassword: ""
            },

            userTypesData: {
                Admin: UserTypeEnum.Admin,
                Normal: UserTypeEnum.Normal,
                Compony: UserTypeEnum.Compony,
            },

            confirmPassword: "",
            imagePath: "",

            stateCities: [],
            showImageCropper: false,
            imageCropperSrc: null,
            base64Images: [],
            myFiles: [],

            emailError: '',
        }
    },
    mounted() {

    },

    components: {
        cropper
    },

    emits: {

    },

    created() {
        // Call the function from the store directly when the component is created
        this.initFunc();
    },

    computed: {
        ...mapGetters("Users", ["getUserData"]),
        ...mapGetters("Code", ["getStatesData", "getCitiesData"]),

        userImage() {
            const imageUrl = this.getUserData && this.getUserData.image
                ? this.getUserData.image
                : "/img/profile-icon.png";

            return imageUrl;
        }
    },

    methods: {
        ...mapActions("Users", ["CustomerProfileInfo", "CompanyProfileInfo", "CustomerProfileUpdate", "CompanyProfileUpdate", "UpdateCustomerImage", "UpdateCompanyImage", "ChangePassword"]),
        ...mapActions("Code", ["GetStates", "GetCities"]),

        clearData() {
            this.changePasswordData.userId = 0;
            this.changePasswordData.email = "";
            this.changePasswordData.mobile = "";
            this.changePasswordData.sendWay = 0;
            this.changePasswordData.oldPassword = "";
            this.changePasswordData.newPassword = "";
            this.confirmPassword = "";
        },
        ChangePasswordFunc() {
            if (this.checkValidation()) {
                const loading = ElLoading.service({
                    lock: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    text: "",
                });

                this.ChangePassword(this.changePasswordData).then(Response => {
                    // console.log(Response);
                    this.$moshaToast(this.$t('general_update_operation_success_message'), {
                        hideProgressBar: 'false',
                        showIcon: 'true',
                        swipeClose: 'true',
                        type: 'success',
                        timeout: 3000,
                    });
                    this.clearData();
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
            }
        },
        checkValidation() {
            if (this.changePasswordData.oldPassword.trim() == '') {
                this.$moshaToast(this.$t('password_old_check_message'), {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                // this.$refs.email.focus();
                return false;
            } else if (this.changePasswordData.newPassword.trim() == '') {
                this.$moshaToast(this.$t('password_new_check_message'), {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                // this.$refs.email.focus();
                return false;
            } else if (this.changePasswordData.newPassword.trim() != this.confirmPassword.trim()) {
                this.$moshaToast(this.$t('password_confirm_new_equal_check_message'), {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                // this.$refs.nickName.focus();
                return false;
            }

            return true;
        },

        async setData() {
            this.data.id = this.getUserData.id;
            this.data.name = this.getUserData.name;
            this.data.email = this.getUserData.email;
            this.data.mobile = this.getUserData.mobile;
            this.data.ssn = this.getUserData.ssn;
            this.data.licenseNumber = this.getUserData.licenseNumber;
            await this.setStatesCities(this.getUserData.addressStateId);
            this.data.addressState = this.getUserData.addressStateId;
            this.data.addressCity = this.getUserData.addressCityId;
            this.data.addressInfo = this.getUserData.addressInfo;
            this.data.moreInfo = this.getUserData.moreInfo;
        },

        initFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });

            if (this.data.userType == UserTypeEnum.Normal) {
                this.CustomerProfileInfo(this.data.id).then(Response => {
                    this.setData();
                    loading.close();
                }).catch(error => {
                    if (error.response && error.response.status === 401) {
                        this.$moshaToast(this.$t('general_user_not_allow_error_message'), {
                            hideProgressBar: 'false',
                            position: 'top-center',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'warning',
                            timeout: 3000,
                        });
                    } else {
                        // Handle other errors with the provided message from the response
                        this.$moshaToast(error.response?.data?.message || 'An error occurred', {
                            hideProgressBar: 'false',
                            position: 'top-center',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'warning',  // Default type is 'warning'
                            timeout: 3000,
                        });
                    }
                    loading.close();
                });
            } else {
                this.CompanyProfileInfo(this.data.id).then(Response => {
                    this.setData();
                    console.log("getUserData : ", this.getUserData);

                    loading.close();
                }).catch(error => {
                    if (error.response && error.response.status === 401) {
                        this.$moshaToast(this.$t('general_user_not_allow_error_message'), {
                            hideProgressBar: 'false',
                            position: 'top-center',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'warning',
                            timeout: 3000,
                        });
                    } else {
                        // Handle other errors with the provided message from the response
                        this.$moshaToast(error.response?.data?.message || 'An error occurred', {
                            hideProgressBar: 'false',
                            position: 'top-center',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'warning',  // Default type is 'warning'
                            timeout: 3000,
                        });
                    }
                    loading.close();
                });
            }

        },
        GetData() {
            if (this.data.userType == UserTypeEnum.Normal) {
                this.CustomerProfileInfo(this.data.id).then(Response => {
                    this.setData();
                }).catch(error => {
                    if (error.response && error.response.status === 401) {
                        this.$moshaToast(this.$t('general_user_not_allow_error_message'), {
                            hideProgressBar: 'false',
                            position: 'top-center',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'warning',
                            timeout: 3000,
                        });
                    } else {
                        // Handle other errors with the provided message from the response
                        this.$moshaToast(error.response?.data?.message || 'An error occurred', {
                            hideProgressBar: 'false',
                            position: 'top-center',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'warning',  // Default type is 'warning'
                            timeout: 3000,
                        });
                    }
                });
            } else {
                this.CompanyProfileInfo(this.data.id).then(Response => {
                    this.setData();
                }).catch(error => {
                    if (error.response && error.response.status === 401) {
                        this.$moshaToast(this.$t('general_user_not_allow_error_message'), {
                            hideProgressBar: 'false',
                            position: 'top-center',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'warning',
                            timeout: 3000,
                        });
                    } else {
                        // Handle other errors with the provided message from the response
                        this.$moshaToast(error.response?.data?.message || 'An error occurred', {
                            hideProgressBar: 'false',
                            position: 'top-center',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'warning',  // Default type is 'warning'
                            timeout: 3000,
                        });
                    }
                });
            }
        },

        UpdateFunc() {
            if (this.checkUpdateValidation()) {

                const loading = ElLoading.service({
                    lock: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    text: "",
                });

                if (this.data.userType == UserTypeEnum.Normal) {
                    this.CustomerProfileUpdate(this.data).then(Response => {
                        this.$moshaToast(this.$t('general_update_operation_success_message'), {
                            hideProgressBar: 'false',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'success',
                            timeout: 3000,
                        });
                        loading.close();
                        this.GetData();
                    }).catch(error => {
                        if (error.response && error.response.status === 401) {
                            this.$moshaToast(this.$t('general_user_not_allow_error_message'), {
                                hideProgressBar: 'false',
                                position: 'top-center',
                                showIcon: 'true',
                                swipeClose: 'true',
                                type: 'warning',
                                timeout: 3000,
                            });
                        } else {
                            // Handle other errors with the provided message from the response
                            this.$moshaToast(error.response?.data?.message || 'An error occurred', {
                                hideProgressBar: 'false',
                                position: 'top-center',
                                showIcon: 'true',
                                swipeClose: 'true',
                                type: 'warning',  // Default type is 'warning'
                                timeout: 3000,
                            });
                        }
                        loading.close();
                    });
                } else {
                    this.CompanyProfileUpdate(this.data).then(Response => {
                        this.$moshaToast(this.$t('general_update_operation_success_message'), {
                            hideProgressBar: 'false',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'success',
                            timeout: 3000,
                        });
                        loading.close();
                        this.GetData();
                    }).catch(error => {
                        if (error.response && error.response.status === 401) {
                            this.$moshaToast(this.$t('general_user_not_allow_error_message'), {
                                hideProgressBar: 'false',
                                position: 'top-center',
                                showIcon: 'true',
                                swipeClose: 'true',
                                type: 'warning',
                                timeout: 3000,
                            });
                        } else {
                            // Handle other errors with the provided message from the response
                            this.$moshaToast(error.response?.data?.message || 'An error occurred', {
                                hideProgressBar: 'false',
                                position: 'top-center',
                                showIcon: 'true',
                                swipeClose: 'true',
                                type: 'warning',  // Default type is 'warning'
                                timeout: 3000,
                            });
                        }
                        loading.close();
                    });
                }

            }
        },

        checkUpdateValidation() {
            if (this.data.name == "") {
                this.$moshaToast(this.$t('user_data_check_name'), {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.email == "") {
                this.$moshaToast(this.$t('user_data_check_email'), {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.mobile == "") {
                this.$moshaToast(this.$t('user_data_check_mobile'), {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            }
            else if (this.data.ssn == "") {
                this.$moshaToast(this.$t('user_data_check_ssn'), {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            }

            else if (this.data.addressState == 0) {
                this.$moshaToast(this.$t('user_data_check_state'), {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.addressCity == 0) {
                this.$moshaToast(this.$t('user_data_check_city'), {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.addressInfo == "") {
                this.$moshaToast(this.$t('user_data_check_address_info'), {
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
            this.imagePath = image;
            if (this.checkUpdateImageValidation()) {

                const loading = ElLoading.service({
                    lock: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    text: "",
                });
                if (this.data.userType == UserTypeEnum.Normal) {
                    this.UpdateCustomerImage(this.imagePath).then(Response => {
                        this.$moshaToast(this.$t('general_update_operation_success_message'), {
                            hideProgressBar: 'false',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'success',
                            timeout: 3000,
                        });
                        loading.close();
                        this.GetData();
                    }).catch(error => {
                        if (error.response && error.response.status === 401) {
                            this.$moshaToast(this.$t('general_user_not_allow_error_message'), {
                                hideProgressBar: 'false',
                                position: 'top-center',
                                showIcon: 'true',
                                swipeClose: 'true',
                                type: 'warning',
                                timeout: 3000,
                            });
                        } else {
                            // Handle other errors with the provided message from the response
                            this.$moshaToast(error.response?.data?.message || 'An error occurred', {
                                hideProgressBar: 'false',
                                position: 'top-center',
                                showIcon: 'true',
                                swipeClose: 'true',
                                type: 'warning',  // Default type is 'warning'
                                timeout: 3000,
                            });
                        }
                        loading.close();
                    });
                } else {
                    this.UpdateCompanyImage(this.imagePath).then(Response => {
                        this.$moshaToast(this.$t('general_update_operation_success_message'), {
                            hideProgressBar: 'false',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'success',
                            timeout: 3000,
                        });
                        loading.close();
                        this.GetData();
                    }).catch(error => {
                        if (error.response && error.response.status === 401) {
                            this.$moshaToast(this.$t('general_user_not_allow_error_message'), {
                                hideProgressBar: 'false',
                                position: 'top-center',
                                showIcon: 'true',
                                swipeClose: 'true',
                                type: 'warning',
                                timeout: 3000,
                            });
                        } else {
                            // Handle other errors with the provided message from the response
                            this.$moshaToast(error.response?.data?.message || 'An error occurred', {
                                hideProgressBar: 'false',
                                position: 'top-center',
                                showIcon: 'true',
                                swipeClose: 'true',
                                type: 'warning',  // Default type is 'warning'
                                timeout: 3000,
                            });
                        }
                        loading.close();
                    });
                }

            }
        },

        checkUpdateImageValidation() {
            if (this.imagePath == "") {
                this.$moshaToast(this.$t('user_data_check_image'), {
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

        validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Check if the input is empty
            if (!this.data.email) {
                this.emailError = '';
                return false;
            }
            // Check if the input does not match the email format
            else if (!emailPattern.test(this.data.email)) {
                this.emailError = this.$t('user_data_check_email_validation');
                return false;
            }
            // Clear the error if the input is valid
            else {
                this.emailError = '';
                return true;
            }
        },
        filterMobileInput(event) {
            const input = event.target.value.replace(/\D/g, '').slice(0, 10);
            this.data.mobile = input;
        },
        filterSSNInput(event) {
            const input = event.target.value.replace(/\D/g, '').slice(0, 9);
            this.data.ssn = input;
        },
        checkSSN(ssn) {
            let result = false;
            // Check if the length is 9
            if (ssn.length !== 9) {
                return result;
            }
            // Check if ssn converts to integer as 0
            if (parseInt(ssn) === 0) {
                return result;
            }
            let b = 0;
            for (let i = 0; i < ssn.length - 1; i++) {
                let a = parseInt(ssn.charAt(i));
                if (i % 2 === 1) {
                    a *= 2;
                    if (a > 9) {
                        const v = a % 10;
                        const v2 = Math.floor(a / 10);
                        a = v + v2;
                    }
                }
                b += a;
            }
            b = b % 10;
            b = 10 - b;
            if (b === 10) {
                b = 0;
            }
            if (b === parseInt(ssn.charAt(ssn.length - 1))) {
                result = true;
            }
            return result;
        },


        setStatesCities(state) {
            let res = this.getCitiesData.filter(x => x.state === state);
            if (res) {
                this.stateCities = [];
                this.data.addressCity = 0;
                this.stateCities = res;
            } else this.stateCities = [];
        },

        stateNameFunc(id) {
            let res = this.getStatesData.find(x => x.id === id);
            if (res) return res.name;
            else return "";
        },
        cityNameFunc(id) {
            let res = this.getCitiesData.find(x => x.id === id);
            if (res) return res.name;
            else return "";
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
                            <router-link :to="{ name: 'profile_add_vehicle' }" class="option">{{
                                $t('profile_btn_addVehicel') }}
                                <svg viewBox="0 0 24 24" width="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path opacity="0.4"
                                            d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z"
                                            fill="#292D32"></path>
                                        <path
                                            d="M16 11.25H12.75V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V11.25H8C7.59 11.25 7.25 11.59 7.25 12C7.25 12.41 7.59 12.75 8 12.75H11.25V16C11.25 16.41 11.59 16.75 12 16.75C12.41 16.75 12.75 16.41 12.75 16V12.75H16C16.41 12.75 16.75 12.41 16.75 12C16.75 11.59 16.41 11.25 16 11.25Z"
                                            fill="#292D32"></path>
                                    </g>
                                </svg>
                            </router-link>
                            <router-link :to="{ name: 'profile_add_ads' }" class="option">{{
                                $t('profile_btn_addAnnouncement') }}
                                <svg viewBox="0 0 24 24" width="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path opacity="0.4"
                                            d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z"
                                            fill="#292D32"></path>
                                        <path
                                            d="M16 11.25H12.75V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V11.25H8C7.59 11.25 7.25 11.59 7.25 12C7.25 12.41 7.59 12.75 8 12.75H11.25V16C11.25 16.41 11.59 16.75 12 16.75C12.41 16.75 12.75 16.41 12.75 16V12.75H16C16.41 12.75 16.75 12.41 16.75 12C16.75 11.59 16.41 11.25 16 11.25Z"
                                            fill="#292D32"></path>
                                    </g>
                                </svg>

                            </router-link>
                        </div>
                    </div>

                    <div class="d-flex  div-img-profile px-0 justify-content-lg-start mb-4">
                        <img loading="lazy" data-bs-toggle="modal" data-bs-target="#cropper_modal" :src="userImage"
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
                        <label class="label-form"> {{ $t('profile_input_name') }} </label>
                        <input v-model="data.name" name="name" type="text"
                            class="form-control mt-2 mb-4 py-3 text-start list_link  gray-inp" placeholder="الاسم كامل">
                    </div>

                    <div class="col-lg-6">
                        <label class="label-form"> {{ $t('profile_input_email') }} </label>
                        <input v-model="data.email" name="email" type="email"
                            class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp"
                            placeholder="example@email.com">
                    </div>
                    <div class="col-lg-6">
                        <label class="label-form"> {{ $t('profile_input_mobile') }} </label>
                        <input v-model="data.mobile" name="mobile" id="phone" type="tel" ref="phoneInput"
                            class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp" maxlength="10"
                            placeholder="(201) 555-0123" aria-label="" aria-describedby="basic-addon1" required>

                    </div>
                    <div class="col-lg-6">
                        <label class="label-form">{{ $t('profile_input_address') }} </label>
                        <input v-model="data.addressInfo" name="addressInfo" type="text"
                            class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp" placeholder="عنوان السكن"
                            required="">
                    </div>

                    <div class="col-lg-6">
                        <label class="label-form"> {{ $t('profile_input_state') }} </label>
                        <select v-model="data.addressState"
                            class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp"
                            @change="setStatesCities(data.addressState)">
                            <option value="0" key="0" selected>{{ $t('general_select_state') }}</option>
                            <option v-for="item in getStatesData" :key="parseInt(item.id)" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col-lg-6">
                        <label class="label-form"> {{ $t('profile_input_city') }} </label>
                        <select v-model="data.addressCity"
                            class="form-control mt-2 mb-4 py-3 text-start list_link gray-inp"
                            :disabled="!stateCities || stateCities.length === 0">
                            <option value="0" key="0" selected>{{ $t('general_select_city') }}</option>
                            <option v-for="item in stateCities" :key="parseInt(item.id)" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div v-if="data.userType == userTypesData.Normal" class="col-lg-6">
                        <label class="label-form"> {{ $t('profile_input_ssn') }} </label>
                        <input v-model="data.ssn" name="" id="ssn"
                            class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp" maxlength="10"
                            placeholder="(201) 555-0123" aria-label="" aria-describedby="basic-addon1" required>

                    </div>
                    <div v-else class="col-lg-6">
                        <label class="label-form"> {{ $t('profile_input_licenseNumber') }} </label>
                        <input v-model="data.licenseNumber" name="" id="licenseNumber"
                            class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp" maxlength="10"
                            placeholder="(201) 555-0123" aria-label="" aria-describedby="basic-addon1" required>

                    </div>
                    <div class="col-lg-6">
                        <label class="label-form"> {{ $t('profile_input_moreInfo') }} </label>
                        <input v-model="data.moreInfo" name="moreInfo" type="text"
                            class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp"
                            placeholder="أدخل معلومات أخرى" required="">
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