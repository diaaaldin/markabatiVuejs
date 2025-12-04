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
            isFavorite: false, // Track if the heart is filled or not

            emailError: '',

            data: {
                id: 0,
                ownerName: "",
                ownerId: 0,
                ownerImage: "",
                ownerMobile: "",
                ownerSlug: "",
                brandId: 0,
                brandName: "",
                modelId: 0,
                modelName: "",
                year: 0,
                price: 0,
                currency: 0,
                meals: 0,
                color: "",
                bodyType: "",
                specification: "",
                paintedType: "",
                paintedStatus: "",
                gearType: "",
                oilType: "",
                description: "",
                slug: "",
                image: "",
                image360: "",
                vehicleImages: [],
                bestThreeCategories: [],
                cardOfVehicle: [],
                vehicleCategoryExtension: [],
            },

        }
    },
    watch: {

    },
    watch: {
        '$route.fullPath': {
            handler() {
                this.initFunc(); // يعيد جلب البيانات عند تغيير الرابط
            },
            immediate: false,
        },

        data: {
            immediate: true,
            handler() {
                this.chickIsFavoritFunc();
                if (this.data.id) { // Only run when data is loaded
                    useHead({
                        // title: `${this.data.brandName} ${this.data.modelName} ${this.data.year} | مركبتي`,
                        title: ` مركبتي | ${this.data.brandName} ${this.data.modelName} ${this.data.year} `,
                        meta: [
                            {
                                name: 'description',
                                content: `اشتري ${this.data.brandName} ${this.data.modelName} موديل ${this.data.year} في فلسطين - ${this.data.price} ${this.data.currency}. ${this.data.description || 'سيارة بحالة ممتازة'}`,
                            },
                            {
                                name: 'keywords',
                                content: `سيارات للبيع, ${this.data.brandName}, ${this.data.modelName}, سيارات فلسطين, مركبات مستعملة , مركبتي فلسطين`,
                            },
                            {
                                property: 'og:title',
                                content: `${this.data.brandName} ${this.data.modelName} للبيع | مركبتي`
                            },
                            {
                                property: 'og:description',
                                content: `سيارة ${this.data.brandName} ${this.data.modelName} موديل ${this.data.year} للبيع في فلسطين - ${this.data.price} ${this.data.currency}`
                            },
                            {
                                property: 'og:image',
                                content: this.data.image || '/default-car.jpg'
                            },
                            {
                                property: 'og:url',
                                content: window.location.href
                            }
                        ],
                        link: [
                            {
                                rel: 'canonical',
                                href: window.location.href
                            }
                        ],
                        htmlAttrs: {
                            lang: 'ar',
                            dir: 'rtl'
                        }
                    });
                }
            },
            immediate: true, // Run immediately when component mounts
            deep: true // Watch nested properties
        },

        getFavoriteVehiclesIdData: {
            handler() {
                this.chickIsFavoritFunc();
            }
        },
    },

    mounted() {
        this.initFunc();
        this.chickIsFavoritFunc();
        this.recordVisit();

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
        // this.initFunc();
    },

    computed: {
        ...mapGetters("Vehicles", ["getVehicleData", "getFavoriteVehiclesIdData"]),
        ...mapGetters("Code", ["getStatesData", "getCitiesData"]),


    },
    methods: {
        ...mapActions("Vehicles", ["GetVehicle", "ToggleVehicleFavorite", "GetVehiclesFavoriteId"]),
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
                console.log("this.getVehicleData : ", this.getVehicleData);
                this.data = this.getVehicleData;
                this.GetVehiclesFavoriteId();
                this.chickIsFavoritFunc();

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
            return text.length > 150 ? text.slice(0, 150) + '...' : text;
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

        whatsAppLinkFunc() {
            // const encodedMsg = encodeURIComponent(this.message);
            // return `https://wa.me/${this.phone}?text=${encodedMsg}`;

            let rawNumber = this.data.ownerMobile;

            // Clean and normalize the number
            let cleanNumber = rawNumber
                .replace(/\D/g, '')         // remove all non-digit characters
                .replace(/^00/, '')         // remove leading 00 if exists
                .replace(/^0+/, '')         // remove local leading 0 if needed
                ;

            // Add country code manually if needed
            // if (!cleanNumber.startsWith('970')) {
            //     cleanNumber = '970' + cleanNumber;
            // } 
            // else if (!cleanNumber.startsWith('970')) {
            //     cleanNumber = '970' + cleanNumber;
            // }

            const link = `https://wa.me/${cleanNumber}`;
            console.log('Final WhatsApp link:', link);
            window.open(link, '_blank');
        },

        chickIsFavoritFunc() {
            this.isFavorite = this.getFavoriteVehiclesIdData.includes(this.data.id);
        },

        async toggleFavoriteFunc() {
            if (this.isTokenValid()) {
                const loading = ElLoading.service({
                    lock: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    text: '',
                });
                try {
                    const response = await this.ToggleVehicleFavorite(this.data.id);
                    if (response.isFavorite === true) {
                        this.$moshaToast(response.message, {
                            hideProgressBar: 'false',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'success',
                            timeout: 3000,
                        });
                    } else {
                        this.$moshaToast(response.message, {
                            hideProgressBar: 'false',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'danger',
                            timeout: 3000,
                        });
                    }

                    await this.GetVehiclesFavoriteId(); // wait for fresh data
                    this.chickIsFavoritFunc(); // re-evaluate

                } catch (error) {
                    this.$moshaToast(error.response?.data?.message || 'حدث خطأ', {
                        type: 'warning',
                        timeout: 3000,
                        showIcon: true,
                    });
                } finally {
                    loading.close();
                }
            }
        },


        isTokenValid() {
            const token = localStorage.getItem('token');
            if (!token || typeof token !== 'string' || !token.includes('.')) {
                console.warn("Token is missing or invalid structure");
                this.$moshaToast("لا يوجد معلومات دخول للمستخدم قم بتسجيل الدخول أولاً", {
                    hideProgressBar: 'false',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'danger',
                    timeout: 3000,
                });
                return false;
            }
            try {
                const parts = token.split('.');
                if (parts.length !== 3) {
                    console.warn("Token does not have 3 parts");
                    return false;
                }

                const base64Payload = parts[1]
                    .replace(/-/g, '+')  // base64url to base64
                    .replace(/_/g, '/');

                const decodedPayload = JSON.parse(atob(base64Payload));
                const currentTime = Math.floor(Date.now() / 1000);


                if (decodedPayload.exp > currentTime) {
                    return true;
                } else {
                    this.$moshaToast("قم بتسجيل الدخول مجدداً", {
                        hideProgressBar: 'false',
                        showIcon: 'true',
                        swipeClose: 'true',
                        type: 'danger',
                        timeout: 3000,
                    });
                    return false;
                }
                // let res = decodedPayload.exp > currentTime;
                // console.log("res : ", res);
                // return res;

            } catch (error) {
                console.error("Token decoding failed:", error);
                return false;
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
                            <a v-on:click="toggleFavoriteFunc()" href="javascript:void(0)" class="justify-content-end">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                                            :stroke="isFavorite ? '#FFD700' : '#a09c9c'"
                                            :fill="isFavorite ? '#FFD700' : 'none'" stroke-width="1.5" />
                                    </g>
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
                                            <a v-if="data.description.length > 150" href="#vehicle-description-section"> ><span class="more">مشاهدة
                                                    المزيد</span></a>
                                        </p>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="seller">
                            <div class="img">
                                <!-- <img loading="lazy" src="/img/seller.png" class="" alt="...">
                                <img loading="lazy" :src="data.ownerImage" class="" alt="..."> -->
                                <img loading="lazy" v-on:click="toSellerGallaryFunc()"
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
                <div class="col-lg-2 col-md-3 col-sm-6 text-center">
                    <div class="details-squre">
                        <span>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M21.75 7.99813C21.75 8.40812 21.41 8.74813 21 8.74813H3C2.59 8.74813 2.25 8.40812 2.25 7.99813C2.25 7.58813 2.59 7.24813 3 7.24813H4.02L4.4 5.43813C4.76 3.68813 5.51 2.07812 8.49 2.07812H15.51C18.49 2.07812 19.24 3.68813 19.6 5.43813L19.98 7.24813H21C21.41 7.24813 21.75 7.58813 21.75 7.99813Z"
                                        fill="#292D32"></path>
                                    <path
                                        d="M22.1816 13.66C22.0316 12.01 21.5915 10.25 18.3815 10.25H5.62155C2.41155 10.25 1.98155 12.01 1.82155 13.66L1.26155 19.75C1.19155 20.51 1.44155 21.27 1.96155 21.84C2.49155 22.42 3.24155 22.75 4.04155 22.75H5.92155C7.54155 22.75 7.85155 21.82 8.05155 21.21L8.25155 20.61C8.48155 19.92 8.54155 19.75 9.44155 19.75H14.5616C15.4616 19.75 15.4916 19.85 15.7516 20.61L15.9516 21.21C16.1516 21.82 16.4616 22.75 18.0816 22.75H19.9615C20.7516 22.75 21.5116 22.42 22.0416 21.84C22.5616 21.27 22.8116 20.51 22.7416 19.75L22.1816 13.66ZM9.00155 15.75H6.00155C5.59155 15.75 5.25155 15.41 5.25155 15C5.25155 14.59 5.59155 14.25 6.00155 14.25H9.00155C9.41155 14.25 9.75155 14.59 9.75155 15C9.75155 15.41 9.41155 15.75 9.00155 15.75ZM18.0016 15.75H15.0016C14.5916 15.75 14.2516 15.41 14.2516 15C14.2516 14.59 14.5916 14.25 15.0016 14.25H18.0016C18.4116 14.25 18.7516 14.59 18.7516 15C18.7516 15.41 18.4116 15.75 18.0016 15.75Z">
                                    </path>
                                </g>
                            </svg> </span>
                        <h5>{{ $t('vehicle_card_brand') }}</h5>
                        <p>{{ data.brandName }}</p>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-6 text-center">
                    <div class="details-squre">
                        <span>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M17.8114 5.49V6.23L14.2714 4.18C12.9314 3.41 11.0614 3.41 9.73141 4.18L6.19141 6.24V5.49C6.19141 3.24 7.42141 2 9.67141 2H14.3314C16.5814 2 17.8114 3.24 17.8114 5.49Z"
                                        fill="#292D32"></path>
                                    <path
                                        d="M17.84 7.96828L17.7 7.89828L16.34 7.11828L13.52 5.48828C12.66 4.98828 11.34 4.98828 10.48 5.48828L7.66 7.10828L6.3 7.90828L6.12 7.99828C4.37 9.17828 4.25 9.39828 4.25 11.2883V15.8083C4.25 17.6983 4.37 17.9183 6.16 19.1283L10.48 21.6183C10.91 21.8783 11.45 21.9883 12 21.9883C12.54 21.9883 13.09 21.8683 13.52 21.6183L17.88 19.0983C19.64 17.9183 19.75 17.7083 19.75 15.8083V11.2883C19.75 9.39828 19.63 9.17828 17.84 7.96828ZM14.79 13.4983L14.18 14.2483C14.08 14.3583 14.01 14.5683 14.02 14.7183L14.08 15.6783C14.12 16.2683 13.7 16.5683 13.15 16.3583L12.26 15.9983C12.12 15.9483 11.89 15.9483 11.75 15.9983L10.86 16.3483C10.31 16.5683 9.89 16.2583 9.93 15.6683L9.99 14.7083C10 14.5583 9.93 14.3483 9.83 14.2383L9.21 13.4983C8.83 13.0483 9 12.5483 9.57 12.3983L10.5 12.1583C10.65 12.1183 10.82 11.9783 10.9 11.8583L11.42 11.0583C11.74 10.5583 12.25 10.5583 12.58 11.0583L13.1 11.8583C13.18 11.9883 13.36 12.1183 13.5 12.1583L14.43 12.3983C15 12.5483 15.17 13.0483 14.79 13.4983Z">
                                    </path>
                                </g>
                            </svg>
                        </span>
                        <h5> {{ $t('vehicle_card_model') }}</h5>
                        <p>{{ data.modelName }}</p>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-6 text-center">
                    <div class="details-squre">
                        <span>
                            <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M6,22H18a3,3,0,0,0,3-3V7a2,2,0,0,0-2-2H17V3a1,1,0,0,0-2,0V5H9V3A1,1,0,0,0,7,3V5H5A2,2,0,0,0,3,7V19A3,3,0,0,0,6,22ZM5,12.5a.5.5,0,0,1,.5-.5h13a.5.5,0,0,1,.5.5V19a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1Z">
                                    </path>
                                </g>
                            </svg>
                        </span>
                        <h5> {{ $t('vehicle_card_year') }}</h5>
                        <p> {{ data.year }}</p>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-6 text-center">
                    <div class="details-squre">
                        <span>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M12 1C11.4477 1 11 1.44772 11 2V3H10C8.3642 3 7.0588 3.60369 6.1691 4.57428C5.29413 5.52878 4.875 6.77845 4.875 8C4.875 9.22155 5.29413 10.4712 6.1691 11.4257C6.33335 11.6049 6.51177 11.7716 6.70382 11.9243C7.55205 12.5986 8.6662 13 10 13H11V19H10C9.17499 19 8.62271 18.7966 8.2422 18.5429C7.85544 18.2851 7.58511 17.9342 7.39443 17.5528C7.20178 17.1675 7.10048 16.7701 7.04889 16.4606C7.02329 16.307 7.00411 16.1512 6.99999 15.9953C6.99736 15.4454 6.55059 15 6 15C5.44771 15 5 15.4477 5 16C5.00003 16.0672 5.0024 16.1317 5.01035 16.2431C5.02006 16.3791 5.039 16.5668 5.07611 16.7894C5.14952 17.2299 5.29821 17.8325 5.60557 18.4472C5.91489 19.0658 6.39456 19.7149 7.1328 20.2071C7.8773 20.7034 8.82502 21 10 21H11V22C11 22.5523 11.4477 23 12 23C12.5523 23 13 22.5523 13 22V21H14C15.6358 21 16.9412 20.3963 17.8309 19.4257C18.7059 18.4712 19.125 17.2216 19.125 16C19.125 14.7784 18.7059 13.5288 17.8309 12.5743C16.9412 11.6037 15.6358 11 14 11H13V5H14C14.825 5 15.3773 5.20338 15.7578 5.45705C16.1446 5.71489 16.4149 6.06584 16.6056 6.44721C16.7982 6.8325 16.8995 7.22989 16.9511 7.5394C16.9767 7.69303 16.9959 7.84879 17 8.00465C17.0027 8.55467 17.4494 9 18 9C18.5458 9 19 8.54436 19 7.99898C18.9999 7.93212 18.9976 7.8677 18.9896 7.75688C18.9799 7.62092 18.961 7.43322 18.9239 7.2106C18.8505 6.77011 18.7018 6.1675 18.3944 5.55279C18.0851 4.93416 17.6054 4.28511 16.8672 3.79295C16.1227 3.29662 15.175 3 14 3H13V2C13 1.44772 12.5523 1 12 1ZM11 5H10C8.8858 5 8.1287 5.39631 7.6434 5.92572C7.14337 6.47122 6.875 7.22155 6.875 8C6.875 8.77845 7.14337 9.52878 7.6434 10.0743C8.1287 10.6037 8.8858 11 10 11H11V5ZM13 13V19H14C15.1142 19 15.8713 18.6037 16.3566 18.0743C16.8566 17.5288 17.125 16.7784 17.125 16C17.125 15.2216 16.8566 14.4712 16.3566 13.9257C15.8713 13.3963 15.1142 13 14 13H13Z"
                                        fill="#0F0F0F"></path>
                                </g>
                            </svg>
                        </span>
                        <h5>{{ $t('vehicle_card_price') }}</h5>
                        <p> {{ formatCurrency(data.price, data.currency) }}</p>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-6 text-center">
                    <div class="details-squre">
                        <span>
                            <svg fill="#000000" height="200px" width="200px" version="1.1" id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 612 612" xml:space="preserve">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>
                                            <path
                                                d="M175.205,239.62c0.127-1.965-0.533-3.902-1.833-5.381l-58.84-66.941c-1.3-1.479-3.135-2.381-5.102-2.508 c-1.975-0.126-3.902,0.533-5.381,1.833c-27.037,23.766-49.479,51.794-66.706,83.305c-0.944,1.729-1.165,3.762-0.611,5.651 c0.554,1.89,1.836,3.483,3.565,4.427l78.205,42.748c1.131,0.619,2.352,0.912,3.557,0.912c2.627,0,5.174-1.398,6.523-3.866 c11.386-20.828,26.229-39.359,44.114-55.08C174.178,243.422,175.08,241.587,175.205,239.62z">
                                            </path>
                                            <path
                                                d="M201.462,214.829c1.334,2.515,3.907,3.948,6.568,3.948c1.174,0,2.365-0.279,3.473-0.867 c20.962-11.117,43.512-18.371,67.025-21.561c4.064-0.551,6.913-4.293,6.362-8.358l-11.979-88.316 c-0.551-4.064-4.304-6.909-8.358-6.362c-35.708,4.843-69.949,15.857-101.772,32.736c-3.623,1.922-5.002,6.416-3.082,10.041 L201.462,214.829z">
                                            </path>
                                            <path
                                                d="M105.785,334.345l-86.017-23.338c-1.901-0.514-3.929-0.255-5.638,0.725s-2.958,2.598-3.475,4.499 C3.586,342.295,0,369.309,0,396.523c0,4.657,0.111,9.329,0.342,14.284c0.185,3.981,3.468,7.083,7.414,7.083 c0.116,0,0.234-0.002,0.35-0.008l89.031-4.113c1.967-0.09,3.82-0.96,5.145-2.415c1.327-1.455,2.022-3.38,1.93-5.347 c-0.155-3.341-0.23-6.444-0.23-9.484c0-18.02,2.365-35.873,7.029-53.066C112.082,339.499,109.743,335.42,105.785,334.345z">
                                            </path>
                                            <path
                                                d="M438.731,120.745c-32.411-15.625-67.04-25.308-102.925-28.786c-1.972-0.198-3.918,0.408-5.439,1.659 c-1.521,1.252-2.481,3.056-2.671,5.018l-8.593,88.712c-0.396,4.082,2.594,7.713,6.677,8.108 c23.652,2.291,46.463,8.669,67.8,18.954c1.015,0.49,2.118,0.738,3.225,0.738c0.826,0,1.654-0.139,2.45-0.416 c1.859-0.649,3.385-2.012,4.24-3.786l38.7-80.287C443.978,126.965,442.427,122.525,438.731,120.745z">
                                            </path>
                                            <path
                                                d="M569.642,245.337c0.48-1.911,0.184-3.932-0.828-5.624c-18.432-30.835-41.933-57.983-69.848-80.686 c-1.529-1.242-3.48-1.824-5.447-1.627c-1.959,0.203-3.758,1.174-5,2.702l-56.237,69.144c-1.242,1.529-1.828,3.488-1.625,5.447 c0.201,1.959,1.173,3.758,2.702,5.002c18.47,15.019,34.015,32.975,46.205,53.369c1.392,2.326,3.855,3.618,6.383,3.618 c1.297,0,2.61-0.34,3.803-1.054l76.501-45.728C567.94,248.889,569.16,247.248,569.642,245.337z">
                                            </path>
                                            <path
                                                d="M598.044,304.939c-1.228-3.915-5.397-6.096-9.308-4.867l-85.048,26.648c-3.915,1.226-6.093,5.393-4.867,9.306 c6.104,19.486,9.199,39.839,9.199,60.494c0,3.041-0.076,6.144-0.23,9.484c-0.092,1.967,0.602,3.892,1.93,5.347 c1.327,1.456,3.178,2.325,5.145,2.415l89.031,4.113c0.118,0.005,0.234,0.008,0.35,0.008c3.944,0,7.228-3.103,7.414-7.083 c0.229-4.955,0.342-9.627,0.342-14.284C612,365.306,607.306,334.494,598.044,304.939z">
                                            </path>
                                            <path
                                                d="M305.737,380.755c-1.281,0-2.555,0.042-3.824,0.11l-120.65-71.185c-2.953-1.745-6.702-1.308-9.176,1.065 c-2.476,2.371-3.07,6.099-1.456,9.121l65.815,123.355c-0.242,2.376-0.371,4.775-0.371,7.195c0,18.608,7.246,36.101,20.403,49.258 c13.158,13.158,30.652,20.404,49.26,20.404c18.608,0,36.101-7.248,49.258-20.404c13.158-13.157,20.403-30.65,20.403-49.258 c0-18.608-7.246-36.101-20.403-49.258C341.839,388.001,324.344,380.755,305.737,380.755z">
                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </span>
                        <h5>{{ $t('vehicle_card_meals') }}</h5>
                        <p> {{ data.meals }}</p>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-6 text-center">
                    <div class="details-squre">
                        <span>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M14 12.5001C14 13.3285 13.3284 14.0001 12.5 14.0001C11.6716 14.0001 11 13.3285 11 12.5001C11 11.6717 11.6716 11.0001 12.5 11.0001C13.3284 11.0001 14 11.6717 14 12.5001Z"
                                        fill="#0F0F0F"></path>
                                    <path
                                        d="M16.5 10.0001C17.3284 10.0001 18 9.32854 18 8.50011C18 7.67169 17.3284 7.00011 16.5 7.00011C15.6716 7.00011 15 7.67169 15 8.50011C15 9.32854 15.6716 10.0001 16.5 10.0001Z"
                                        fill="#0F0F0F"></path>
                                    <path
                                        d="M13 6.50011C13 7.32854 12.3284 8.00011 11.5 8.00011C10.6716 8.00011 10 7.32854 10 6.50011C10 5.67169 10.6716 5.00011 11.5 5.00011C12.3284 5.00011 13 5.67169 13 6.50011Z"
                                        fill="#0F0F0F"></path>
                                    <path
                                        d="M7.50001 12.0001C8.32844 12.0001 9.00001 11.3285 9.00001 10.5001C9.00001 9.67169 8.32844 9.00011 7.50001 9.00011C6.67158 9.00011 6.00001 9.67169 6.00001 10.5001C6.00001 11.3285 6.67158 12.0001 7.50001 12.0001Z"
                                        fill="#0F0F0F"></path>
                                    <path
                                        d="M14 17.5001C14 18.3285 13.3284 19.0001 12.5 19.0001C11.6716 19.0001 11 18.3285 11 17.5001C11 16.6717 11.6716 16.0001 12.5 16.0001C13.3284 16.0001 14 16.6717 14 17.5001Z"
                                        fill="#0F0F0F"></path>
                                    <path
                                        d="M7.50001 17.0001C8.32844 17.0001 9.00001 16.3285 9.00001 15.5001C9.00001 14.6717 8.32844 14.0001 7.50001 14.0001C6.67158 14.0001 6.00001 14.6717 6.00001 15.5001C6.00001 16.3285 6.67158 17.0001 7.50001 17.0001Z"
                                        fill="#0F0F0F"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M11.5017 1.02215C15.4049 0.791746 19.5636 2.32444 21.8087 5.41131C22.5084 6.37324 22.8228 7.63628 22.6489 8.83154C22.471 10.054 21.7734 11.2315 20.4472 11.8945C19.6389 12.2987 18.7731 12.9466 18.2401 13.668C17.7158 14.3778 17.6139 14.9917 17.8944 15.5529C18.4231 16.6102 18.8894 17.9257 18.8106 19.1875C18.7699 19.8375 18.5828 20.4946 18.1664 21.0799C17.7488 21.6667 17.1448 22.1192 16.3714 22.4286C14.6095 23.1333 12.6279 23.1643 10.8081 22.8207C8.98579 22.4765 7.24486 21.7421 5.92656 20.8194C4.00568 19.4748 2.47455 17.6889 1.71371 15.4464C0.9504 13.1965 0.995912 10.5851 2.06024 7.65803C3.64355 3.30372 7.56248 1.25469 11.5017 1.02215ZM11.6196 3.01868C8.26589 3.21665 5.18483 4.9176 3.93984 8.34149C3.00414 10.9148 3.01388 13.0536 3.60768 14.8038C4.20395 16.5613 5.42282 18.0255 7.07347 19.1809C8.14405 19.9303 9.6169 20.5604 11.1792 20.8554C12.7442 21.151 14.3181 21.0959 15.6286 20.5716C16.308 20.2999 16.7678 19.8099 16.8145 19.0627C16.8606 18.3245 16.5769 17.3901 16.1056 16.4473C15.3639 14.9639 15.8542 13.5318 16.6315 12.4796C17.4002 11.4391 18.5455 10.6093 19.5528 10.1057C20.2266 9.76878 20.5747 9.19623 20.6697 8.54355C20.7686 7.86365 20.5831 7.12638 20.1913 6.58769C18.4364 4.17486 15.0093 2.81858 11.6196 3.01868Z"
                                        fill="#0F0F0F"></path>
                                </g>
                            </svg>
                        </span>
                        <h5> {{ $t('vehicle_card_color') }}</h5>
                        <p> {{ data.color }}</p>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-6 text-center">
                    <div class="details-squre">
                        <span>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M2 11C2 11.5523 2.44772 12 3 12H6V9C6 8.44771 5.55229 8 5 8H3C2.44772 8 2 8.44771 2 9V11Z"
                                        fill="#0F0F0F"></path>
                                    <path d="M10 12H14V9C14 8.44771 13.5523 8 13 8H11C10.4477 8 10 8.44771 10 9V12Z"
                                        fill="#0F0F0F"></path>
                                    <path d="M6 15C6 15.5523 6.44772 16 7 16H9C9.55229 16 10 15.5523 10 15V12H6V15Z"
                                        fill="#0F0F0F"></path>
                                    <path
                                        d="M18 12H21C21.5523 12 22 11.5523 22 11V9C22 8.44771 21.5523 8 21 8H19C18.4477 8 18 8.44771 18 9V12Z"
                                        fill="#0F0F0F"></path>
                                    <path
                                        d="M14 15C14 15.5523 14.4477 16 15 16H17C17.5523 16 18 15.5523 18 15V12H14V15Z"
                                        fill="#0F0F0F"></path>
                                    <path
                                        d="M2 19C2 18.4477 2.44772 18 3 18H21C21.5523 18 22 18.4477 22 19C22 19.5523 21.5523 20 21 20H3C2.44772 20 2 19.5523 2 19Z"
                                        fill="#0F0F0F"></path>
                                    <path
                                        d="M2 5C2 4.44772 2.44772 4 3 4H21C21.5523 4 22 4.44772 22 5C22 5.55228 21.5523 6 21 6H3C2.44772 6 2 5.55228 2 5Z"
                                        fill="#0F0F0F"></path>
                                </g>
                            </svg>
                        </span>
                        <h5>{{ $t('vehicle_card_body_type') }}</h5>
                        <p>{{ data.bodyType }} </p>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-6 text-center">
                    <div class="details-squre">
                        <span>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M7 12C6.44772 12 6 11.5523 6 11C6 10.4477 6.44772 10 7 10H17C17.5523 10 18 10.4477 18 11C18 11.5523 17.5523 12 17 12L7 12Z"
                                        fill="#0F0F0F"></path>
                                    <path
                                        d="M6 15C6 15.5523 6.44772 16 7 16H13C13.5523 16 14 15.5523 14 15C14 14.4477 13.5523 14 13 14H7C6.44772 14 6 14.4477 6 15Z"
                                        fill="#0F0F0F"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M7 1C6.44772 1 6 1.44772 6 2V3H4C2.89543 3 2 3.89543 2 5V19C2 21.2091 3.79086 23 6 23H18C20.2091 23 22 21.2091 22 19V5C22 3.89543 21.1046 3 20 3H18V2C18 1.44772 17.5523 1 17 1C16.4477 1 16 1.44772 16 2V3H13V2C13 1.44772 12.5523 1 12 1C11.4477 1 11 1.44772 11 2V3H8V2C8 1.44772 7.55228 1 7 1ZM16 5H13V6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6V5H8V6C8 6.55228 7.55228 7 7 7C6.44772 7 6 6.55228 6 6V5H5C4.44772 5 4 5.44772 4 6V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V6C20 5.44772 19.5523 5 19 5H18V6C18 6.55228 17.5523 7 17 7C16.4477 7 16 6.55228 16 6V5Z"
                                        fill="#0F0F0F"></path>
                                </g>
                            </svg>
                        </span>
                        <h5> {{ $t('vehicle_card_specefication') }}</h5>
                        <p> {{ data.specification }}</p>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-6 text-center">
                    <div class="details-squre">
                        <span>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M5 4C5 2.34315 6.34315 1 8 1H20C21.6569 1 23 2.34315 23 4V6C23 7.65685 21.6569 9 20 9H8C6.34315 9 5 7.65685 5 6H4C3.44772 6 3 6.44772 3 7V9C3 9.55228 3.44772 10 4 10H12C13.6569 10 15 11.3431 15 13V14C16.1046 14 17 14.8954 17 16L17 21C17 22.1046 16.1046 23 15 23H13C11.8954 23 11 22.1046 11 21V16C11 14.8954 11.8954 14 13 14V13C13 12.4477 12.5523 12 12 12H4C2.34315 12 1 10.6569 1 9V7C1 5.34315 2.34315 4 4 4H5ZM8 3C7.44772 3 7 3.44772 7 4V6C7 6.55228 7.44772 7 8 7H20C20.5523 7 21 6.55228 21 6V4C21 3.44772 20.5523 3 20 3H8ZM15 21L15 16H13V21H15Z"
                                        fill="#0F0F0F"></path>
                                </g>
                            </svg>
                        </span>
                        <h5>{{ $t('vehicle_card_painting_type') }}</h5>
                        <p>{{ data.paintedType }} </p>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-6 text-center">
                    <div class="details-squre">
                        <span>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M15.0066 3.25608C16.8483 2.85737 19.1331 2.8773 22.2423 3.65268C22.7781 3.78629 23.1038 4.32791 22.9699 4.86241C22.836 5.39691 22.2931 5.7219 21.7573 5.58829C18.8666 4.86742 16.9015 4.88747 15.4308 5.20587C13.9555 5.52524 12.895 6.15867 11.7715 6.84363L11.6874 6.89494C10.6044 7.55565 9.40515 8.28729 7.82073 8.55069C6.17734 8.82388 4.23602 8.58235 1.62883 7.54187C1.11607 7.33724 0.866674 6.75667 1.0718 6.24513C1.27692 5.73359 1.85889 5.48479 2.37165 5.68943C4.76435 6.6443 6.32295 6.77699 7.492 6.58265C8.67888 6.38535 9.58373 5.83916 10.7286 5.14119C11.855 4.45445 13.1694 3.6538 15.0066 3.25608Z"
                                        fill="#0F0F0F"></path>
                                    <path
                                        d="M22.2423 7.64302C19.1331 6.86765 16.8483 6.84772 15.0066 7.24642C13.1694 7.64415 11.855 8.44479 10.7286 9.13153C9.58373 9.8295 8.67888 10.3757 7.492 10.573C6.32295 10.7673 4.76435 10.6346 2.37165 9.67977C1.85889 9.47514 1.27692 9.72393 1.0718 10.2355C0.866674 10.747 1.11607 11.3276 1.62883 11.5322C4.23602 12.5727 6.17734 12.8142 7.82073 12.541C9.40515 12.2776 10.6044 11.546 11.6874 10.8853L11.7715 10.834C12.895 10.149 13.9555 9.51558 15.4308 9.19621C16.9015 8.87781 18.8666 8.85777 21.7573 9.57863C22.2931 9.71224 22.836 9.38726 22.9699 8.85275C23.1038 8.31825 22.7781 7.77663 22.2423 7.64302Z"
                                        fill="#0F0F0F"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M18.9998 10.0266C18.6526 10.0266 18.3633 10.2059 18.1614 10.4772C18.0905 10.573 17.9266 10.7972 17.7089 11.111C17.4193 11.5283 17.0317 12.1082 16.6424 12.7555C16.255 13.3996 15.8553 14.128 15.5495 14.8397C15.2567 15.5213 14.9989 16.2614 14.9999 17.0117C15.0006 17.2223 15.0258 17.4339 15.0604 17.6412C15.1182 17.9872 15.2356 18.4636 15.4804 18.9521C15.7272 19.4446 16.1131 19.9674 16.7107 20.3648C17.3146 20.7664 18.0748 21 18.9998 21C19.9248 21 20.685 20.7664 21.2888 20.3648C21.8864 19.9674 22.2724 19.4446 22.5192 18.9522C22.764 18.4636 22.8815 17.9872 22.9393 17.6413C22.974 17.4337 22.9995 17.2215 22.9998 17.0107C23.0001 16.2604 22.743 15.5214 22.4501 14.8397C22.1444 14.128 21.7447 13.3996 21.3573 12.7555C20.968 12.1082 20.5803 11.5283 20.2907 11.111C20.073 10.7972 19.909 10.573 19.8382 10.4772C19.6363 10.2059 19.3469 10.0266 18.9998 10.0266ZM20.6119 15.6257C20.3552 15.0281 20.0049 14.3848 19.6423 13.782C19.4218 13.4154 19.2007 13.0702 18.9998 12.7674C18.7989 13.0702 18.5778 13.4154 18.3573 13.782C17.9948 14.3848 17.6445 15.0281 17.3878 15.6257L17.3732 15.6595C17.1965 16.0704 16.9877 16.5562 17.0001 17.0101C17.0121 17.3691 17.1088 17.7397 17.2693 18.0599C17.3974 18.3157 17.574 18.5411 17.8201 18.7048C18.06 18.8643 18.4248 19.0048 18.9998 19.0048C19.5748 19.0048 19.9396 18.8643 20.1795 18.7048C20.4256 18.5411 20.6022 18.3156 20.7304 18.0599C20.8909 17.7397 20.9876 17.3691 20.9996 17.01C21.0121 16.5563 20.8032 16.0705 20.6265 15.6597L20.6119 15.6257Z"
                                        fill="#0F0F0F"></path>
                                    <path
                                        d="M14.1296 11.5308C14.8899 11.2847 15.4728 12.076 15.1153 12.7892C14.952 13.1151 14.7683 13.3924 14.4031 13.5214C13.426 13.8666 12.6166 14.3527 11.7715 14.8679L11.6874 14.9192C10.6044 15.5799 9.40516 16.3115 7.82074 16.5749C6.17735 16.8481 4.23604 16.6066 1.62884 15.5661C1.11608 15.3615 0.866688 14.7809 1.07181 14.2694C1.27694 13.7578 1.8589 13.509 2.37167 13.7137C4.76436 14.6685 6.32297 14.8012 7.49201 14.6069C8.67889 14.4096 9.58374 13.8634 10.7286 13.1654C11.8166 12.5021 12.9363 11.9171 14.1296 11.5308Z"
                                        fill="#0F0F0F"></path>
                                </g>
                            </svg>
                        </span>
                        <h5> {{ $t('vehicle_card_painting_status') }}</h5>
                        <p> {{ data.paintedStatus }}</p>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-6 text-center">
                    <div class="details-squre">
                        <span>
                            <svg fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M211.733 1260.088c16.32 131.947 68.587 258.027 151.254 364.8l-168.64 130.667C88.213 1618.488 21.013 1456.14 0 1286.22Zm1654.155-391.584c18.88 57.813 32.32 117.76 39.787 178.24 4.8 40 7.146 79.147 7.146 119.787 0 40.533-2.346 79.68-7.146 119.466-21.014 170.134-88.214 332.48-194.347 469.547l-168.64-130.667c82.667-106.773 134.933-232.853 151.253-364.8 3.734-30.72 5.547-61.76 5.547-93.546 0-31.894-1.813-62.934-5.547-93.867-5.866-46.613-16.106-93.013-30.72-137.813Zm-135.125-421.707 150.826 150.827-875.413 875.413-519.893-519.893 150.826-150.827 369.067 369.067 724.587-724.587ZM194.347 577.411l168.64 130.666c-82.667 106.774-134.934 232.854-151.254 364.8L0 1046.744c21.013-169.92 88.213-332.267 194.347-469.333ZM833.14 213.709l26.134 211.734c-132.054 16.213-258.134 68.586-364.8 151.253L363.7 408.056c137.067-106.133 299.307-173.44 469.44-194.347Zm239.456-.01c170.027 21.013 332.374 88.213 469.334 194.346l-130.774 168.64c-106.56-82.666-232.746-135.04-364.693-151.253Z"
                                        fill-rule="evenodd"></path>
                                </g>
                            </svg>
                        </span>
                        <h5>{{ $t('vehicle_card_gear_type') }}</h5>
                        <p> {{ data.gearType }}</p>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-6 text-center">
                    <div class="details-squre">
                        <span>
                            <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <title>oil_round [#735]</title>
                                    <desc>Created with Sketch.</desc>
                                    <defs> </defs>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -4959.000000)"
                                            fill="#000000">
                                            <g id="icons" transform="translate(56.000000, 160.000000)">
                                                <path
                                                    d="M134.99054,4809 L130.006307,4809 L130.006307,4808 C130.006307,4807.448 129.557836,4807 129.005256,4807 C128.452675,4807 128.004204,4807.448 128.004204,4808 L128.004204,4809 L126.982131,4809 C126.429551,4809 126.002102,4808.552 126.002102,4808 L126.002102,4802 C126.002102,4801.448 126.429551,4801 126.982131,4801 L134.99054,4801 C135.54312,4801 136.012613,4801.448 136.012613,4802 L136.012613,4808 C136.012613,4808.552 135.54312,4809 134.99054,4809 L134.99054,4809 Z M134.010511,4816 C134.010511,4816.552 133.541018,4817 132.988438,4817 L128.984233,4817 C128.431653,4817 128.004204,4816.552 128.004204,4816 L128.004204,4811 L128.014215,4811 L130.016317,4811 L134.010511,4811 L134.010511,4816 Z M142.998949,4805 L141.997898,4805 C140.891736,4805 139.995796,4806 139.995796,4807 L140.006807,4807 C140.006807,4810 139.015767,4813 136.012613,4813 L136.012613,4811 C137.013664,4811 138.014715,4810.105 138.014715,4809 L138.014715,4801 C138.014715,4799.895 137.097753,4799 135.991591,4799 L125.98108,4799 C124.874919,4799 124,4799.895 124,4801 L124,4809 C124,4810.105 125.001051,4811 126.002102,4811 L126.002102,4817 C126.002102,4818.105 126.877021,4819 127.983182,4819 L133.989489,4819 C135.09565,4819 136.012613,4818.105 136.012613,4817 L136.012613,4815 C140.016818,4815 141.900796,4811.93 141.997898,4807.969 C142.010911,4807.43 142.445368,4807 142.985935,4807 L142.998949,4807 C143.551529,4807 144,4806.552 144,4806 C144,4805.448 143.551529,4805 142.998949,4805 L142.998949,4805 Z"
                                                    id="oil_round-[#735]"> </path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </span>
                        <h5>{{ $t('vehicle_card_oil_type') }}</h5>
                        <p> {{ data.oilType }}</p>
                    </div>
                </div>
            </div>
            <div id="vehicle-description-section" class="row">
                <div class="col-12">
                    <div class="public-view">
                        <h1 class="line-green">{{ $t('vehicle_discreption') }} </h1>
                        <!-- <div class="col-12 mt-4"> -->
                        <div class="mt-4">
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
                            <img loading="lazy" v-on:click="toSellerGallaryFunc()" :src="ownerImageFunc(data.ownerImage)" class=""
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
                    <button v-on:click="whatsAppLinkFunc()" type="button" class="btn btn-primary">
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

.modal-footer .btn-primary {
    /* width: 50px;
    height: 50px;
     */
    border-radius: 30px;
    padding: 8px 30px;
    margin: 0 auto;
}

.modal-footer .btn-primary svg {
    margin-right: 10px;
}

.modal-footer .btn-primary svg path {
    fill: white;
}

.details-squre span svg {
    width: 20px;
    fill: #26d829;
    height: 20px;
    margin: 7px 0 0 0;
}

.details-squre span svg path {
    fill: #26d829;
}

@media (max-width: 768px) {
    .col-sm-6 {
        width: 50%;
    }

    .details-car .info {
        margin-top: 40px;
    }
}
</style>