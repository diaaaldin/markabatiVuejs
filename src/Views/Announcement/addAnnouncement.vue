<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import cropperMainAnnouncement from '@/components/cropper/announcementMainCropper.vue';
import cropperHorizentalAnnouncement from '@/components/cropper/announcementHorizentalCropper.vue';
import { AnnouncementTypeEnum } from '@/config/config.js'


export default {
    data() {
        return {
            data: {
                Id: 0,
                message: "",
                image: "",
                durationDay: 0,
                announcementType: 0,
                totalPrice: 0,
                payBilImage: "",
                paymentMethod: 0,
            },

            //////////////////////////
            imageCropperSrc: null,
            base64Images: [],
            myFiles: [],

            AnnouncementType: AnnouncementTypeEnum,
            announcementPriceInDay: 0,
            orderDate: "",
            // editor: null,
        }
    },

    mounted() {
    },

    components: {
        cropperMainAnnouncement,
        cropperHorizentalAnnouncement,
    },

    emits: {

    },

    created() {
        // Call the function from the store directly when the component is created
        //this.checkUserAllowFunc();
        // this.initFunc();
    },

    computed: {
        ...mapGetters("Code", ["getAnnouncementTypesData"]),
        ...mapGetters("Orders", ["getOrderDateTime"]),
    },
    methods: {
        ...mapActions("Code", ["GetAnnouncementTypes"]),
        ...mapActions("Orders", ["CreateAnnouncementOrder", "GetAnnouncementOrderDate"]),

        async initFunc() {
            this.GetAnnouncementTypes();
        },

        checkUserAllowFunc() {
            // if (localStorage.getItem('typeName') != "Store") {
            //     this.$router.push({ name: 'storeLogin' });
            // }
        },

        createFunc() {
            if (this.checkAddValidation()) {
                const loading = ElLoading.service({
                    lock: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    text: "",
                });

                try {
                    // Proceed only if validation passes

                    this.CreateAnnouncementOrder(this.data).then((Response) => {
                        this.$moshaToast('تم إضافة الإعلان بنجاح', {
                            hideProgressBar: 'false',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'success',
                            timeout: 3000,
                        });
                        loading.close();
                        this.$router.push({ name: "announcement_managment" });
                    });

                } catch (error) {
                    this.$moshaToast(error.response?.data?.message || 'An error occurred', {
                        hideProgressBar: 'false',
                        position: 'top-center',
                        showIcon: 'true',
                        swipeClose: 'true',
                        type: 'warning',
                        timeout: 3000,
                    });
                    loading.close();
                }
            }
        },
        checkAddValidation() {
            if (this.data.announcementType == 0) {
                this.$moshaToast('إختر نوع الإعلان', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.image == "") {
                this.$moshaToast('أضف صورة الإعلان', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.durationDay == 0) {
                this.$moshaToast('حددالطلب بالأيام', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.durationDay > 30) {
                this.$moshaToast('الحد الأقصى للإعلان 30 يوم', {
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

        calculateTotalPrice() {
            let totalPrice = 0;
            if (this.data.announcementType > 0) {
                let foundItem = this.getAnnouncementTypesData.find(element => element.id === this.data.announcementType);
                if (foundItem) {
                    totalPrice = foundItem.value * this.data.durationDay;
                    this.announcementPriceInDay = foundItem.value;
                }

                return this.formatCurrency(totalPrice);
            }
        },
        ////////////////////////////
        ////////////////////////////
        ////////////////////////////

        checkImageDimensions(image) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    if (img.width > img.height) {
                        resolve(false); // Width greater than height, return false
                    } else {
                        resolve(true); // Valid dimensions, return true
                    }
                };
                img.onerror = () => {
                    reject(new Error("Failed to load image."));
                };
                img.src = image; // Trigger the image loading
            });
        },

        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    try {
                        const isValid = await this.checkImageDimensions(e.target.result);
                        if (!isValid) {
                            this.$moshaToast('في الإعلان الجانبي يجب أن يكون الطول أكبر من العرض', {
                                hideProgressBar: 'false',
                                position: 'top-center',
                                showIcon: 'true',
                                swipeClose: 'true',
                                type: 'warning',
                                timeout: 3000,
                            });
                        } else {
                            this.data.image = e.target.result;
                            this.imageCropperSrc = e.target.result; // Update with the file's data URL
                        }
                    } catch (err) {
                        console.error("Error checking image dimensions:", err);
                    }
                };
                reader.onerror = () => {
                    console.error("Failed to read the file.");
                };
                reader.readAsDataURL(file);
            }
        },



        toggleCropperModal() {
            if ($('#cropper_modal').is(':visible')) {
                $('#cropper_modal').modal('hide');
            } else {
                $('#cropper_modal').modal('show');
            }
        },

        cropperImageLoud(imageFile) {
            this.imageCropperSrc = URL.createObjectURL(imageFile);
        },

        changeAnnouncementTypeFunc() {
            this.data.image = "";
            this.orderDate = "";
            this.imageCropperSrc = null;
            this.GetAnnouncementOrderDate(this.data.announcementType).then((Response) => {
                let stringDate = this.formatDate(Response);
                this.orderDate = stringDate;
            });
        },

        formatDate(dateString) {
			// Convert the date string to yyyy-MM-dd
			const date = new Date(`${dateString}Z`);
			return date.toISOString().split('T')[0];
		},
        formatCurrency(value) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: "ILS",
                // Allows up to 1 decimal digit
                maximumFractionDigits: 0
            }).format(value);
        }



    }
};
</script>
<template>
    <!-- Page Header -->
    <div class="page-header">
        <div class="row">
            <div class="col-sm-12">
                <h3 class="page-title">إضافة إعلان</h3>
            </div>
        </div>
    </div>
    <!-- /Page Header -->
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-body ">
                    <div class="row form-row justify-content-center">
                        <div class="col-12 col-sm-12">
                            <div class="form-group">
                                <label>رسالة</label>
                                <textarea v-model="data.message" type="text" class="form-control"
                                    maxlength="255"></textarea>
                            </div>
                        </div>

                        <div class="col-12 col-md-12">
                            <div class="form-group">
                                <label>نوع الإعلان</label>
                                <div>
                                    <select v-model="data.announcementType" @change="changeAnnouncementTypeFunc()"
                                        class="form-control">
                                        <option value="0" key="0" selected>-- إختر نوع الإعلان --</option>
                                        <option v-for="item in getAnnouncementTypesData" :key="item.id"
                                            :value="item.id">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-12">
                            <div class="form-group">
                                <label>مدة طلب الإعلان بالأيام</label>
                                <input v-model="data.durationDay" type="number" max="30" class="form-control">
                            </div>
                        </div>
                        <div class="col-12 col-md-12">
                            <div class="form-group">
                                <p style="color: red">
                                    ملاحظة : تكلفة الإعلان لليوم
                                    {{ formatCurrency(announcementPriceInDay) }}
                                    والتكلفة الإجمالية للإعلان
                                    {{ calculateTotalPrice() }}
                                </p>
                                <p style="color: red">
                                    ملاحظة : التاريخ المرجح أن يعرض به الإعلان في حال تمت الموافقة {{ orderDate }}
                                </p>
                            </div>
                        </div>
                        <!-- aa -->
                    </div>
                </div>
            </div>

            <div class="card mt-5" v-if="data.announcementType > 0">
                <div class="card-body">
                    <div class="col-12" v-if="data.announcementType === AnnouncementType.vertical">
                        <div class="box py-2 px-3 mb-3 rounded-3 cropper">
                            <!-- Label for the file input -->
                            <label class="w-100 h-100">
                                <input type="file" accept="image/*" @change="handleImageUpload" class="d-none"
                                    ref="fileInput" />
                                <div class="icon"></div>
                                <h5 class="text-center">أضف صورة الإعلان</h5>
                                <img loading="lazy" src="/images/plus-icon.svg" alt="" class="d-block mx-auto rounded-circle p-2" />
                                <p class="mb-0 text-center">صورة الإعلان.</p>
                            </label>
                        </div>
                        <div v-if="imageCropperSrc" class="imageCropper">
                            <img loading="lazy" :src="imageCropperSrc" alt="imageCropper" />
                        </div>
                    </div>
                    <div class="col-12" v-else>
                        <div class="box py-2 px-3 mb-3 rounded-3 cropper" v-on:click="toggleCropperModal()">
                            <label class="w-100 h-100">
                                <div class="icon"></div>
                                <h5 class="text-center">أضف صورة الإعلان</h5>
                                <img loading="lazy" src="/images/plus-icon.svg" alt="" class="d-block mx-auto rounded-circle p-2" />
                                <p class="mb-0 text-center">صورة الإعلان.</p>
                            </label>
                        </div>
                        <div v-if="imageCropperSrc" class="imageCropper">
                            <img loading="lazy" :src="imageCropperSrc" alt="imageCropper">
                        </div>
                    </div>

                </div>
            </div>

            <div class="mb-5">
                <button v-on:click="createFunc()" class="btn btn-primary btn-block py-2">إضافة</button>
            </div>

        </div>
    </div>




    <div class="modal fade" id="cropper_modal" aria-hidden="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">صورة الإعلان</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="data.announcementType === AnnouncementType.main">
                        <cropperMainAnnouncement @b64image="(x) => data.image = x" @IsShow="(x) => toggleCropperModal()"
                            @copperImage="(x) => cropperImageLoud(x)"></cropperMainAnnouncement>
                    </div>
                    <div v-else-if="data.announcementType === AnnouncementType.horizontal">
                        <cropperHorizentalAnnouncement @b64image="(x) => data.image = x"
                            @IsShow="(x) => toggleCropperModal()" @copperImage="(x) => cropperImageLoud(x)">
                        </cropperHorizentalAnnouncement>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<style scoped>
.imageCropper {
    background-color: #f1f0ef;
    /* White background for the box */
    border: 1px solid #ddd;
    /* Light grey border for subtle separation */
    border-radius: 8px;
    /* Rounded corners for a softer look */
    padding: 10px;
    /* Padding around the image */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Subtle shadow for depth */
    display: flex;
    /* Flexbox for centering content */
    justify-content: center;
    /* Center horizontally */
    align-items: center;
    /* Center vertically */
    max-width: 100%;
    /* Ensure it does not exceed container width */
    max-height: 1000px;
    /* Limit height to maintain aspect ratio */
    overflow: hidden;
    /* Hide overflow for better image handling */
}

/* Style for the image inside the box */
.imageCropper img {
    max-width: 100%;
    /* Responsive width */
    max-height: 100%;
    /* Responsive height */
    border-radius: 4px;
    /* Slightly rounded corners on the image */
}

.text-right a {
    margin-left: 5px;
}

.modal-body button {
    margin: 5px;
}

.invalid-feedback-custom {
    color: #dc3545;
    display: block;
    margin-top: .25rem;
    font-size: 80%;
}
</style>