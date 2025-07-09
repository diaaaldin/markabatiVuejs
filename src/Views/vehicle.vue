<script>
import { useHead } from '@vueuse/head'
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import Vehicle360View from "@/components/Image360/Vehicle360View.vue";



import pageNav from '@/components/lightNavbar.vue';
import pageFooter from '@/components/footer.vue';
import ImageSlider from '@/components/ImageSlider.vue';
// import { pointManagmentOperation } from '@/config/config';
import productSemilerCard from '@/components/Cards/productSemilerCard.vue'
import { CurrenceEnum } from '@/config/config.js';


export default {
    data() {
        return {
            emailError: '',
            data: {
                id: 2,
                ownerName: "Super Admin Diaa",
                ownerId: 1,
                ownerImage: "http://localhost:4000/UserImage\\bd20458f15ae4526b09923128071bb02Logo.png",
                ownerMobile: "123456789",
                ownerSlug: "1_test",
                brandId: 4,
                brandName: "هيونداي",
                modelId: 59,
                modelName: "اكسنت",
                year: 2121,
                price: 121212,
                currency: 74,
                meals: 31231231,
                color: "برتقالي",
                bodyType: "شاحنة صغيرة",
                specification: "أمريكي",
                paintedType: "اللؤلؤي",
                paintedStatus: "جيدة جداً",
                gearType: "الإثنين معاً",
                oilType: "سولار",
                description: "                                            فيراري 488 جي تي بي هي سيارة رياضية فائقة الأداء (سوبر كار) من إنتاج شركة                                            فيراري الإيطالية، وتم الكشف عنها لأول مرة في عام 2015 كخلفية لطراز فيراري                                            458. تعتبر 488 جي تي بي مزيجا مثاليا من الأدالء العالي، التصمي الجذاب،                                            والتفنيات الحديثة. ",
                slug: "2_507_بي_ام_دبليو",
                image: "http://localhost:4000/VehicleImages\\c479870b10204787851df96f2e33a875Logo.png",
                image360: "",
                vehicleImages: ['http://localhost:4000/VehicleImages\\5d56a9319e41424485c19dfc69f3f716Logo.png', 'http://localhost:4000/VehicleImages\\746d719ece1940858229f53e13f38d0fLogo.png', 'http://localhost:4000/VehicleImages\\bc1916969ef84f14adb3156084377b88Logo.png', 'http://localhost:4000/VehicleImages\\733dbe7c4bbb4f18a7760b0c00acd74bLogo.png', 'http://localhost:4000/VehicleImages\\9b15e3f182eb4c90a770903f167b2b93Logo.png'],
                bestThreeCategories: ['sdfsdf', 'sdfsdf', 'sdfsdf'],
                cardOfVehicle: [],
                vehicleCategoryExtension: [],
            },

        }
    },
    watch: {
        '$route.fullPath': {
            handler() {
                this.initFunc(); // يعيد جلب البيانات عند تغيير الرابط
            },
            immediate: false,
        },
    },
    mounted() {
        this.recordVisit();

        useHead({
            // Can be static or computed
            title: 'Product Details | YallaParty',
            meta: [
                {
                    name: `description`,
                    content: 'Yalla Party is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties.',
                },
            ],

        });
    },
    beforeUnmount() {
        // Properly destroy the instance when the component is unmounted


    },
    components: {
        pageNav,
        pageFooter,
        ImageSlider,
        productSemilerCard,
        Vehicle360View,

    },

    emits: {

    },

    created() {
        this.initFunc();
    },

    computed: {
        ...mapGetters("Vehicles", ["getVehicleData"]),
        ...mapGetters("Code", ["getStatesData", "getCitiesData"]),

    },
    methods: {
        ...mapActions("Vehicles", ["GetVehicle"]),
        ...mapActions("Visit", ["RecordVisit"]),


        initFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });

            const path = window.location.pathname;
            const lastSection = path.split('/').pop(); // Get the last section of the URL
            const idMatch = lastSection.match(/^\d+/); // Match numbers at the start of the string
            const id = idMatch ? idMatch[0] : null; // Extract the first number if it exists

            this.GetVehicle(id).then(Response => {
                this.data = this.getVehicleData;
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

        toSellerGallaryFunc() {
            this.$router.push({ name: "gallary", params: { slug: this.data.ownerSlug } });

        },

        ownerImageFunc(imgae) {
            const imageUrl = imgae
                ? imgae
                : "/img/seller/seller.png";

            return imageUrl;
        },

        clearData() {
            this.buyData.paymentMethod = 0;

            this.buyData.data.sessionId = "";
            this.buyData.data.productId = 0;
            this.buyData.data.name = "";
            this.buyData.data.mobile = "";
            this.buyData.data.email = "";
            this.buyData.data.discountCode = "";

            this.buyData.productData.id = "";
            this.buyData.productData.title = "";
            this.buyData.productData.description = "";
            this.buyData.productData.imageUrl = "";
            this.buyData.productData.price = "";

            this.selectedTicket = {};
            this.TicketSelectName = "";
            this.isDiscountSuccess = false;
            this.discountMessage = "";

        },

        formatCurrency(value, currency) {
            let currencyCode = "";

            switch (currency) {
                case CurrenceEnum.NIS:
                    currencyCode = "ILS";
                    break;
                case CurrenceEnum.JOD:
                    currencyCode = "JOD";
                    break;
                default:
                    currencyCode = "USD";
            }

            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currencyCode,
                // Allows up to 1 decimal digit
                minimumFractionDigits: 0, // No decimals
                maximumFractionDigits: 0  // No decimals
            }).format(value);
        },

        stripHtml(html) {
            const div = document.createElement('div');
            div.innerHTML = html;
            const text = div.textContent || div.innerText || '';
            return text.length > 200 ? text.slice(0, 200) + '...' : text;
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
        },

        async recordVisit() {
            try {
                // Create the visitData object 	
                const visitData = {
                    ip: "", // Get the user's IP from the fetched data
                    userAgent: navigator.userAgent,
                    route: this.$route.path
                };
                // Log the visitData for debugging
                // If needed, send the data to your backend
                this.RecordVisit(visitData).then(Response => {
                }).catch(error => {
                    console.log(error.response.data.message);
                });
            } catch (error) {
                // Handle any errors (network issues, API failure, etc.)
                console.error("Error fetching IP:", error);
            }
        },

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
                    <li class="breadcrumb-item">
                        <router-link to="/vehicles" :class="{ active: $route.path === '/vehicles' }"> {{
                            $t('location_menu_vehicles') }} </router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">{{ data.modelName }} </li>
                </ol>
            </div>
        </nav>
    </div>

    <section class="details-car mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <ImageSlider :images="data.vehicleImages"></ImageSlider>
                </div>
                <div class="col-md-6">
                    <div class="info">
                        <div class="d-flex justify-content-between align-items-baseline mb-2">
                            <h6 class="justify-content-start">{{ data.brandName }}</h6>
                            <a href="javascript:void(0)" class="justify-content-end">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.7878 3.10215C11.283 2.09877 12.7138 2.09876 13.209 3.10215L15.567 7.87987L20.8395 8.64601C21.9468 8.80691 22.3889 10.1677 21.5877 10.9487L17.7724 14.6676L18.6731 19.9189C18.8622 21.0217 17.7047 21.8627 16.7143 21.342L11.9984 18.8627L7.28252 21.342C6.29213 21.8627 5.13459 21.0217 5.32374 19.9189L6.2244 14.6676L2.40916 10.9487C1.60791 10.1677 2.05005 8.80691 3.15735 8.64601L8.42988 7.87987L10.7878 3.10215ZM11.9984 4.03854L9.74008 8.61443C9.54344 9.01288 9.16332 9.28904 8.72361 9.35294L3.67382 10.0867L7.32788 13.6486C7.64606 13.9587 7.79125 14.4055 7.71614 14.8435L6.85353 19.8729L11.3702 17.4983C11.7635 17.2915 12.2333 17.2915 12.6266 17.4983L17.1433 19.8729L16.2807 14.8435C16.2056 14.4055 16.3508 13.9587 16.6689 13.6486L20.323 10.0867L15.2732 9.35294C14.8335 9.28904 14.4534 9.01288 14.2568 8.61443L11.9984 4.03854Z"
                                        fill="#999999"></path>
                                </svg>
                            </a>
                        </div>
                        <h1>{{ data.modelName }} </h1>
                        <div class="d-flex align-items-center">
                            <span class="price"> {{ formatCurrency(data.price, data.currency) }} </span>
                            <!-- <span class="des"> 34.75$ </span> -->
                        </div>

                        <div class="d-flex justify-content-between">
                            <div class=" d-flex  flex-column">
                                <div class="d-flex align-items-center mb-3">
                                    <ul class="details">

                                        <li v-for="item in data.bestThreeCategories">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.2197 6.96967L8.75 11.4393L6.78033 9.4697C6.48744 9.1768 6.01256 9.1768 5.71967 9.4697C5.42678 9.7626 5.42678 10.2374 5.71967 10.5303L8.2197 13.0303C8.5126 13.3232 8.9874 13.3232 9.2803 13.0303L14.2803 8.0303C14.5732 7.73744 14.5732 7.26256 14.2803 6.96967C13.9874 6.67678 13.5126 6.67678 13.2197 6.96967Z"
                                                    fill="black" />
                                            </svg>
                                            {{ item }}
                                        </li>
                                        <p> {{ stripHtml(data.description) }}
                                            <a href="#vehicle-description-section"> ><span class="more">مشاهدة
                                                    المزيد</span></a>
                                        </p>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="seller">
                            <div class="img">
                                <!-- <img src="/img/seller.png" class="" alt="...">
                                <img :src="data.ownerImage" class="" alt="..."> -->
                                <img v-on:click="toSellerGallaryFunc()"
                                    :src="data.ownerImage && data.ownerImage !== '' ? data.ownerImage : '/img/seller.png'"
                                    alt="...">

                            </div>
                            <div class="name">
                                <p> {{ data.ownerName }}</p>
                                <span>بائع</span>
                            </div>
                            <div class="row">
                                <div class="col-6 text-center">
                                    <a data-bs-toggle="modal" :data-bs-target="'#contact_with_seller_' + data.id"
                                        href="javascript:void(0)">
                                        <p class="contact">{{ $t('vehicle_btn_contact_with_seller') }} </p>
                                    </a>
                                </div>
                                <div class="col-6 text-center">
                                    <!-- <a data-bs-toggle="modal" data-bs-target="#image360_modal"
                                        href="javascript:void(0)">
                                        <p class="call"> {{ $t('vehicle_btn_get_in') }} </p>
                                    </a> -->
                                    <a :class="{ 'link-disabled': !data.image360 }"
                                        :style="{ pointerEvents: !data.image360 ? 'none' : 'auto' }"
                                        :data-bs-toggle="data.image360 ? 'modal' : null"
                                        :data-bs-target="data.image360 ? '#image360_modal' : null"
                                        href="javascript:void(0)">
                                        <p class="call">{{ $t('vehicle_btn_get_in') }}</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2 text-center">
                    <div class="details-squre">
                        <span></span>
                        <h5>{{ $t('vehicle_card_brand') }}</h5>
                        <p>{{ data.brandName }}</p>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="details-squre">
                        <span></span>
                        <h5> {{ $t('vehicle_card_model') }}</h5>
                        <p>{{ data.modelName }}</p>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="details-squre">
                        <span></span>
                        <h5> {{ $t('vehicle_card_year') }}</h5>
                        <p> {{ data.year }}</p>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="details-squre">
                        <span></span>
                        <h5>{{ $t('vehicle_card_price') }}</h5>
                        <p> {{ formatCurrency(data.price, data.currency) }}</p>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="details-squre">
                        <span></span>
                        <h5>{{ $t('vehicle_card_meals') }}</h5>
                        <p> {{ data.meals }}</p>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="details-squre">
                        <span></span>
                        <h5> {{ $t('vehicle_card_color') }}</h5>
                        <p> {{ data.color }}</p>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="details-squre">
                        <span></span>
                        <h5>{{ $t('vehicle_card_body_type') }}</h5>
                        <p>{{ data.bodyType }} </p>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="details-squre">
                        <span></span>
                        <h5> {{ $t('vehicle_card_specefication') }}</h5>
                        <p> {{ data.specification }}</p>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="details-squre">
                        <span></span>
                        <h5>{{ $t('vehicle_card_painting_type') }}</h5>
                        <p>{{ data.paintedType }} </p>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="details-squre">
                        <span></span>
                        <h5> {{ $t('vehicle_card_painting_status') }}</h5>
                        <p> {{ data.paintedStatus }}</p>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="details-squre">
                        <span></span>
                        <h5>{{ $t('vehicle_card_gear_type') }}</h5>
                        <p> {{ data.gearType }}</p>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="details-squre">
                        <span></span>
                        <h5>{{ $t('vehicle_card_oil_type') }}</h5>
                        <p> {{ data.oilType }}</p>
                    </div>
                </div>
            </div>
            <div id="vehicle-description-section" class="row">
                <div class="col-12">
                    <div class="public-view">
                        <h1 class="line-green">{{ $t('vehicle_discreption') }} </h1>
                        <div class="col-12 mt-4">
                            <p v-html="data.description"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="same-vehicle">
                        <h1>{{ $t('vehicle_vehicle_semiler') }} </h1>
                        <div class="row">
                            <productSemilerCard v-for="item in data.cardOfVehicle" :product='item'></productSemilerCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <pageFooter></pageFooter>

    <div class="modal fade" :id="'contact_with_seller_' + data.id" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> تواصل مع البائع </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card seller_card">
                        <div class="img">
                            <img v-on:click="toSellerGallaryFunc()" :src="ownerImageFunc(data.ownerImage)" class=""
                                alt="...">
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-center align-items-baseline mb-2">
                                <h6 class="card-title justify-content-center">{{ data.ownerName }} </h6>
                            </div>
                            <div class="d-flex justify-content-center">
                                <div class="d-flex flex-column">
                                    <div class="d-flex align-items-center mb-2">
                                        <ul class="addresul text-center">
                                            <li>{{ cityNameFunc(data.ownerAddressCityId) }} / {{
                                                stateNameFunc(data.ownerAddressStateId) }} </li>
                                            <li>{{ data.ownerAddressInfo }}</li>
                                        </ul>
                                    </div>
                                    <div class="card-show">
                                        <div class="d-flex justify-content-center">
                                            <ul class="show-more-details text-center">
                                                <li><svg width="15" height="15" viewBox="0 0 28 28" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z"
                                                            fill="#24DC26"></path>
                                                    </svg> للتواصل: {{ data.ownerMobile }} </li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">
                        راسل البائع
                        <svg viewBox="0 0 24 24" width="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M17.4145 14.3822C17.1173 14.2334 15.6564 13.5147 15.384 13.4153C15.1117 13.3162 14.9136 13.2667 14.7154 13.5641C14.5173 13.8615 13.9478 14.5309 13.7745 14.7293C13.6012 14.9275 13.4278 14.9524 13.1307 14.8036C12.8335 14.6549 11.876 14.3411 10.7411 13.3287C9.85769 12.5407 9.26129 11.5677 9.08799 11.2702C8.91461 10.9727 9.06943 10.8119 9.21822 10.6637C9.35195 10.5306 9.51546 10.3166 9.66399 10.1431C9.81257 9.96961 9.86209 9.84558 9.96114 9.6474C10.0602 9.44899 10.0107 9.27553 9.93634 9.12682C9.86209 8.97808 9.26779 7.51537 9.02016 6.92034C8.77895 6.34096 8.53397 6.41944 8.35157 6.41024C8.17844 6.40165 7.98013 6.39981 7.78207 6.39981C7.58397 6.39981 7.26201 6.47418 6.98958 6.77159C6.71727 7.06908 5.94959 7.78806 5.94959 9.25059C5.94959 10.7133 7.01434 12.1263 7.16296 12.3246C7.31158 12.523 9.25829 15.5244 12.2393 16.8116C12.9482 17.1178 13.5017 17.3006 13.9333 17.4375C14.6451 17.6637 15.2929 17.6318 15.805 17.5552C16.3759 17.47 17.5631 16.8364 17.8107 16.1424C18.0583 15.4481 18.0583 14.8532 17.984 14.7293C17.9097 14.6053 17.7116 14.5309 17.4145 14.3822ZM11.9925 21.7853H11.9886C10.2148 21.7846 8.47517 21.3081 6.9575 20.4075L6.59654 20.1932L2.85541 21.1746L3.85395 17.527L3.61899 17.153C2.62951 15.5792 2.10688 13.7603 2.10765 11.8925C2.10983 6.44257 6.54415 2.0086 11.9965 2.0086C14.6367 2.00954 17.1185 3.03905 18.9849 4.9075C20.8511 6.77582 21.8782 9.25932 21.8772 11.9005C21.875 17.3509 17.4408 21.7853 11.9925 21.7853ZM20.4052 3.48773C18.1599 1.2398 15.1739 0.00128304 11.9925 0C5.43736 0 0.102301 5.33471 0.0996495 11.8918C0.0987941 13.9879 0.646396 16.0337 1.68711 17.8373L0 24L6.30443 22.3462C8.04154 23.2937 9.99728 23.7931 11.9877 23.7937H11.9926C18.547 23.7937 23.8825 18.4585 23.8852 11.9013C23.8864 8.72361 22.6505 5.73566 20.4052 3.48777"
                                    fill="#000000"></path>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="image360_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> صورة 360 درجة </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body" v-if="data.image360 != ''">
                    <Vehicle360View :panorama="data.image360"></Vehicle360View>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">
                        اغلاق
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped>
.link-disabled {
    color: #999 !important;
    /* Your custom color */
    cursor: not-allowed;
    text-decoration: none;
    opacity: 0.7;
}
</style>