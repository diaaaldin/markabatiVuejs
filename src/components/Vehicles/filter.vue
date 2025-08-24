<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            stateId: 0,
            vehicleBrandId: 0,
            vehicleModelId: 0,
            yearFrom: 0,
            yearTo: 0,
            priceFrom: 0,
            priceTo: 0,
            mealsFrom: 0,
            mealsTo: 0,
            color: 0,
            bodyType: 0,
            specification: 0,
            paintedType: 0,
            paintedStatus: 0,
            gearType: 0,
            oilType: 0,
            showFilterBar: true,
        }
    },
    mounted() {
            this.handleResize();
            window.addEventListener("resize", this.handleResize);
                },
    beforeUnmount() {
  window.removeEventListener("resize", this.handleResize);
},

    watch: {
        // Watch for changes in the input fields and emit the data
        yearFrom(newValue) {
            this.emitYears();
        },
        yearTo(newValue) {
            this.emitYears();
        },
        priceFrom(newValue) {
            this.emitPrice();
        },
        priceTo(newValue) {
            this.emitPrice();
        },
        mealsFrom(newValue) {
            this.emitMeal();
        },
        mealsTo(newValue) {
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
        ...mapGetters("Code", ["getStatesData", "getCitiesData", "getBrandsData", "getBrandModelsData", "getPaintedStatusData", "getSpecificationsData", "getBodyTypesData", "getColorsData", "getPaintedTypesData", "getGearTypesData", "getOilTypesData"]),
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
        filterChangeFunc() {
            this.$emit("filterChange", {
                stateId: this.stateId,
                vehicleBrandId: this.vehicleBrandId,
                vehicleModelId: this.vehicleModelId,
                paintedStatus: this.paintedStatus,
                specification: this.specification,
                bodyType: this.bodyType,
                color: this.color,
                paintedType: this.paintedType,
                gearType: this.gearType,
                oilType: this.oilType,
                yearFrom: this.yearFrom,
                yearTo: this.yearTo,
                priceFrom: this.priceFrom,
                priceTo: this.priceTo,
                mealsFrom: this.mealsFrom,
                mealsTo: this.mealsTo,
            });
        },
        selectedStateFunc(id) {
            this.stateId = id;
            this.filterChangeFunc();
        },
        selectedBrandFunc(id) {
            this.vehicleBrandId = id;
            this.filterChangeFunc();
            this.GetBrandModels(this.vehicleBrandId);
        },
        selectedBrandModelFunc(id) {
            this.vehicleModelId = id;
            this.filterChangeFunc();
        },
        selectedPaintedStatusFunc(id) {
            this.paintedStatus = id;
            this.filterChangeFunc();
        },
        selectedSpecificationFunc(id) {
            this.specification = id;
            this.filterChangeFunc();
        },
        selectedBodyTypeFunc(id) {
            this.bodyType = id;
            this.filterChangeFunc();
        },
        selectedColorFunc(id) {
            this.color = id;
            this.filterChangeFunc();
        },
        selectedPaintedTypeFunc(id) {
            this.paintedType = id;
            this.filterChangeFunc();
        },
        selectedGearTypeFunc(id) {
            this.gearType = id;
            this.filterChangeFunc();
        },
        selectedOilTypeFunc(id) {
            this.oilType = id;
            this.filterChangeFunc();
        },

        emitYears() {
            if (this.yearFrom > 1000 && this.yearTo > 1000) {
                this.filterChangeFunc();
            }
        },
        emitPrice() {
            if (this.priceFrom < this.priceTo) {
                this.filterChangeFunc();
            }
        },
        emitMeal() {
            if (this.mealsFrom < this.mealsTo) {
                this.filterChangeFunc();
            }
        },

        clearDataFunc() {
            this.stateId = 0;
            this.vehicleBrandId = 0;
            this.vehicleModelId = 0;
            this.yearFrom = 0;
            this.yearTo = 0;
            this.priceFrom = 0;
            this.priceTo = 0;
            this.mealsFrom = 0;
            this.mealsTo = 0;
            this.color = 0;
            this.bodyType = 0;
            this.specification = 0;
            this.paintedType = 0;
            this.paintedStatus = 0;
            this.gearType = 0;
            this.oilType = 0;
            this.filterChangeFunc();
        },

        toggleFilterBar() {
                this.showFilterBar = !this.showFilterBar;
            },
            handleResize() {
    if (window.innerWidth <= 992) { // Bootstrap's lg breakpoint (iPad and smaller)
      this.showFilterBar = false;
    } else {
      this.showFilterBar = true;
    }
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
                    <div class="fill-down" @click="toggleFilterBar">
                        <img loading="lazy" src="/img/icons/fillter.svg">
                        <span>الفلترة</span>
                    </div>
                    <svg @click="clearDataFunc()" fill="#000" width="30" viewBox="0 0 32 32" id="iconfilter"
                        xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <defs> </defs>
                            <path
                                d="M22.5,9A7.4522,7.4522,0,0,0,16,12.792V8H14v8h8V14H17.6167A5.4941,5.4941,0,1,1,22.5,22H22v2h.5a7.5,7.5,0,0,0,0-15Z">
                            </path>
                            <path
                                d="M26,6H4V9.171l7.4142,7.4143L12,17.171V26h4V24h2v2a2,2,0,0,1-2,2H12a2,2,0,0,1-2-2V18L2.5858,10.5853A2,2,0,0,1,2,9.171V6A2,2,0,0,1,4,4H26Z">
                            </path>
                            <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" fill="none"
                                class="cls-1" width="32" height="32"></rect>
                        </g>
                    </svg>
                </div>
            </div>

            <div class="clear-fix"></div>
            <transition name="fade-slide">
            <div class="filter-bar" v-show="showFilterBar">
                <div class="accordion-item customize-according">
                    <h2 class="accordion-header" id="heading0">
                        <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse0" aria-expanded="false" aria-controls="collapse0">
                            <div class="title-fill">
                                <img loading="lazy" src="/img/icons/map-pin.svg">
                                <span>{{ $t('filter_state') }}</span>
                            </div>
                        </button>
                    </h2>
                    <div id="collapse0" class="accordion-collapse collapse" aria-labelledby="heading0"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body customize-acc-body scrollable-list">

                            <div v-for="(item, index) in getStatesData" :key="index" class="form-check">
                                <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio"
                                    name="car" :value="item.name" @change="selectedStateFunc(item.id)">
                                <label class="form-check-label" :for="'flexRadioDefault' + (index)">{{ item.name
                                    }}</label>
                                <!-- <span>(345)</span> -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item customize-according mt-2">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button  btn " type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <div class="title-fill">
                                <img loading="lazy" src="/img/icons/car.svg">
                                <span>{{ $t('filter_brand') }}</span>
                            </div>
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body customize-acc-body scrollable-list">

                            <div v-for="(item, index) in getBrandsData" :key="index" class="form-check">
                                <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio"
                                    name="car" :value="item.name" @change="selectedBrandFunc(item.id)">
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
                            <div class="title-fill model">
                                <img loading="lazy" src="/img/icons/car-wheel.svg">
                                <span>{{ $t('filter_model') }}</span>
                            </div>
                        </button>
                    </h2>
                    <div id="collapse2" class="accordion-collapse collapse " aria-labelledby="heading2"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body customize-acc-body scrollable-list">
                            <div v-for="(item, index) in getBrandModelsData" :key="index" class="form-check">
                                <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio"
                                    name="car" :value="item.name" @change="selectedBrandModelFunc(item.id)">
                                <label class="form-check-label" :for="'flexRadioDefault' + (index)">{{ item.name
                                    }}</label>
                                <!-- <span>(345)</span> -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item customize-according mt-2">
                    <h2 class="accordion-header" id="">
                        <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                            <div class="title-fill">
                                <img loading="lazy" src="/img/icons/date.svg">
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
                                        required="" v-model="yearFrom">
                                </div>
                                <div class="col-md-6">
                                    <label class="label-form">الى</label>
                                    <input name="year" id="year" type="number"
                                        class="form-control mt-2  text-start gray_text gray-inp" placeholder=" 0 "
                                        required="" v-model="yearTo">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="accordion-item customize-according mt-2">
                    <h2 class="accordion-header" id="">
                        <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                            <div class="title-fill">
                                <img loading="lazy" src="/img/icons/money.svg">
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
                                        required="" v-model="priceFrom">
                                </div>
                                <div class="col-md-6">
                                    <label class="label-form">الى</label>
                                    <input name="price" id="price" type="number"
                                        class="form-control mt-2  text-start gray_text gray-inp" placeholder=" 0 "
                                        required="" v-model="priceTo">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="accordion-item customize-according mt-2">
                    <h2 class="accordion-header" id="">
                        <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                            <div class="title-fill">
                                <img loading="lazy" src="/img/icons/speed.svg">
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
                                        required="" v-model="mealsFrom">
                                </div>
                                <div class="col-md-6">
                                    <label class="label-form">الى</label>
                                    <input name="price" id="price" type="text"
                                        class="form-control mt-2  text-start gray_text gray-inp" placeholder=" 0 "
                                        required="" v-model="mealsTo">
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
                                <img loading="lazy" src="/img/icons/car.svg">
                                <span>{{ $t('filter_body_type') }}</span>
                            </div>
                        </button>
                    </h2>
                    <div id="collapse3" class="accordion-collapse collapse  " aria-labelledby="heading3"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body customize-acc-body scrollable-list">
                            <div v-for="(item, index) in getBodyTypesData" :key="index" class="form-check">
                                <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio"
                                    name="car" :value="item.name" @change="selectedBodyTypeFunc(item.id)">
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
                                <img loading="lazy" src="/img/icons/car.svg">
                                <span>{{ $t('filter_specefication') }}</span>
                            </div>
                        </button>
                    </h2>
                    <div id="collapse4" class="accordion-collapse collapse " aria-labelledby="heading4"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body customize-acc-body scrollable-list">
                            <div v-for="(item, index) in getSpecificationsData" :key="index" class="form-check">
                                <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio"
                                    name="car" :value="item.name" @change="selectedSpecificationFunc(item.id)">
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
                                <img loading="lazy" src="/img/icons/color.svg">
                                <span>{{ $t('filter_color') }}</span>
                            </div>
                        </button>
                    </h2>
                    <div id="collapse5" class="accordion-collapse collapse " aria-labelledby="heading5"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body customize-acc-body   scrollable-list">
                            <div v-for="(item, index) in getColorsData" :key="index" class="form-check">
                                <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio"
                                    name="car" :value="item.name" @change="selectedColorFunc(item.id)">
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
                                <img loading="lazy" src="/img/icons/color.svg">
                                <span>{{ $t('filter_painting_type') }}</span>
                            </div>
                        </button>
                    </h2>
                    <div id="collapse6" class="accordion-collapse collapse  " aria-labelledby="heading6"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body customize-acc-body  scrollable-list">
                            <div v-for="(item, index) in getPaintedTypesData" :key="index" class="form-check">
                                <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio"
                                    name="car" :value="item.name" @change="selectedPaintedTypeFunc(item.id)">
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
                                <img loading="lazy" src="/img/icons/color.svg">
                                <span>{{ $t('filter_painting_status') }}</span>
                            </div>
                        </button>
                    </h2>
                    <div id="collapse7" class="accordion-collapse collapse " aria-labelledby="heading7"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body customize-acc-body scrollable-list">
                            <div v-for="(item, index) in getPaintedStatusData" :key="index" class="form-check">
                                <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio"
                                    name="car" :value="item.name" @change="selectedPaintedStatusFunc(item.id)">
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
                                <img loading="lazy" src="/img/icons/car.svg">
                                <span>{{ $t('filter_gear_type') }}</span>
                            </div>
                        </button>
                    </h2>
                    <div id="collapse8" class="accordion-collapse collapse  " aria-labelledby="heading8"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body customize-acc-body  scrollable-list">
                            <div v-for="(item, index) in getGearTypesData" :key="index" class="form-check">
                                <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio"
                                    name="car" :value="item.name" @change="selectedGearTypeFunc(item.id)">
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
                                <img loading="lazy" src="/img/icons/spas.svg">
                                <span>{{ $t('filter_specefication') }}</span>
                            </div>
                        </button>
                    </h2>
                    <div id="collapse10" class="accordion-collapse collapse " aria-labelledby="heading10"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body customize-acc-body scrollable-list">
                            <div v-for="(item, index) in getSpecificationsData" :key="index" class="form-check">
                                <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio"
                                    name="car" :value="item.name" @change="selectedSpecificationFunc(item.id)">
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
                                <img loading="lazy" src="/img/icons/car.svg">
                                <span>{{ $t('filter_oil_type') }}</span>
                            </div>
                        </button>
                    </h2>
                    <div id="collapse9" class="accordion-collapse collapse " aria-labelledby="heading9"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body customize-acc-body  scrollable-list">
                            <div v-for="(item, index) in getOilTypesData" :key="index" class="form-check">
                                <input class="form-check-input" :id="'flexRadioDefault' + (index)" type="radio"
                                    name="car" :value="item.name" @change="selectedOilTypeFunc(item.id)">
                                <label class="form-check-label" :for="'flexRadioDefault' + (index)">{{ item.name
                                    }}</label>
                                <!-- <span>(345)</span> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</transition>
        </div>
    </div>




    <!-- end left side list-->

</template>

<style>
.title-fill img {
    width: 22px;
}

.title-fill.model img {
    width: 28px;
    margin-right: -4px;
}

.title-fill.model span {
    margin-right: -3px;
}

.scrollable-list {
    max-height: 200px;
    /* Set the max height you want for the scrollable area */
    overflow-y: auto;
    /* Enable vertical scrolling */
    margin-top: 10px;
    /* Optional: Space above the scrollable area */
}

#iconfilter {
    float: left;
    cursor: pointer;
}

.fill-down {
    display: inline;
    cursor: pointer;
}
.fade-slide-enter-active, .fade-slide-leave-active {
    transition: all 0.3s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
.fade-slide-enter-to, .fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
}



/* Optional: Add custom styles for your viewer component */
</style>
