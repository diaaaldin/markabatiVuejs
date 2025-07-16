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
            }
        },
        getFavoriteVehiclesIdData: {
            handler() {
                this.chickIsFavoritFunc();
            }
        }
    },
    mounted() {
        this.chickIsFavoritFunc();
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
            // this.isFavorite = this.getFavoriteVehiclesIdData.includes(this.data.id);
        },
        async toggleFavoriteFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: '',
            });

            try {
                const response = await this.ToggleVehicleFavorite(this.data.id);
                this.$moshaToast(response.message, {
                    type: 'danger',
                    timeout: 3000,
                    showIcon: true,
                });

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
                        <span>
                            <svg viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.75 7.99813C21.75 8.40812 21.41 8.74813 21 8.74813H3C2.59 8.74813 2.25 8.40812 2.25 7.99813C2.25 7.58813 2.59 7.24813 3 7.24813H4.02L4.4 5.43813C4.76 3.68813 5.51 2.07812 8.49 2.07812H15.51C18.49 2.07812 19.24 3.68813 19.6 5.43813L19.98 7.24813H21C21.41 7.24813 21.75 7.58813 21.75 7.99813Z" fill="#292D32"></path> <path d="M22.1816 13.66C22.0316 12.01 21.5915 10.25 18.3815 10.25H5.62155C2.41155 10.25 1.98155 12.01 1.82155 13.66L1.26155 19.75C1.19155 20.51 1.44155 21.27 1.96155 21.84C2.49155 22.42 3.24155 22.75 4.04155 22.75H5.92155C7.54155 22.75 7.85155 21.82 8.05155 21.21L8.25155 20.61C8.48155 19.92 8.54155 19.75 9.44155 19.75H14.5616C15.4616 19.75 15.4916 19.85 15.7516 20.61L15.9516 21.21C16.1516 21.82 16.4616 22.75 18.0816 22.75H19.9615C20.7516 22.75 21.5116 22.42 22.0416 21.84C22.5616 21.27 22.8116 20.51 22.7416 19.75L22.1816 13.66ZM9.00155 15.75H6.00155C5.59155 15.75 5.25155 15.41 5.25155 15C5.25155 14.59 5.59155 14.25 6.00155 14.25H9.00155C9.41155 14.25 9.75155 14.59 9.75155 15C9.75155 15.41 9.41155 15.75 9.00155 15.75ZM18.0016 15.75H15.0016C14.5916 15.75 14.2516 15.41 14.2516 15C14.2516 14.59 14.5916 14.25 15.0016 14.25H18.0016C18.4116 14.25 18.7516 14.59 18.7516 15C18.7516 15.41 18.4116 15.75 18.0016 15.75Z" ></path> </g></svg>                        </span>
                        <h5>{{ $t('vehicle_card_brand') }}</h5>
                        <p>{{ data.brandName }}</p>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="details-squre">
                        <span>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.8114 5.49V6.23L14.2714 4.18C12.9314 3.41 11.0614 3.41 9.73141 4.18L6.19141 6.24V5.49C6.19141 3.24 7.42141 2 9.67141 2H14.3314C16.5814 2 17.8114 3.24 17.8114 5.49Z" fill="#292D32"></path> <path d="M17.84 7.96828L17.7 7.89828L16.34 7.11828L13.52 5.48828C12.66 4.98828 11.34 4.98828 10.48 5.48828L7.66 7.10828L6.3 7.90828L6.12 7.99828C4.37 9.17828 4.25 9.39828 4.25 11.2883V15.8083C4.25 17.6983 4.37 17.9183 6.16 19.1283L10.48 21.6183C10.91 21.8783 11.45 21.9883 12 21.9883C12.54 21.9883 13.09 21.8683 13.52 21.6183L17.88 19.0983C19.64 17.9183 19.75 17.7083 19.75 15.8083V11.2883C19.75 9.39828 19.63 9.17828 17.84 7.96828ZM14.79 13.4983L14.18 14.2483C14.08 14.3583 14.01 14.5683 14.02 14.7183L14.08 15.6783C14.12 16.2683 13.7 16.5683 13.15 16.3583L12.26 15.9983C12.12 15.9483 11.89 15.9483 11.75 15.9983L10.86 16.3483C10.31 16.5683 9.89 16.2583 9.93 15.6683L9.99 14.7083C10 14.5583 9.93 14.3483 9.83 14.2383L9.21 13.4983C8.83 13.0483 9 12.5483 9.57 12.3983L10.5 12.1583C10.65 12.1183 10.82 11.9783 10.9 11.8583L11.42 11.0583C11.74 10.5583 12.25 10.5583 12.58 11.0583L13.1 11.8583C13.18 11.9883 13.36 12.1183 13.5 12.1583L14.43 12.3983C15 12.5483 15.17 13.0483 14.79 13.4983Z" ></path> </g></svg>
                        </span>
                        <h5> {{ $t('vehicle_card_model') }}</h5>
                        <p>{{ data.modelName }}</p>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="details-squre">
                        <span>
                            <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6,22H18a3,3,0,0,0,3-3V7a2,2,0,0,0-2-2H17V3a1,1,0,0,0-2,0V5H9V3A1,1,0,0,0,7,3V5H5A2,2,0,0,0,3,7V19A3,3,0,0,0,6,22ZM5,12.5a.5.5,0,0,1,.5-.5h13a.5.5,0,0,1,.5.5V19a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1Z"></path></g></svg>
                        </span>
                        <h5> {{ $t('vehicle_card_year') }}</h5>
                        <p> {{ data.year }}</p>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="details-squre">
                        <span>
<svg fill="#000000" viewBox="-2 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m13.842 11.52-4.389 4.388a1.112 1.112 0 0 1-1.567 0l-6.28-6.28a3.027 3.027 0 0 1-.771-1.892l.043-3.681A1.141 1.141 0 0 1 2 2.935L5.67 2.9a3.04 3.04 0 0 1 1.892.773l6.28 6.28a1.112 1.112 0 0 1 0 1.567zM3.826 5.133a.792.792 0 1 0-.792.792.792.792 0 0 0 .792-.792zm6.594 7.348a.554.554 0 0 0 0-.784l-.401-.401a2.53 2.53 0 0 0 .35-.83 1.565 1.565 0 0 0-.397-1.503 1.59 1.59 0 0 0-1.017-.46 2.14 2.14 0 0 0-.75.085h-.002a2.444 2.444 0 0 0-.59.277H7.61a2.677 2.677 0 0 0-.438.357 2.043 2.043 0 0 1-.259.22 1.29 1.29 0 0 1-.329.17h-.002a.835.835 0 0 1-.338.038h-.002a.53.53 0 0 1-.314-.136.539.539 0 0 1-.106-.534 1.54 1.54 0 0 1 .41-.71 1.632 1.632 0 0 1 .23-.165l.03-.019a1.783 1.783 0 0 1 .322-.155.942.942 0 0 1 .325-.06.554.554 0 0 0 0-1.108h-.001a2.058 2.058 0 0 0-.717.132 2.846 2.846 0 0 0-.529.26l-.01.006-.398-.4a.554.554 0 1 0-.784.785l.388.387a2.513 2.513 0 0 0-.347.803 1.644 1.644 0 0 0 .404 1.561 1.622 1.622 0 0 0 .983.456 1.922 1.922 0 0 0 .805-.089 2.372 2.372 0 0 0 .624-.319 3.142 3.142 0 0 0 .398-.339 1.569 1.569 0 0 1 .256-.208 1.381 1.381 0 0 1 .32-.151 1.023 1.023 0 0 1 .348-.038.485.485 0 0 1 .308.139c.05.049.165.165.097.488a1.558 1.558 0 0 1-.413.729 2.476 2.476 0 0 1-.28.219 1.727 1.727 0 0 1-.306.157.687.687 0 0 1-.32.042.554.554 0 1 0-.08 1.106c.052.004.103.005.152.005a1.723 1.723 0 0 0 .685-.134 2.678 2.678 0 0 0 .507-.27l.01-.007.397.398a.555.555 0 0 0 .783 0z"></path></g></svg>
</span>                        <h5>{{ $t('vehicle_card_price') }}</h5>
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

.details-squre span svg{
   width: 20px;
    fill: #6acb6c;
    height: 20px;
    margin: 7px 0;
}
.details-squre span svg path{
    fill: #6acb6c;
}
</style>