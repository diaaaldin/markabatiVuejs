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
                id: 0,
                announcementType: 0,
                messageReplay: "",
                startDate: null,
                endDate: null,
                image: "",
            },

            //////////////////////////
            imageCropperSrc: null,
            base64Images: [],
            myFiles: [],

            AnnouncementType: AnnouncementTypeEnum,
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
        ...mapGetters("Orders", ["getOrderData"]),
    },
    methods: {
        ...mapActions("Code", ["GetAnnouncementTypes"]),
        ...mapActions("Orders", ["UpdateAnnouncementOrder"]),

        async initFunc() {
            await this.GetAnnouncementTypes();
            this.mapData();
        },

        mapData() {
            this.data.id = this.getOrderData.id;
            this.data.announcementType = this.getOrderData.announcementType;
            this.data.startDate = this.formatDate(this.getOrderData.startDate);
            this.data.endDate = this.formatDate(this.getOrderData.endDate);
        },

        checkUserAllowFunc() {
            // if (localStorage.getItem('typeName') != "Store") {
            //     this.$router.push({ name: 'storeLogin' });
            // }
        },

        updateFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });
            try {
                // Proceed only if validation passes
                if (this.checkUpdateValidation()) {
                    this.UpdateAnnouncementOrder(this.data).then((Response) => {
                        this.$moshaToast('تم تعديل الإعلان بنجاح', {
                            hideProgressBar: 'false',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'success',
                            timeout: 3000,
                        });
                        loading.close();
                        this.$router.push({ name: "announcement_managment" });
                    });
                }
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
        },
        checkUpdateValidation() {
            if (this.data.startDate == null) {
                this.$moshaToast('أدخل تاريخ بداية الإعلان', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.endDate == null) {
                this.$moshaToast('أدخل تاريخ نهاية الإعلان', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.endDate < this.data.startDate) {
                this.$moshaToast('قم بإدخال تاريخ العرض بشكل صحيح', {
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
      
        formatDate(dateString) {
			// Convert the date string to yyyy-MM-dd
			const date = new Date(`${dateString}Z`);
			return date.toISOString().split('T')[0];
		},

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
                                <label>رد الرسالة</label>
                                <textarea v-model="data.messageReplay" type="text" class="form-control"
                                    maxlength="255"></textarea>
                            </div>
                        </div>
                        <div class="col-12 col-sm-12">
                            <div class="form-group">
                                <label>تاريخ بداية الإعلان</label>
                                <input v-model="data.startDate" type="date" class="form-control">
                            </div>
                        </div>
                        <div class="col-12 col-sm-12">
                            <div class="form-group">
                                <label>تاريخ نهاية الإعلان</label>
                                <input v-model="data.endDate" type="date" class="form-control">
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
                                <h5 class="text-center">الصورة الإعلان الجديدة</h5>
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
                                <h5 class="text-center">الصورة الإعلان الجديدة</h5>
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
                <button v-on:click="updateFunc()" class="btn btn-primary btn-block py-2">حفظ</button>
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