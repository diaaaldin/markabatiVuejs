<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            fromYear: 0,
            toYear: 0,

            fromPrice: 0,
            toPrice: 0,

            fromMeal: 0,
            toMeal: 0
        }
    },
    mounted() {

    },
    watch: {
        // Watch for changes in the input fields and emit the data
        fromYear(newValue) {
            this.emitYears();
        },
        toYear(newValue) {
            this.emitYears();
        },

        fromPrice(newValue) {
            this.emitPrice();
        },
        toPrice(newValue) {
            this.emitPrice();
        },

        fromMeal(newValue) {
            this.emitMeal();
        },
        toMeal(newValue) {
            this.emitMeal();
        },
    },
    components: {

    },
    emits: {

    },
    created() {
        // Call the function from the store directly when the component is created
        this.initFunc();
    },

    computed: {
        ...mapGetters("Code", ["getBrandsData", "getBrandModelsData", "getPaintedStatusData", "getSpecificationsData", "getBodyTypesData", "getColorsData", "getPaintedTypesData", "getGearTypesData", "getOilTypesData"]),
    },
    methods: {
        ...mapActions("Code", ["GetBrands", "GetBrandModels", "GetPaintedStatus", "GetSpecification", "GetBodyType", "GetColor", "GetPaintedType", "GetGearType", "GetOilType"]),

        async initFunc() {
            try {
                await Promise.all([
                    this.GetBrands(),
                    this.GetPaintedStatus(),
                    this.GetSpecification(),
                    this.GetBodyType(),
                    this.GetColor(),
                    this.GetPaintedType(),
                    this.GetGearType(),
                    this.GetOilType(),
                ]);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
            }
        },

        selectedBrandFunc(id) {
            // Emit the selected brand name to the parent
            this.$emit("brandSelected", id);
            this.GetBrandModels(id);
        },
        selectedBrandModelFunc(id) {
            // Emit the selected brand name to the parent
            this.$emit("brandModelSelected", id);
        },
        selectedPaintedStatusFunc(id) {
            // Emit the selected brand name to the parent
            this.$emit("paintedStatusSelected", id);
        },
        selectedSpecificationFunc(id) {
            // Emit the selected brand name to the parent
            this.$emit("specificationSelected", id);
        },
        selectedBodyTypeFunc(id) {
            // Emit the selected brand name to the parent
            this.$emit("bodyTypeSelected", id);
        },
        selectedColorFunc(id) {
            // Emit the selected brand name to the parent
            this.$emit("colorSelected", id);
        },
        selectedPaintedTypeFunc(id) {
            // Emit the selected brand name to the parent
            this.$emit("paintedTypeSelected", id);
        },
        selectedGearTypeFunc(id) {
            // Emit the selected brand name to the parent
            this.$emit("gearTypeSelected", id);
        },
        selectedOilTypeFunc(id) {
            // Emit the selected brand name to the parent
            this.$emit("oilTypeSelected", id);
        },

        emitYears() {
            this.$emit("yearSelected", {
                from: this.fromYear,
                to: this.toYear,
            });
        },

        
        emitPrice() {
            this.$emit("priceSelected", {
                from: this.fromPrice,
                to: this.toPrice,
            });
        },

        
        emitMeal() {
            this.$emit("mealSelected", {
                from: this.fromMeal,
                to: this.toMeal,
            });
        },

    }
};
</script>

<template>

    <!--  start left side list  -->
    <div class="col-12 col-lg-3 h-100 left-side fillter">

        <div class="accordion" id="accordionExample">
            <div class="sec">
                <div class="title-fill">
                    <img src="/img/icons/fillter.svg">
                    <span>الفلترة</span>
                    <svg fill="#000" width="30" viewBox="0 0 32 32" id="iconfilter" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs>  </defs> <path d="M22.5,9A7.4522,7.4522,0,0,0,16,12.792V8H14v8h8V14H17.6167A5.4941,5.4941,0,1,1,22.5,22H22v2h.5a7.5,7.5,0,0,0,0-15Z"></path> <path d="M26,6H4V9.171l7.4142,7.4143L12,17.171V26h4V24h2v2a2,2,0,0,1-2,2H12a2,2,0,0,1-2-2V18L2.5858,10.5853A2,2,0,0,1,2,9.171V6A2,2,0,0,1,4,4H26Z"></path> <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" fill="none" class="cls-1" width="32" height="32"></rect> </g></svg>                </div>
            </div>
            <div class="clear-fix"></div>
            <div class="accordion-item customize-according">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button  btn " type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <div class="title-fill">
                            <img src="/img/icons/car.svg">
                            <span>{{ $t('filter_brand') }} </span>
                        </div>
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body customize-acc-body scrollable-list">

                        <div v-for="(item, index) in getBrandsData" :key="index" class="form-check">
                            <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio" name="car"
                                :value="item.name" @change="selectedBrandFunc(item.id)">
                            <label class="form-check-label" :for="'flexRadioDefault' + (index)">{{ item.name
                            }}</label>
                            <!-- <span>(345)</span> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion-item customize-according mt-2">
                <h2 class="accordion-header" id="heading2">
                    <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                        <div class="title-fill">
                            <img src="/img/icons/car.svg">
                            <span>{{ $t('filter_model') }}</span>
                        </div>
                    </button>
                </h2>
                <div id="collapse2" class="accordion-collapse collapse " aria-labelledby="heading2"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body customize-acc-body scrollable-list">
                        <div v-for="(item, index) in getBrandModelsData" :key="index" class="form-check">
                            <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio" name="car"
                                :value="item.name" @change="selectedBrandModelFunc(item.id)">
                            <label class="form-check-label" :for="'flexRadioDefault' + (index)">{{ item.name
                            }}</label>
                            <!-- <span>(345)</span> -->
                        </div>
                    </div>
                </div>
            </div>

            <div class="accordion-item customize-according mt-2">
                <h2 class="accordion-header" id="">
                    <button class="btn py-3" type="">
                        <div class="title-fill">
                            <img src="/img/icons/date.svg">
                            <span>{{ $t('filter_year') }}</span>
                        </div>
                    </button>
                </h2>
                <div id="" class="show">
                    <div class="accordion-body customize-acc-body pt-0">
                        <div class="row">
                            <div class="col-md-6">
                                <label class="label-form">من</label>
                                <input name="year" id="year" type="number"
                                    class="form-control mt-2  text-start gray_text gray-inp" placeholder=" 0 "
                                    required="" v-model="fromYear">
                            </div>
                            <div class="col-md-6">
                                <label class="label-form">الى</label>
                                <input name="year" id="year" type="number"
                                    class="form-control mt-2  text-start gray_text gray-inp" placeholder=" 0 "
                                    required="" v-model="toYear">
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="accordion-item customize-according mt-2">
                <h2 class="accordion-header" id="">
                    <button class="btn py-3" type="">
                        <div class="title-fill">
                            <img src="/img/icons/money.svg">
                            <span>{{ $t('filter_price') }}</span>
                        </div>
                    </button>
                </h2>
                <div id="" class="show">
                    <div class="accordion-body customize-acc-body pt-0">
                        <div class="row">
                            <div class="col-md-6">
                                <label class="label-form">من</label>
                                <input name="price" id="price" type="number"
                                    class="form-control mt-2  text-start gray_text gray-inp" placeholder=" 0 "
                                    required="" 
                                    v-model="fromPrice">
                            </div>
                            <div class="col-md-6">
                                <label class="label-form">الى</label>
                                <input name="price" id="price" type="number"
                                    class="form-control mt-2  text-start gray_text gray-inp" placeholder=" 0 "
                                    required="" 
                                    v-model="toPrice">
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="accordion-item customize-according mt-2">
                <h2 class="accordion-header" id="">
                    <button class="btn py-3" type="">
                        <div class="title-fill">
                            <img src="/img/icons/speed.svg">
                            <span>{{ $t('filter_meals') }}</span>
                        </div>
                    </button>
                </h2>
                <div id="" class="show">
                    <div class="accordion-body customize-acc-body pt-0">
                        <div class="row">
                            <div class="col-md-6">
                                <label class="label-form">من</label>
                                <input name="price" id="price" type="text"
                                    class="form-control mt-2  text-start gray_text gray-inp" placeholder=" 0 "
                                    required=""
                                    v-model="fromMeal">
                            </div>
                            <div class="col-md-6">
                                <label class="label-form">الى</label>
                                <input name="price" id="price" type="text"
                                    class="form-control mt-2  text-start gray_text gray-inp" placeholder=" 0 "
                                    required=""
                                    v-model="toMeal">
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="accordion-item customize-according mt-2">
                <h2 class="accordion-header" id="heading3">
                    <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                        <div class="title-fill">
                            <img src="/img/icons/car.svg">
                            <span>{{ $t('filter_body_type') }}</span>
                        </div>
                    </button>
                </h2>
                <div id="collapse3" class="accordion-collapse collapse  " aria-labelledby="heading3"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body customize-acc-body scrollable-list">
                        <div v-for="(item, index) in getBodyTypesData" :key="index" class="form-check">
                            <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio" name="car"
                                :value="item.name" @change="selectedBodyTypeFunc(item.id)">
                            <label class="form-check-label" :for="'flexRadioDefault' + (index)">{{ item.name
                            }}</label>
                            <!-- <span>(345)</span> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion-item customize-according mt-2">
                <h2 class="accordion-header" id="heading4">
                    <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                        <div class="title-fill">
                            <img src="/img/icons/car.svg">
                            <span>{{ $t('filter_specefication') }}</span>
                        </div>
                    </button>
                </h2>
                <div id="collapse4" class="accordion-collapse collapse " aria-labelledby="heading4"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body customize-acc-body scrollable-list">
                        <div v-for="(item, index) in getSpecificationsData" :key="index" class="form-check">
                            <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio" name="car"
                                :value="item.name" @change="selectedSpecificationFunc(item.id)">
                            <label class="form-check-label" :for="'flexRadioDefault' + (index)">{{ item.name
                            }}</label>
                            <!-- <span>(345)</span> -->
                        </div>
                    </div>
                </div>
            </div>

            <div class="accordion-item customize-according mt-2">
                <h2 class="accordion-header" id="heading5">
                    <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                        <div class="title-fill">
                            <img src="/img/icons/color.svg">
                            <span>{{ $t('filter_color') }}</span>
                        </div>
                    </button>
                </h2>
                <div id="collapse5" class="accordion-collapse collapse " aria-labelledby="heading5"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body customize-acc-body   scrollable-list">
                        <div v-for="(item, index) in getColorsData" :key="index" class="form-check">
                            <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio" name="car"
                                :value="item.name" @change="selectedColorFunc(item.id)">
                            <label class="form-check-label" :for="'flexRadioDefault' + (index)">{{ item.name
                            }}</label>
                            <!-- <span>(345)</span> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion-item customize-according mt-2">
                <h2 class="accordion-header" id="heading6">
                    <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                        <div class="title-fill">
                            <img src="/img/icons/color.svg">
                            <span>{{ $t('filter_painting_type') }}</span>
                        </div>
                    </button>
                </h2>
                <div id="collapse6" class="accordion-collapse collapse  " aria-labelledby="heading6"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body customize-acc-body  scrollable-list">
                        <div v-for="(item, index) in getPaintedTypesData" :key="index" class="form-check">
                            <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio" name="car"
                                :value="item.name" @change="selectedPaintedTypeFunc(item.id)">
                            <label class="form-check-label" :for="'flexRadioDefault' + (index)">{{ item.name
                            }}</label>
                            <!-- <span>(345)</span> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion-item customize-according mt-2">
                <h2 class="accordion-header" id="heading7">
                    <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                        <div class="title-fill">
                            <img src="/img/icons/color.svg">
                            <span>{{ $t('filter_painting_status') }}</span>
                        </div>
                    </button>
                </h2>
                <div id="collapse7" class="accordion-collapse collapse " aria-labelledby="heading7"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body customize-acc-body scrollable-list">
                        <div v-for="(item, index) in getPaintedStatusData" :key="index" class="form-check">
                            <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio" name="car"
                                :value="item.name" @change="selectedPaintedStatusFunc(item.id)">
                            <label class="form-check-label" :for="'flexRadioDefault' + (index)">{{ item.name
                            }}</label>
                            <!-- <span>(345)</span> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion-item customize-according mt-2">
                <h2 class="accordion-header" id="heading8">
                    <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse8" aria-expanded="false" aria-controls="collapse8">
                        <div class="title-fill">
                            <img src="/img/icons/car.svg">
                            <span>{{ $t('filter_gear_type') }}</span>
                        </div>
                    </button>
                </h2>
                <div id="collapse8" class="accordion-collapse collapse  " aria-labelledby="heading8"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body customize-acc-body  scrollable-list">
                        <div v-for="(item, index) in getGearTypesData" :key="index" class="form-check">
                            <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio" name="car"
                                :value="item.name" @change="selectedGearTypeFunc(item.id)">
                            <label class="form-check-label" :for="'flexRadioDefault' + (index)">{{ item.name
                            }}</label>
                            <!-- <span>(345)</span> -->
                        </div>
                    </div>
                </div>
            </div>

            <div class="accordion-item customize-according mt-2">
                <h2 class="accordion-header" id="heading10">
                    <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse10" aria-expanded="false" aria-controls="collapse10">
                        <div class="title-fill">
                            <img src="/img/icons/spas.svg">
                            <span>{{ $t('filter_specefication') }}</span>
                        </div>
                    </button>
                </h2>
                <div id="collapse10" class="accordion-collapse collapse " aria-labelledby="heading10"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body customize-acc-body scrollable-list">
                        <div v-for="(item, index) in getSpecificationsData" :key="index" class="form-check">
                            <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio" name="car"
                                :value="item.name" @change="selectedSpecificationFunc(item.id)">
                            <label class="form-check-label" :for="'flexRadioDefault' + (index)">{{ item.name
                            }}</label>
                            <!-- <span>(345)</span> -->
                        </div>
                    </div>
                </div>
            </div>

            <div class="accordion-item customize-according mt-2">
                <h2 class="accordion-header" id="heading9">
                    <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse9" aria-expanded="false" aria-controls="collapse9">
                        <div class="title-fill">
                            <img src="/img/icons/car.svg">
                            <span>{{ $t('filter_oil_type') }}</span>
                        </div>
                    </button>
                </h2>
                <div id="collapse9" class="accordion-collapse collapse " aria-labelledby="heading9"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body customize-acc-body  scrollable-list">
                        <div v-for="(item, index) in getOilTypesData" :key="index" class="form-check">
                            <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio" name="car"
                                :value="item.name" @change="selectedOilTypeFunc(item.id)">
                            <label class="form-check-label" :for="'flexRadioDefault' + (index)">{{ item.name
                            }}</label>
                            <!-- <span>(345)</span> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>




    <!-- end left side list-->

</template>

<style>
.scrollable-list {
    max-height: 200px;
    /* Set the max height you want for the scrollable area */
    overflow-y: auto;
    /* Enable vertical scrolling */
    margin-top: 10px;
    /* Optional: Space above the scrollable area */
}
#iconfilter{
    float: left;
    cursor: pointer;
}
/* Optional: Add custom styles for your viewer component */
</style>
