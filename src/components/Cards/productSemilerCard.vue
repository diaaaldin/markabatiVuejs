<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import { CurrenceEnum } from '@/config/config.js';


export default {
    data() {
        return {
            isFilled: false // Track if the heart is filled or not
        }
    },
    props: {
        product: {
            type: Object,
            default() {
                return {
                    id: 1,
                    image: "http://localhost:4000/VehicleImages\\ac745ceeddb24d8a99228ce04239fb7dLogo.png",
                    meals: 234424,
                    year: 2012,
                    brandId: 1,
                    brandName: "مرسيدس بنز",
                    modelId: 5,
                    modelName: "سي كلاس",
                    price: 33000,
                    currency: 74,
                    ownerId: 0,
                    ownerName: "Super Admin Diaa",
                    statusId: 83,
                    status: "succeeded",
                    slug: "1_سي_كلاس_مرسيدس_بنز",
                    bestThreeCategories: ["مميزة 1", "مميزة 2", "مميزة 3"]
                };
            }
        }
    },
    mounted() {
        // this.chickIsFavoritFunc();
    },
    components: {

    },

    emits: {

    },

    created() {
        // Call the function from the store directly when the component is created
    },

    computed: {
        ...mapGetters("Code", ["getStatesData", "getCitiesData"]),
        ...mapGetters("Products", ["getFavoritProductsData"]),

    },
    methods: {
        ...mapActions("Code", ["GetStates", "GetCities"]),
        ...mapActions("Products", ["ToggleProductInBasket"]),

        ownerImageFunc(imgae) {
            const imageUrl = imgae
                ? imgae
                : "/img/seller/seller.png";

            return imageUrl;
        },
        chickIsFavoritFunc() {
            if (this.getFavoritProductsData && this.getFavoritProductsData.some(x => x.id === this.product.id)) {
                this.isFilled = true;
            } else {
                this.isFilled = false;
            }
        },

        toggleHeartFill() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });
            let token = localStorage.getItem("token");
            if (token) {
                this.ToggleProductInBasket(this.product.id).then(Response => {
                    if (Response.isInBasket) {
                        this.$moshaToast('Added to favourites', {
                            hideProgressBar: 'false',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'success',
                            timeout: 3000,
                        });
                        this.isFilled = true;
                    } else {
                        this.$moshaToast('Removed from favourites', {
                            hideProgressBar: 'false',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'danger',
                            timeout: 3000,
                        });
                        this.isFilled = false;
                    }

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
            } else {
                this.$moshaToast("login first", {
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

        toProductFunc() {
            this.$router.push({ name: "vehicle", params: { slug: this.product.slug } });
        },

        toSellerGallaryFunc() {
            this.$router.push({ name: "gallary", params: { slug: this.product.ownerSlug } });
        },

        stripHtml(html) {
            const div = document.createElement('div');
            div.innerHTML = html;
            const text = div.textContent || div.innerText || '';
            return text.length > 20 ? text.slice(0, 75) + '...' : text;
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

        whatsAppLinkFunc() {
            // const encodedMsg = encodeURIComponent(this.message);
            // return `https://wa.me/${this.phone}?text=${encodedMsg}`;

            let rawNumber = this.product.ownerMobile;

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

    }
};
</script>
<template>
    <div class="col-12 col-lg-3 col-md-6 mt-4" data-aos="fade-up" data-aos-delay="100" data-aos-duration="700">
        <a href="javascript:void(0)" style="color:black;">
            <div class="card custom_card">
                <div class="img">
                    <img v-on:click="toProductFunc()" :src="product.image" class="card-img-top index-img-card"
                        alt="...">
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-baseline mb-2">
                        <h6 class="card-title justify-content-start">{{ product.brandName }}</h6>
                        <a href="javascript:void(0)" class="justify-content-end">
                            <!-- <img src="/img/icons/star2.svg"> -->
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.7878 3.10215C11.283 2.09877 12.7138 2.09876 13.209 3.10215L15.567 7.87987L20.8395 8.64601C21.9468 8.80691 22.3889 10.1677 21.5877 10.9487L17.7724 14.6676L18.6731 19.9189C18.8622 21.0217 17.7047 21.8627 16.7143 21.342L11.9984 18.8627L7.28252 21.342C6.29213 21.8627 5.13459 21.0217 5.32374 19.9189L6.2244 14.6676L2.40916 10.9487C1.60791 10.1677 2.05005 8.80691 3.15735 8.64601L8.42988 7.87987L10.7878 3.10215ZM11.9984 4.03854L9.74008 8.61443C9.54344 9.01288 9.16332 9.28904 8.72361 9.35294L3.67382 10.0867L7.32788 13.6486C7.64606 13.9587 7.79125 14.4055 7.71614 14.8435L6.85353 19.8729L11.3702 17.4983C11.7635 17.2915 12.2333 17.2915 12.6266 17.4983L17.1433 19.8729L16.2807 14.8435C16.2056 14.4055 16.3508 13.9587 16.6689 13.6486L20.323 10.0867L15.2732 9.35294C14.8335 9.28904 14.4534 9.01288 14.2568 8.61443L11.9984 4.03854Z"
                                    fill="#999999" />
                            </svg>
                        </a>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class=" d-flex  flex-column">
                            <div class="d-flex align-items-center mb-2">
                                <a href="hotel_details.html" class="name-details">
                                    {{ product.modelName }}
                                </a>
                            </div>
                            <!-- <div class=" d-flex align-items-center rate mb-2">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z" fill="#FFCE1F"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z" fill="#FFCE1F"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z" fill="#FFCE1F"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z" fill="#FFCE1F"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z" fill="#FFCE1F"/>
                                                    </svg>
                                                          
                                                    <span class="number">
                                                            (5)
                                                    </span>
                                                </div> -->
                            <div class=" d-flex align-items-center model-car">
                                <p>
                                    سنة الإصدار: <span>{{ product.year }}</span>
                                </p>
                            </div>

                            <div class=" d-flex align-items-center">
                                <span class="price">
                                    <!-- 5000$ -->
                                    {{ formatCurrency(product.price, product.currency) }}
                                </span>
                            </div>

                            <div class="card-show">

                                <div class="card-show">
                                    <div class=" d-flex align-items-center">
                                        <ul class="show-more-details">
                                            <li v-for="item in product.bestThreeCategories">

                                                <svg width="15" height="15" viewBox="0 0 28 28" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z"
                                                        fill="#24DC26">
                                                    </path>
                                                </svg> {{ item }}
                                            </li>
                                            <!-- <li>
                                            <svg width="15" height="15" viewBox="0 0 28 28" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z"
                                                    fill="#24DC26">
                                                </path>
                                            </svg> تسارع من 0 إلى 100 كم/س في عدد الثواني
                                        </li>
                                        <li>
                                            <svg width="15" height="15" viewBox="0 0 28 28" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z"
                                                    fill="#24DC26">
                                                </path>
                                            </svg> تصميم رياضي فاخر يعكس الإبداع الإيطالي
                                        </li> -->
                                        </ul>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                    <a href="#" class="btn btn-light p-3 contact-with-seller w-100" data-bs-toggle="modal"
                        :data-bs-target="'#contact_with_seller_' + product.id"> تواصل مع
                        البائع</a>
                </div>
            </div>
        </a>
    </div>
    <div class="modal fade" :id="'contact_with_seller_' + product.id" tabindex="-1" aria-labelledby="exampleModalLabel"
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
                            <img v-on:click="toSellerGallaryFunc()" :src="ownerImageFunc(product.ownerImage)" class=""
                                alt="...">
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-center align-items-baseline mb-2">
                                <h6 class="card-title justify-content-center">{{ product.ownerName }} </h6>
                            </div>
                            <div class="d-flex justify-content-center">
                                <div class="d-flex flex-column">
                                    <div class="d-flex align-items-center mb-2">
                                        <ul class="addresul text-center">
                                            <li>{{ cityNameFunc(product.ownerAddressCityId) }} / {{
                                                stateNameFunc(product.ownerAddressStateId) }} </li>
                                            <li>{{ product.ownerAddressInfo }}</li>
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
                                                    </svg> للتواصل: {{ product.ownerMobile }} </li>
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
</template>
<style scoped>
.heart_svg {
    cursor: pointer;
    /* Change cursor to pointer for better UX */
}

.seller_card {
    border: none;
    padding-bottom: 0;
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
</style>