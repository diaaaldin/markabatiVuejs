<script>
import { useHead } from '@vueuse/head'
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import axios from "axios";

import pageNav from '@/components/lightNavbar.vue';
import pageFooter from '@/components/footer.vue';
import lowerAnnouncement from '@/components/Announcement/lowerAnnouncement.vue'
import productCard from '@/components/Cards/productCard.vue';
import Filter from '@/components/Vehicles/filter.vue'

export default {

    data() {
        return {

            dataSearch: {
                // exceptionIds: [],
                ownerId: 0,
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

                page: 1,
                pageSize: 12
            },
        }
    },
    mounted() {
        this.MainSlider();

        useHead({
            title: 'Vehicles | Markabati',
            meta: [
                {
                    name: `description`,
                    content: 'Yalla Party is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties.',
                },
            ],
        });

        //document.addEventListener('click', this.closeDropdown);
    },
    components: {
        pageNav,
        pageFooter,
        lowerAnnouncement,
        productCard,
        Filter,
    },

    emits: {

    },

    async created() {

        this.initFunc();

    },
    watch: {
        // Watch for changes in the event prop's stateId
        // "getCompanyData.stateId": {
        //     immediate: true,
        //     handler(newStateId) {
        //         if (newStateId) {
        //             this.fetchSearchCities(newStateId);
        //         }
        //     }
        // }
    },

    computed: {
        ...mapGetters("Announcement", ["getVerticalAnnouncementData", "getHorizontalAnnouncementData"]),
        ...mapGetters("Vehicles", ["getVehiclesData"]),

    },
    methods: {
        ...mapActions("Announcement", ["GetVerticalAnnouncementActiveOrder", "GetHorizontalAnnouncementActiveOrder"]),
        ...mapActions("Vehicles", ["GetVehiclesRandomly"]),

        initFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });

            this.GetHorizontalAnnouncementActiveOrder();
            this.GetVehiclesRandomly(this.dataSearch).then(Response => {
                console.log("vehicles : ", this.getVehiclesData);
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
        SearchChangeFunc() {
            this.GetData();
        },
        GetData() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });

            this.GetVehiclesRandomly(this.dataSearch).then(Response => {
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
        seeMoreFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });

            this.productsData.forEach(tool => {
                this.dataSearch.exceptionIds.push(tool.id);
            });
            this.GetProducts(this.dataSearch).then(Response => {
                Response.products.data.forEach(event => {
                    this.productsData.push(event);
                });
                if (Response.products.pagination.currentPage >= Response.products.pagination.pageCount) this.moreDataShow = false;
                else this.moreDataShow = true;

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
        MainSlider() {
            $('.slider').slick({
                dots: true,
                infinite: false,
                speed: 300,
                slidesToShow: 1,
                rtl: true,
                autoplay: true,
                autoplaySpeed: 2000,
                prevArrow: '<button class="slick-prev prev-arrow"> <i class="fa-solid fa-angle-right"></i></button>',
                nextArrow: '<button class="slick-next next-arrow"> <i class="fa-solid fa-angle-left"></i></button>',
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 1008,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            arrows: false,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    }
                ]
            });
        },

        handleYearSelection({ from, to }) {
            this.dataSearch.yearFrom = from;
            this.dataSearch.yearTo = to;
            this.SearchChangeFunc();
        },
        handlePriceSelection({ from, to }) {
            this.dataSearch.priceFrom = from;
            this.dataSearch.priceTo = to;
            this.SearchChangeFunc();
        },
        handleMealSelection({ from, to }) {
            this.dataSearch.mealsFrom = from;
            this.dataSearch.mealsTo = to;
            this.SearchChangeFunc();
        },
        handleBrandSelection(id) {
            this.dataSearch.vehicleBrandId = id;
            this.SearchChangeFunc();
        },
        handleBrandModelSelection(id) {
            this.dataSearch.vehicleModelId = id;
            this.SearchChangeFunc();
        },
        handlePaintedStatusSelection(id) {
            this.dataSearch.paintedStatus = id;
            this.SearchChangeFunc();
        },
        handleSpecificationSelection(id) {
            this.dataSearch.specification = id;
            this.SearchChangeFunc();
        },
        handleBodyTypeSelection(id) {
            this.dataSearch.bodyType = id;
            this.SearchChangeFunc();
        },
        handleColorSelection(id) {
            this.dataSearch.color = id;
            this.SearchChangeFunc();
        },
        handlePaintedTypeSelection(id) {
            this.dataSearch.paintedType = id;
            this.SearchChangeFunc();
        },
        handleGearTypeSelection(id) {
            this.dataSearch.gearType = id;
            this.SearchChangeFunc();
        },
        handleOilTypeSelection(id) {
            this.dataSearch.oilType = id;
            this.SearchChangeFunc();
        },

    },
    beforeDestroy() {
        document.removeEventListener('click', this.closeDropdown);
    }
};
</script>
<template>
    <pageNav></pageNav>
    <div class="bread">
        <nav>
            <div class="container">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link to="/" :class="{ active: $route.path === '/' }"> {{ $t('location_menu_main') }}
                        </router-link>
                    </li>

                    <li class="breadcrumb-item active" aria-current="page">{{ $t('location_menu_vehicles') }}</li>
                </ol>

            </div>
        </nav>
    </div>

    <section class="profile campany mt-5">
        <div class="container">
            <div class="row mt-5 h-100">
                <!--  start left side list  -->
                <Filter @yearSelected="handleYearSelection" @priceSelected="handlePriceSelection"
                    @mealSelected="handleMealSelection" @brandSelected="handleBrandSelection"
                    @brandModelSelected="handleBrandModelSelection"
                    @paintedStatusSelected="handlePaintedStatusSelection"
                    @specificationSelected="handleSpecificationSelection" @bodyTypeSelected="handleBodyTypeSelection"
                    @colorSelected="handleColorSelection" @paintedTypeSelected="handlePaintedTypeSelection"
                    @gearTypeSelected="handleGearTypeSelection" @oilTypeSelected="handleOilTypeSelection"></Filter>
                <!-- end left side list-->

                <!-- right side container -->
                <div class="col-12 col-lg-9 ">
                    <div class="container white_card mt-2 right-side">
                        <span class="header-title"> {{ $t('vehicles_title') }} </span>
                        <!-- <select class="header-drop form-select p-3 align-items-center d-flex mx-lg-2"
                            aria-label="Default select example">
                            <option selected=""> من الأعلى الى الأسفل</option>
                            <option value="1">من الأسفل الى الأعلى</option>
                        </select> -->
                        <div class="clearfix"></div>
                        <div class="row">
                            <productCard v-for="item in this.getVehiclesData.vehicles.data" :product='item' ></productCard>
                        </div>
                        <div class="row">
                            <div class="pag">
                                <p class="count">أظهر 1 من 5</p>
                                <ul class="pagination">
                                    <li><a href="#"><i class="fa-solid fa-arrow-right"></i></a></li>
                                    <li class="active"><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#"><i class="fa-solid fa-arrow-left"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- end right side -->
            </div>
        </div>
    </section>
    
    <lowerAnnouncement></lowerAnnouncement>

    <pageFooter></pageFooter>
</template>
<style scoped></style>