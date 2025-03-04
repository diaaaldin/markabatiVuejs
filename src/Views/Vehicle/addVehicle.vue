<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import cropper from '@/components/cropper/VehicleImageCropper.vue';
import CKEditorComponent from '@/components/editor/CKEditorComponent.vue';

// for file pond
import vueFilePond from 'vue-filepond';
// Import plugins
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js';
//import FilePondPluginImageEditor from "@pqina/filepond-plugin-image-editor";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";

// Import styles
import 'filepond/dist/filepond.min.css';
import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.min.css";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
// Create FilePond component
const FilePond = vueFilePond(
    FilePondPluginFilePoster,
    //FilePondPluginImageEditor,
    FilePondPluginImagePreview
);


export default {
    data() {
        return {
            data: {
                brandIdFk: 0,
                modelIdFk: 0,
                year: 0,
                numOfMeals: 0,
                bodyTypeIdCfk: 0,
                colorIdCFK: 0,
                paintedTypeIdCfk: 0,
                paintedStatusIdCfk: 0,
                specificationIdCfk: 0,
                price: 0,
                currency: 0,
                gearTypeIdCfk: 0,
                oilTypeIdCfk: 0,
                image: "",
                images: [
                    ""
                ],
                bestThreeCategories: ["", "", ""],
                moreInfo:"",
                extinsionCategory: [
                    {
                        extensionName: "",
                        extentionValue: ""
                    }
                ],
            },

            //////////////////////////
            imageCropperSrc: null,
            base64Images: [],
            myFiles: [],

            editor : null,
        }
    },

    mounted() {

    },

    components: {
        FilePond,
        cropper,
        CKEditorComponent,
    },

    emits: {

    },

    created() {
        // Call the function from the store directly when the component is created
        //this.checkUserAllowFunc();
        // this.initFunc();
    },

    computed: {
        ...mapGetters("Code", ["getBrandsData", "getBrandModelsData", "getPaintedStatusData", "getSpecificationsData"
            , "getBodyTypesData", "getColorsData", "getPaintedTypesData", "getGearTypesData", "getOilTypesData", "getCurrencyData"]),
    },
    methods: {
        ...mapActions("Code", ["GetBrands", "GetBrandModels", "GetPaintedStatus", "GetSpecification"
            , "GetBodyType", "GetColor", "GetPaintedType", "GetGearType", "GetOilType", "GetCurrency"]),

        ...mapActions("Vehicles", ["CreateVehicle"]),

        async initFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });

            try {
                // Execute all methods in parallel
                await Promise.all([
                    this.GetBrands(),
                    this.GetPaintedStatus(),
                    this.GetSpecification(),
                    this.GetBodyType(),
                    this.GetColor(),
                    this.GetPaintedType(),
                    this.GetGearType(),
                    this.GetOilType(),
                    this.GetCurrency(),
                ]);
            } catch (error) {
                console.error("An error occurred during initialization:", error);
            } finally {
                // Ensure loading is closed no matter what happens
                loading.close();
            }
        },
        checkUserAllowFunc() {
            // if (localStorage.getItem('typeName') != "Store") {
            //     this.$router.push({ name: 'storeLogin' });
            // }
        },

        createFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });

            try {
                // Proceed only if validation passes
                if (this.checkAddValidation()) {
                    this.CreateVehicle(this.data).then((Response) => {
                        this.$moshaToast('تم إضافة مركبة جديدة بنجاح', {
                            hideProgressBar: 'false',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'success',
                            timeout: 3000,
                        });
                        loading.close();
                        this.$router.push({ name: "vehicle_managment" });
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
            } finally {
                loading.close();
            }
        },
        checkAddValidation() {
            if (this.data.brandIdFk == 0) {
                this.$moshaToast('إختر نوع المركبة', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.modelIdFk == 0) {
                this.$moshaToast('إختر موديل المركبة', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.year == 0) {
                this.$moshaToast('أدخل سنة الإنشاء', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.numOfMeals == 0) {
                this.$moshaToast('أدخل المسافة المقطوعة', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.bodyTypeIdCfk == 0) {
                this.$moshaToast('إختر نوع هيكل المركبة', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.colorIdCFK == 0) {
                this.$moshaToast('إختر لون المركبة', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.paintedTypeIdCfk == 0) {
                this.$moshaToast('إختر نوع دهان المركبة', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.paintedStatusIdCfk == 0) {
                this.$moshaToast('إختر حالة دهان المركبة', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.specificationIdCfk == 0) {
                this.$moshaToast('إختر مواصفات المركبة', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.paintedStatusIdCfk == 0) {
                this.$moshaToast('إختر حالة دهان المركبة', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.gearTypeIdCfk == 0) {
                this.$moshaToast('إختر نوغ مبدل سرعة المركبة', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.oilTypeIdCfk == 0) {
                this.$moshaToast('إختر نوع وقود المركبة', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.price == 0) {
                this.$moshaToast('enter product price', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.currency == 0) {
                this.$moshaToast('إختر نوع العملة المراد', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (!this.checkThreeCategoriesValidation()) {
                this.$moshaToast('تأكد من إضافة المميزات الثلاثة بطريقة صحيحة', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (this.data.image == "") {
                this.$moshaToast('أضف صورة مصغرة للمركبة', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            } else if (!this.data.images || this.data.images.length < 6) {
                this.$moshaToast('أضف على الأقل 6 صور', {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                return false;
            }
            // else if (this.data.moreInfo == "") {
            //     this.$moshaToast('أضف معلومات أخرى للمركبة', {
            //         hideProgressBar: 'false',
            //         position: 'top-center',
            //         showIcon: 'true',
            //         swipeClose: 'true',
            //         type: 'warning',
            //         timeout: 3000,
            //     });
            //     return false;
            // } 

            return true;
        },

        checkThreeCategoriesValidation() {
            // Check if the array has fewer than 3 items
            if (this.data.bestThreeCategories.length < 3) {
                return false;
            }
            // Check if any item in the array is an empty string
            const hasEmptyString = this.data.bestThreeCategories.some(item => item.trim() === "");
            if (hasEmptyString) {
                return false;
            }
            return true; // Valid if all conditions are satisfied
        },

        ////////////////////////////
        ////////////////////////////
        ////////////////////////////

        passImgAsBase64(file) {
            var self = this;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const base64Image = reader.result;
                self.base64Images.push(base64Image);
            };
            reader.onerror = function (error) {
                // console.log('Error: ', error);
            };
        },

        filePondChanged: debounce(async function (error, fileItem) {
            if (error) {
                console.error('FilePond error:', error);
                return;
            }
            const files = this.$refs.pond.getFiles();
            this.base64Images = [];
            for (const fileItem of files) {
                const file = fileItem.file;
                const base64Image = await this.passImgAsBase64(file);
                this.base64Images.push(base64Image);
            }
            this.base64Images = this.base64Images.filter(image => image !== undefined);
            this.data.images = this.base64Images;

        }, 300),

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

        // initializeCKEditor() {
        //     ClassicEditor
        //         .create(document.querySelector('#content'))
        //         .then(newEditor => {
        //             this.editor = newEditor;

        //             // Set initial content for CKEditor from data.description
        //             this.editor.setData(this.data.description || '');

        //             // Update data.description whenever the editor content changes
        //             this.editor.model.document.on('change:data', () => {
        //                 //this.data.description = this.editor.getData();
        //             });
        //         })
        //         .catch(error => {
        //             console.error('CKEditor Error:', error);
        //         });
        // },
        //         initializeCKEditor() {
        //     this.$nextTick(() => {
        //         const contentElement = document.querySelector('#content');
        //         if (contentElement) {
        //             ClassicEditor
        //                 .create(contentElement)
        //                 .then(newEditor => {
        //                     this.editor = newEditor;

        //                     // Set initial content for CKEditor from data.moreInfo
        //                     this.editor.setData(this.data.moreInfo || '');

        //                     // Update `data.moreInfo` whenever the editor content changes
        //                     this.editor.model.document.on('change:data', () => {
        //                         this.data.moreInfo = this.editor.getData();
        //                     });
        //                 })
        //                 .catch(error => {
        //                     console.error('CKEditor initialization error:', error);
        //                 });
        //         } else {
        //             console.error('Element #content1 not found for CKEditor initialization.');
        //         }
        //     });
        // },


        setBrandModels() {
            this.data.modelIdFk = 0;
            this.GetBrandModels(this.data.brandIdFk);
        },

        addAddition() {
            this.data.extinsionCategory.push({ extensionName: '', extentionValue: '' });
        },

        removeAddition(index) {
            this.data.extinsionCategory.splice(index, 1);
        },



    }
};
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
</script>
<template>
    <!-- Page Header -->
    <div class="page-header">
        <div class="row">
            <div class="col-sm-12">
                <h3 class="page-title">إضافة مركبة جديدة</h3>
            </div>
        </div>
    </div>
    <!-- /Page Header -->
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-body ">
                    <div class="row form-row justify-content-center">
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label>نوع المركبة</label>
                                <div>
                                    <select v-model="data.brandIdFk" @change="setBrandModels()" class="form-control">
                                        <option value="0" key="0" selected>-- إختر نوع المركبة --</option>
                                        <option v-for="item in getBrandsData" :key="item.id" :value="item.id">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label>موديل المركبة</label>
                                <div>
                                    <select v-model="data.modelIdFk" class="form-control">
                                        <option value="0" key="0" selected>-- إختر موديل المركبة --</option>
                                        <option v-for="item in getBrandModelsData" :key="item.id" :value="item.id">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label>سنة إضافة المركبة</label>
                                <input v-model="data.year" type="number" class="form-control">
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label>المسافة التي قطعتها المركبة</label>
                                <input v-model="data.numOfMeals" type="number" class="form-control">
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label>نوع هيكل المركبة</label>
                                <div>
                                    <select v-model="data.bodyTypeIdCfk" class="form-control">
                                        <option value="0" key="0" selected>-- إختر نوع هيكل المركبة --</option>
                                        <option v-for="item in getBodyTypesData" :key="item.id" :value="item.id">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label>لون المركبة</label>
                                <div>
                                    <select v-model="data.colorIdCFK" class="form-control">
                                        <option value="0" key="0" selected>-- إختر لون المركبة --</option>
                                        <option v-for="item in getColorsData" :key="item.id" :value="item.id">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label>نوع دهان المركبة</label>
                                <div>
                                    <select v-model="data.paintedTypeIdCfk" class="form-control">
                                        <option value="0" key="0" selected>-- إختر نوع دهان المركبة --</option>
                                        <option v-for="item in getPaintedTypesData" :key="item.id" :value="item.id">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label>حالة دهان المركبة</label>
                                <div>
                                    <select v-model="data.paintedStatusIdCfk" class="form-control">
                                        <option value="0" key="0" selected>-- إختر حالة دهان المركبة --</option>
                                        <option v-for="item in getPaintedStatusData" :key="item.id" :value="item.id">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label>مواصفات المركبة</label>
                                <div>
                                    <select v-model="data.specificationIdCfk" class="form-control">
                                        <option value="0" key="0" selected>-- إختر مواصفات المركبة --</option>
                                        <option v-for="item in getSpecificationsData" :key="item.id" :value="item.id">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label>نوع مبدل السرعة في المركبة</label>
                                <div>
                                    <select v-model="data.gearTypeIdCfk" class="form-control">
                                        <option value="0" key="0" selected>-- إختر نوع مبدل السرعة في المركبة --
                                        </option>
                                        <option v-for="item in getGearTypesData" :key="item.id" :value="item.id">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-12">
                            <div class="form-group">
                                <label>نوع وقود المركبة</label>
                                <div>
                                    <select v-model="data.oilTypeIdCfk" class="form-control">
                                        <option value="0" key="0" selected>-- إختر نوع وقود المركبة --</option>
                                        <option v-for="item in getOilTypesData" :key="item.id" :value="item.id">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label>سعر المركبة</label>
                                <input v-model="data.price" type="number" class="form-control">
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label>العملة المرادة</label>
                                <div>
                                    <select v-model="data.currency" class="form-control">
                                        <option value="0" key="0" selected>-- إختر العملة المرادة --</option>
                                        <option v-for="item in getCurrencyData" :key="item.id" :value="item.id">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-12">
                            <div class="form-group">
                                <label>وصف المركبة</label>
                                <!-- <textarea rows="15" id="content" type="text"
                                class="form-control"></textarea> -->
                                <CKEditorComponent v-model="data.moreInfo"  />
                            </div>
                        </div>
                        <!-- aa -->
                    </div>
                </div>
            </div>

            <div class="card mt-5">
                <div class="card-body">
                    <label for="title" class="title"> أفضل ثلاث مميزات للمركبة</label>
                    <div class="row ">
                        <div v-for="(category, index) in data.bestThreeCategories" :key="index" class="col-12 col-sm-4">
                            <div class="form-group">
                                <input v-model="data.bestThreeCategories[index]" :placeholder="`المميزة ` + (index + 1)"
                                    type="text" class="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mt-5">
                <div class="card-body">
                    <div class="box-addition  px-3 mb-3 ">
                        <div id="additionGroup" class="form-group">
                            <label for="title" class="title"> اضافات جديدة </label>
                            <div v-for="(ex, index) in data.extinsionCategory" :key="index" :id="'addition' + index"
                                id="addition" class="row">
                                <div class="col">
                                    <!-- <label for="email">اسم الاضافة </label> -->
                                    <input v-model="ex.extensionName" asp-for="addition" type="text"
                                        placeholder="اسم الاضافة" class="form-control m-1 addition" />
                                </div>
                                <div class="col">
                                    <!-- <label for="email"> القيمة </label> -->
                                    <input v-model="ex.extentionValue" asp-for="value" type="text" placeholder="القيمة"
                                        class="form-control m-1 value" />
                                </div>
                                <div class="col-auto p-0 remove">
                                    <button id="removeaddition" type="button" class="form-control m-1 text-danger"
                                        v-on:click="removeAddition(index)"><i class="fa fa-solid fa-trash"></i></button>
                                </div>
                            </div>

                        </div>
                        <div class="form-group add_addition">
                            <button id="add" type="button" class="btn btn-primary" v-on:click="addAddition()">اضافة <i
                                    class="fa fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="card mt-5">
                <div class="card-body">
                    <div class="col-12" v-on:click="toggleCropperModal()">
                        <div class="box py-2 px-3 mb-3 rounded-3 cropper">
                            <label class="w-100 h-100">
                                <div class="icon"></div>
                                <h5 class="text-center">أضف الصورة الرئيسية للمركبة</h5>
                                <img src="/images/plus-icon.svg" alt="" class="d-block mx-auto rounded-circle p-2" />
                                <p class="mb-0 text-center">صورة المركبة.</p>
                            </label>
                        </div>
                        <div v-if="imageCropperSrc" class="imageCropper">
                            <img :src="imageCropperSrc" alt="imageCropper">
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="box py-2 px-3 mb-3 rounded-3 drop-images">
                            <FilePond ref="pond" imagePreviewMaxHeight="50" imagePreviewMinHeight="20" min-files="6"
                                label-idle="Drop images here..." allow-multiple="true"
                                accepted-file-types="image/jpeg, image/png" v-on:init="handleFilePondInit"
                                v-on:addfile="filePondChanged" v-on:removefile="filePondChanged" />
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
                    <h5 class="modal-title">الصورة الرئيسية للمركبة</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <cropper @b64image="(x) => data.image = x" @IsShow="(x) => toggleCropperModal()"
                            @copperImage="(x) => cropperImageLoud(x)"></cropper>
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
    max-height: 400px;
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