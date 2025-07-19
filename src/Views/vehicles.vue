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
                ownerId: 0,
                stateId : 0,
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
                pageSize: 6
            },

            pagination: {
                currentPage: 1,
                pageCount: 3,
                pageSize: 3,
                rowCount: 9,
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

    created() {

        this.initFunc();

    },
    watch: {

    },

    computed: {
        ...mapGetters("Announcement", ["getVerticalAnnouncementData", "getHorizontalAnnouncementData"]),
        ...mapGetters("Vehicles", ["getVehiclesData"]),

        startItem() {
            return (this.pagination.currentPage - 1) * this.pagination.pageSize + 1;
        },
        endItem() {
            return Math.min(this.pagination.currentPage * this.pagination.pageSize, this.pagination.rowCount);
        }

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
                this.pagination = this.getVehiclesData.vehicles.pagination;
                // console.log("vehicles : ", this.getVehiclesData);
                // console.log("this.pagination : ", this.pagination);
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
                this.pagination = this.getVehiclesData.vehicles.pagination;
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

        handleFilterChange({stateId,vehicleBrandId,vehicleModelId,yearFrom,yearTo,priceFrom,priceTo,mealsFrom,mealsTo,color,bodyType,specification,paintedType,paintedStatus,gearType,oilType }) {
            
            this.dataSearch.stateId = stateId;
            this.dataSearch.vehicleBrandId = vehicleBrandId;
            this.dataSearch.vehicleModelId = vehicleModelId;
            this.dataSearch.yearFrom = yearFrom;
            this.dataSearch.yearTo = yearTo;
            this.dataSearch.priceFrom = priceFrom;
            this.dataSearch.priceTo = priceTo;
            this.dataSearch.mealsFrom = mealsFrom;
            this.dataSearch.mealsTo = mealsTo;
            this.dataSearch.color = color;
            this.dataSearch.bodyType = bodyType;
            this.dataSearch.specification = specification;
            this.dataSearch.paintedType = paintedType;
            this.dataSearch.paintedStatus = paintedStatus;
            this.dataSearch.gearType = gearType;
            this.dataSearch.oilType = oilType ;
            this.dataSearch.page = 1;
             this.SearchChangeFunc();

        },

        handleYearSelection({ from, to }) {
            this.dataSearch.yearFrom = from;
            this.dataSearch.yearTo = to;
            this.dataSearch.page = 1;
            this.SearchChangeFunc();
        },
        
        handlePriceSelection({ from, to }) {
            this.dataSearch.priceFrom = from;
            this.dataSearch.priceTo = to;
            this.dataSearch.page = 1;
            this.SearchChangeFunc();
        },
        handleMealSelection({ from, to }) {
            this.dataSearch.mealsFrom = from;
            this.dataSearch.mealsTo = to;
            this.dataSearch.page = 1;
            this.SearchChangeFunc();
        },
        handleBrandSelection(id) {
            this.dataSearch.vehicleBrandId = id;
            this.dataSearch.page = 1;
            this.SearchChangeFunc();
        },
        handleBrandModelSelection(id) {
            this.dataSearch.vehicleModelId = id;
            this.dataSearch.page = 1;
            this.SearchChangeFunc();
        },
        handlePaintedStatusSelection(id) {
            this.dataSearch.paintedStatus = id;
            this.dataSearch.page = 1;
            this.SearchChangeFunc();
        },
        handleSpecificationSelection(id) {
            this.dataSearch.specification = id;
            this.dataSearch.page = 1;
            this.SearchChangeFunc();
        },
        handleBodyTypeSelection(id) {
            this.dataSearch.bodyType = id;
            this.dataSearch.page = 1;
            this.SearchChangeFunc();
        },
        handleColorSelection(id) {
            this.dataSearch.color = id;
            this.dataSearch.page = 1;
            this.SearchChangeFunc();
        },
        handlePaintedTypeSelection(id) {
            this.dataSearch.paintedType = id;
            this.dataSearch.page = 1;
            this.SearchChangeFunc();
        },
        handleGearTypeSelection(id) {
            this.dataSearch.gearType = id;
            this.SearchChangeFunc();
        },
        handleOilTypeSelection(id) {
            this.dataSearch.oilType = id;
            this.dataSearch.page = 1;
            this.SearchChangeFunc();
        },

        goToPage(page) {
            if (page < 1 || page > this.pagination.pageCount) return;
            this.dataSearch.page = page;
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

    <section class="profile vehicles mt-5">
        <div class="container">
            <div class="row mt-5 h-100">
                <!--  start left side list  -->
                <Filter @filterChange="handleFilterChange"></Filter>
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
                            <productCard v-for="item in this.getVehiclesData.vehicles.data" :product='item'>
                            </productCard>
                        </div>
                        <!-- <div class="row">
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
                        </div> -->
                        <div class="row">
                            <div class="pag">
                                <p class="count">
                                    أظهر {{ startItem }} إلى {{ endItem }} من {{ pagination.rowCount }}
                                </p>
                                <ul class="pagination">
                                    <li :class="{ disabled: pagination.currentPage === 1 }">
                                        <a href="#" @click.prevent="goToPage(pagination.currentPage - 1)">
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </a>
                                    </li>
                                    <li v-for="page in pagination.pageCount" :key="page"
                                        :class="{ active: pagination.currentPage === page }">
                                        <a href="#" @click.prevent="goToPage(page)">
                                            {{ page }}
                                        </a>
                                    </li>
                                    <li :class="{ disabled: pagination.currentPage === pagination.pageCount }">
                                        <a href="#" @click.prevent="goToPage(pagination.currentPage + 1)">
                                            <i class="fa-solid fa-arrow-left"></i>
                                        </a>
                                    </li>
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