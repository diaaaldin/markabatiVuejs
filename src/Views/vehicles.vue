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
            },

            page: 1,
            pageSize: 12,

            pagination: {
                currentPage: 1,
                pageCount: 3,
                pageSize: 1,
                rowCount: 9,
            },
            windowWidth: window.innerWidth,
        }
    },
    // mounted() {
    //     this.MainSlider();

    //     useHead({
    //         title: 'Vehicles | Markabati',
    //         meta: [
    //             {
    //                 name: `description`,
    //                 content: 'Yalla Party is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties.',
    //             },
    //         ],
    //     });

    //     //document.addEventListener('click', this.closeDropdown);
    // },
    mounted() {
        this.MainSlider();
        this.handleResize();
        window.addEventListener('resize', this.handleResize);

        useHead({
            title: ' مركبتي | معرض المركبات',
            meta: [
                {
                    name: 'description',
                    content: 'تصفح أكبر مجموعة من السيارات الجديدة والمستعملة للبيع في فلسطين. ابحث عن سيارات سيدان، دفع رباعي، سيارات عائلية، تجارية وأكثر بأسعار تنافسية.'
                },
                {
                    name: 'keywords',
                    content: 'سيارات للبيع فلسطين, معارض سيارات, سيارات مستعملة فلسطين, سيارات جديدة فلسطين, أسعار السيارات, دفع رباعي للبيع, سيارات عائلية, مركبات تجارية, بحث عن سيارات, فلتر سيارات , مركبتي فلسطين'
                },
                {
                    property: 'og:title',
                    content: 'معرض السيارات | أكبر سوق لبيع وشراء المركبات في فلسطين | مركبتي'
                },
                {
                    property: 'og:description',
                    content: 'تصفح أكبر مجموعة من السيارات الجديدة والمستعملة للبيع في فلسطين. ابحث عن سيارات سيدان، دفع رباعي، سيارات عائلية، تجارية وأكثر بأسعار تنافسية.'
                },
                {
                    property: 'og:type',
                    content: 'website'
                },
                {
                    name: 'robots',
                    content: 'index, follow, max-image-preview:large'
                },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                }
            ],

            htmlAttrs: {
                lang: 'ar',
                dir: 'rtl'
            },

            link: [
                {
                    rel: 'canonical',
                    href: window.location.href 
                }
            ],
        });
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
        },
        visiblePages() {
            const total = this.pagination.pageCount;
            const current = this.pagination.currentPage;
            const pages = [];
            
            // For mobile: show max 3 pages, for desktop: show max 5 pages
            const maxVisible = this.windowWidth < 768 ? 3 : 5;
            
            if (total <= maxVisible) {
                // Show all pages if total is less than max visible
                for (let i = 1; i <= total; i++) {
                    pages.push(i);
                }
            } else {
                // Show pages around current page
                let start = Math.max(1, current - Math.floor(maxVisible / 2));
                let end = Math.min(total, start + maxVisible - 1);
                
                // Adjust start if we're near the end
                if (end - start < maxVisible - 1) {
                    start = Math.max(1, end - maxVisible + 1);
                }
                
                for (let i = start; i <= end; i++) {
                    pages.push(i);
                }
            }
            
            return pages;
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
            this.GetVehiclesRandomly({
                searchData: this.dataSearch,
                page: this.page,
                pageSize: this.pageSize
            }).then(Response => {
                this.pagination = this.getVehiclesData.vehicles.pagination;
                // console.log("vehicles : ", this.getVehiclesData);
                // console.log("this.pagination : ", this.pagination);
                loading.close();
            }).catch(error => {
                const errorMessage = error?.response?.data?.message || error?.message || 'حدث خطأ أثناء تحميل البيانات';
                this.$moshaToast(errorMessage, {
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

            console.log("this.dataSearch : ", this.dataSearch);
            this.GetVehiclesRandomly({
                searchData: this.dataSearch,
                page: this.page,
                pageSize: this.pageSize
            }).then(Response => {
                this.pagination = this.getVehiclesData.vehicles.pagination;
                loading.close();
            }).catch(error => {
                const errorMessage = error?.response?.data?.message || error?.message || 'حدث خطأ أثناء تحميل البيانات';
                this.$moshaToast(errorMessage, {
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
            // Check if jQuery and slick are available
            if (typeof $ === 'undefined' || !$.fn.slick) {
                console.warn('jQuery or Slick slider not available');
                return;
            }
            
            // Use scoped selector to only target this component's slider
            const $slider = $(this.$el).find('.slider');
            
            // Check if slider element exists and is not already initialized
            if ($slider.length && !$slider.hasClass('slick-initialized')) {
                $slider.slick({
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
            }
        },

        handleFilterChange({ stateId, vehicleBrandId, vehicleModelId, yearFrom, yearTo, priceFrom, priceTo, mealsFrom, mealsTo, color, bodyType, specification, paintedType, paintedStatus, gearType, oilType }) {

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
            this.dataSearch.oilType = oilType;
            this.page = 1;
            this.SearchChangeFunc();

        },

        handleYearSelection({ from, to }) {
            this.dataSearch.yearFrom = from;
            this.dataSearch.yearTo = to;
            this.page = 1;
            this.SearchChangeFunc();
        },

        handlePriceSelection({ from, to }) {
            this.dataSearch.priceFrom = from;
            this.dataSearch.priceTo = to;
            this.page = 1;
            this.SearchChangeFunc();
        },
        handleMealSelection({ from, to }) {
            this.dataSearch.mealsFrom = from;
            this.dataSearch.mealsTo = to;
            this.page = 1;
            this.SearchChangeFunc();
        },
        handleBrandSelection(id) {
            this.dataSearch.vehicleBrandId = id;
            this.page = 1;
            this.SearchChangeFunc();
        },
        handleBrandModelSelection(id) {
            this.dataSearch.vehicleModelId = id;
            this.page = 1;
            this.SearchChangeFunc();
        },
        handlePaintedStatusSelection(id) {
            this.dataSearch.paintedStatus = id;
            this.page = 1;
            this.SearchChangeFunc();
        },
        handleSpecificationSelection(id) {
            this.dataSearch.specification = id;
            this.page = 1;
            this.SearchChangeFunc();
        },
        handleBodyTypeSelection(id) {
            this.dataSearch.bodyType = id;
            this.page = 1;
            this.SearchChangeFunc();
        },
        handleColorSelection(id) {
            this.dataSearch.color = id;
            this.page = 1;
            this.SearchChangeFunc();
        },
        handlePaintedTypeSelection(id) {
            this.dataSearch.paintedType = id;
            this.page = 1;
            this.SearchChangeFunc();
        },
        handleGearTypeSelection(id) {
            this.dataSearch.gearType = id;
            this.SearchChangeFunc();
        },
        handleOilTypeSelection(id) {
            this.dataSearch.oilType = id;
            this.page = 1;
            this.SearchChangeFunc();
        },

        goToPage(page) {
            if (page < 1 || page > this.pagination.pageCount) return;
            this.page = page;
            this.SearchChangeFunc();
        },

        handleResize() {
            this.windowWidth = window.innerWidth;
        },

    },
    beforeDestroy() {
        document.removeEventListener('click', this.closeDropdown);
        window.removeEventListener('resize', this.handleResize);
        
        // Cleanup slick slider if initialized
        if (typeof $ !== 'undefined' && $.fn.slick) {
            const $slider = $(this.$el).find('.slider');
            if ($slider.length && $slider.hasClass('slick-initialized')) {
                $slider.slick('unslick');
            }
        }
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
                    <div v-if="!this.getVehiclesData.vehicles.data || this.getVehiclesData.vehicles.data.length === 0"
                        class="alert alert-danger mt-3 d-flex justify-content-center">
                        {{ $t('general_empty_table') }}
                    </div>
                    <div v-else class="container white_card mt-2 right-side">
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
                                        <a href="#" @click.prevent="goToPage(pagination.currentPage - 1)" class="pagination-link">
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </a>
                                    </li>
                                    <li v-if="visiblePages[0] > 1" class="pagination-ellipsis">
                                        <span>...</span>
                                    </li>
                                    <li v-for="page in visiblePages" :key="page"
                                        :class="{ active: pagination.currentPage === page }">
                                        <a href="#" @click.prevent="goToPage(page)" class="pagination-link">
                                            {{ page }}
                                        </a>
                                    </li>
                                    <li v-if="visiblePages[visiblePages.length - 1] < pagination.pageCount" class="pagination-ellipsis">
                                        <span>...</span>
                                    </li>
                                    <li :class="{ disabled: pagination.currentPage === pagination.pageCount }">
                                        <a href="#" @click.prevent="goToPage(pagination.currentPage + 1)" class="pagination-link">
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
<style scoped>
.pag {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 20px 0;
}

.pag .count {
    margin: 0;
    font-size: 14px;
    color: #666;
    text-align: center;
}

.pag .pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 5px;
    list-style: none;
    padding: 0;
    margin: 0;
}

.pag .pagination li {
    min-width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 8px;
    border: 1px solid #ccced2;
    transition: all 0.4s ease-in-out;
    cursor: pointer;
}

.pag .pagination li.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}

.pag .pagination li.disabled a {
    pointer-events: none;
}

.pag .pagination li.pagination-ellipsis {
    border: none;
    background: transparent;
    cursor: default;
    min-width: auto;
    padding: 0 5px;
}

.pag .pagination li.pagination-ellipsis span {
    color: #666;
    font-size: 16px;
}

.pag .pagination li a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    text-decoration: none;
    padding: 0 8px;
    -webkit-tap-highlight-color: transparent;
}

.pag .pagination li.active {
    background-color: black;
    border-color: black;
}

.pag .pagination li.active a {
    color: white;
}

.pag .pagination li:not(.disabled):not(.pagination-ellipsis):hover {
    background-color: black;
    border-color: black;
}

.pag .pagination li:not(.disabled):not(.pagination-ellipsis):hover a {
    color: white;
}

/* Mobile responsive styles */
@media screen and (max-width: 768px) {
    .pag {
        padding: 15px 0;
    }

    .pag .count {
        font-size: 12px;
        margin-bottom: 10px;
    }

    .pag .pagination {
        gap: 3px;
        width: 100%;
        justify-content: center;
    }

    .pag .pagination li {
        min-width: 36px;
        height: 36px;
        margin: 0;
        font-size: 14px;
    }

    .pag .pagination li a {
        padding: 0 4px;
        font-size: 14px;
    }

    .pag .pagination li.pagination-ellipsis {
        min-width: 20px;
        padding: 0 2px;
    }

    .pag .pagination li.pagination-ellipsis span {
        font-size: 14px;
    }
}

@media screen and (max-width: 480px) {
    .pag .pagination li {
        min-width: 32px;
        height: 32px;
        font-size: 12px;
    }

    .pag .pagination li a {
        font-size: 12px;
        padding: 0 2px;
    }
}
</style>