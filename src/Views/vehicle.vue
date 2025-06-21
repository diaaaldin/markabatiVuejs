<script>
import { useHead } from '@vueuse/head'
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';


import pageNav from '@/components/lightNavbar.vue';
import pageFooter from '@/components/footer.vue';
import ImageSlider from '@/components/ImageSlider.vue';
// import { pointManagmentOperation } from '@/config/config';
import productSemilerCard from '@/components/Cards/productSemilerCard.vue'

export default {

    
    data() {
        return {
            emailError: '', 
           
                data: {
                    id: 0,
                    ownerId: 0,
                    onerName: "",
                    ownerImage: "",
                    ownerMobile: "",
                    brandId: 0,
                    brandName: "فيراري",
                    modelId: 0,
                    modelName: "فيراري 488 جي تي بي",
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
                    image: "/img/cars/c1.png",
                    image360: "",
                    vehicleImages: [],
                    bestThreeCategories: [],
                    cardOfVehicle: [],
                    vehicleCategoryExtension: [],
                  
                },

                productData: {
                    title: "",
                    description: "",
                    imageUrl: "",
                    price: 0,
                },

        }
    },
    mounted() {
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

    //     this.iti = window.intlTelInput(this.$refs.phoneInput, {
    //   initialCountry: "us",
    //   strictMode: true,
    //   utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    // });
    },
    beforeUnmount() {
        // Properly destroy the instance when the component is unmounted


    },
    components: {
        pageNav,
        pageFooter,
        ImageSlider,
        productSemilerCard
    },

    emits: {

    },

    created() {
        // Call the function from the store directly when the component is created
        // this.GetPointsProfitData();
        // this.initFunc();
    },

    computed: {
        // ...mapGetters("Code", ["getPointProfitData"]),
        // ...mapGetters("Products", ["getProductData"]),

    },
    methods: {
        ...mapActions("Code", ["GetPointsProfitData",]),
        ...mapActions("Products", ["GetProduct" , "BuyProductOperationWithPoint" , "BuyProductOperationWithPayment"]),

        validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Check if the input is empty
            if (!this.data.email) {
                this.emailError = '';
                return false;
            } 
            // Check if the input does not match the email format
            else if (!emailPattern.test(this.data.email)) {
                this.emailError = 'Please enter a valid email address.';
                return false;
            } 
            // Clear the error if the input is valid
            else {
                this.emailError = '';
                return true;
            }
        },

        filterMobileInput(event) {
            const input = event.target.value.replace(/\D/g, '').slice(0, 10);
            this.data.mobile = input; 
        },
        
        mapBuyDataFunc() {
            // const selectedProfitRate = this.getPointProfitData.find(x => x.id === pointManagmentOperation.SiteProfitPercentage);
            // const selectedPointsForDoller = this.getPointProfitData.find(x => x.id === pointManagmentOperation.howManyPointForDollar);

            // if (selectedProfitRate) {
            //     this.siteProfitRate = selectedProfitRate.value;
            // }
            // if (selectedPointsForDoller) {
            //     this.pointsForDoller = selectedPointsForDoller.value;
            // }

            this.buyData.data.productId = this.getProductData.id;
            this.finalProductPricePoint = Math.ceil(this.pointsForDoller * this.getProductData.price);
            this.buyData.data.price = this.finalProductPrice;
            this.buyData.data.name = localStorage.getItem('customerName');
            this.buyData.data.email = localStorage.getItem('email');

            this.finalProductPrice = this.formatPriceToTwoDigits(this.getProductData.price + (this.getProductData.price * (this.siteProfitRate / 100)));
            this.buyData.productData.price = this.finalProductPrice;
            this.buyData.productData.title = "Buy product";
            this.buyData.productData.description = this.getProductData.name;
            this.buyData.productData.imageUrl = this.getProductData.image;
        },

        toMarketFunc() {
            this.$router.push({ name: 'productsmarket', params: { id: this.getProductData.userId } });
        
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

            this.GetProduct(id).then(Response => {
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

        formatCurrency(value) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: "USD",
                minimumFractionDigits: 0, // No decimals
                maximumFractionDigits: 0  // No decimals
            }).format(value);
        },

        formatPriceToTwoDigits(price) {
            return Math.round(price);  
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
                            <router-link to="/" :class="{ active: $route.path === '/' }">  {{ $t('location_menu_main') }} </router-link>
                    </li>
                    <li class="breadcrumb-item">
                            <router-link to="/vehicles" :class="{ active: $route.path === '/vehicles' }"> {{ $t('location_menu_vehicles') }} </router-link>
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
                 <ImageSlider></ImageSlider>
            </div>
            <div class="col-md-6">
                <div class="info">
                    <div class="d-flex justify-content-between align-items-baseline mb-2">
                            <h6 class="justify-content-start">فيراري</h6>
                        <a href="javascript:void(0)" class="justify-content-end">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.7878 3.10215C11.283 2.09877 12.7138 2.09876 13.209 3.10215L15.567 7.87987L20.8395 8.64601C21.9468 8.80691 22.3889 10.1677 21.5877 10.9487L17.7724 14.6676L18.6731 19.9189C18.8622 21.0217 17.7047 21.8627 16.7143 21.342L11.9984 18.8627L7.28252 21.342C6.29213 21.8627 5.13459 21.0217 5.32374 19.9189L6.2244 14.6676L2.40916 10.9487C1.60791 10.1677 2.05005 8.80691 3.15735 8.64601L8.42988 7.87987L10.7878 3.10215ZM11.9984 4.03854L9.74008 8.61443C9.54344 9.01288 9.16332 9.28904 8.72361 9.35294L3.67382 10.0867L7.32788 13.6486C7.64606 13.9587 7.79125 14.4055 7.71614 14.8435L6.85353 19.8729L11.3702 17.4983C11.7635 17.2915 12.2333 17.2915 12.6266 17.4983L17.1433 19.8729L16.2807 14.8435C16.2056 14.4055 16.3508 13.9587 16.6689 13.6486L20.323 10.0867L15.2732 9.35294C14.8335 9.28904 14.4534 9.01288 14.2568 8.61443L11.9984 4.03854Z" fill="#999999"></path></svg>
                         </a>
                    </div>
                    <h1>فيراري 488 جي تي بي </h1>
                    <div class="d-flex align-items-center">
                        <span class="price"> 5000$ </span>
                        <span class="des"> 34.75$ </span>
                    </div>

                    <div class="d-flex justify-content-between">
                            <div class=" d-flex  flex-column">
                                <div class="d-flex align-items-center mb-3">
                                    <ul class="details">
                                        
                                        <li>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.2197 6.96967L8.75 11.4393L6.78033 9.4697C6.48744 9.1768 6.01256 9.1768 5.71967 9.4697C5.42678 9.7626 5.42678 10.2374 5.71967 10.5303L8.2197 13.0303C8.5126 13.3232 8.9874 13.3232 9.2803 13.0303L14.2803 8.0303C14.5732 7.73744 14.5732 7.26256 14.2803 6.96967C13.9874 6.67678 13.5126 6.67678 13.2197 6.96967Z" fill="black"/>
                                            </svg>
                                                    نوع المحرك : v8 مزدوج التيربو (Twin-Turbocharged)
                                        </li>
                                        <li>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.2197 6.96967L8.75 11.4393L6.78033 9.4697C6.48744 9.1768 6.01256 9.1768 5.71967 9.4697C5.42678 9.7626 5.42678 10.2374 5.71967 10.5303L8.2197 13.0303C8.5126 13.3232 8.9874 13.3232 9.2803 13.0303L14.2803 8.0303C14.5732 7.73744 14.5732 7.26256 14.2803 6.96967C13.9874 6.67678 13.5126 6.67678 13.2197 6.96967Z" fill="black"/>
                                            </svg>
                                                    القوة : 661 حصان (PS 670) عند 8000 دورة في الدقيقة 
                                        </li>
                                        <li>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.2197 6.96967L8.75 11.4393L6.78033 9.4697C6.48744 9.1768 6.01256 9.1768 5.71967 9.4697C5.42678 9.7626 5.42678 10.2374 5.71967 10.5303L8.2197 13.0303C8.5126 13.3232 8.9874 13.3232 9.2803 13.0303L14.2803 8.0303C14.5732 7.73744 14.5732 7.26256 14.2803 6.96967C13.9874 6.67678 13.5126 6.67678 13.2197 6.96967Z" fill="black"/>
                                            </svg>
                                             عزم الدوران : 760 نيوتن متر عند 3000 دورة في الدقيقة
                                        </li>
                                       
                                        <p>فيراري 488 جي تي بي هي سيارة رياضية فائقة الأداء (سوبر كار) من إنتاج شركة فيراري الإيطالية، وتم الكشف عنها لأول مرة في عام 2015 كخلفية لطراز فيراري 458. تعتبر 488 جي تي بي مزيجا مثاليا من الأدالء العالي، التصمي الجذاب، والتفنيات الحديثة. <router-link to="/vehicle"><span class="more">مشاهدة المزيد</span></router-link></p>
                                            
                                    </ul>
                                </div>
                            </div>
                    </div>
                    <div class="seller">
                        <div class="img">
                            <img src="/img/seller.png" class="" alt="...">
                        </div>
                        <div class="name">
                            <p>ضياء أبو قوصه</p>
                            <span>بائع</span>
                        </div>
                        <div class="row">
                            <div class="col-6 text-center">
                                <router-link to="/">  
                                    <p class="contact">{{ $t('vehicle_btn_contact_with_seller') }} </p>
                                </router-link>
                            </div>
                            <div class="col-6 text-center">
                                <router-link to="/">  
                                    <p class="call"> {{ $t('vehicle_btn_get_in') }} </p>
                                </router-link>
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
                    <p>مرسيدس بنز</p>
                </div>
            </div>
            <div class="col-md-2 text-center">
                <div class="details-squre">
                    <span></span>
                    <h5> {{ $t('vehicle_card_model') }}</h5>
                    <p> أي كلاس</p>
                </div>
            </div>
            <div class="col-md-2 text-center">
                <div class="details-squre">
                    <span></span>
                    <h5> {{ $t('vehicle_card_year') }}</h5>
                    <p> 2002</p>
                </div>
            </div>
            <div class="col-md-2 text-center">
                <div class="details-squre">
                    <span></span>
                    <h5>{{ $t('vehicle_card_price') }}</h5>
                    <p> 30000$</p>
                </div>
            </div>
            <div class="col-md-2 text-center">
                <div class="details-squre">
                    <span></span>
                    <h5>{{ $t('vehicle_card_meals') }}</h5>
                    <p> 22</p>
                </div>
            </div>
            <div class="col-md-2 text-center">
                <div class="details-squre">
                    <span></span>
                    <h5> {{ $t('vehicle_card_color') }}</h5>
                    <p> رمادي</p>
                </div>
            </div>
            <div class="col-md-2 text-center">
                <div class="details-squre">
                    <span></span>
                    <h5>{{ $t('vehicle_card_body_type') }}</h5>
                    <p>سيدان </p>
                </div>
            </div>
            <div class="col-md-2 text-center">
                <div class="details-squre">
                    <span></span>
                    <h5> {{ $t('vehicle_card_specefication') }}</h5>
                    <p> أمريكي</p>
                </div>
            </div>
            <div class="col-md-2 text-center">
                <div class="details-squre">
                    <span></span>
                    <h5>{{ $t('vehicle_card_painting_type') }}</h5>
                    <p>الميتالك </p>
                </div>
            </div>
            <div class="col-md-2 text-center">
                <div class="details-squre">
                    <span></span>
                    <h5> {{ $t('vehicle_card_painting_status') }}</h5>
                    <p> ممتازة</p>
                </div>
            </div>
            <div class="col-md-2 text-center">
                <div class="details-squre">
                    <span></span>
                    <h5>{{ $t('vehicle_card_gear_type') }}</h5>
                    <p> أوتوماتيكي</p>
                </div>
            </div>
            <div class="col-md-2 text-center">
                <div class="details-squre">
                    <span></span>
                    <h5>{{ $t('vehicle_card_oil_type') }}</h5>
                    <p> بنزين</p>
                </div>
            </div>
           </div>
           <div class="row">
            <div class="col-12">
                <div class="public-view">
                    <h1 class="line-green">{{ $t('vehicle_discreption') }} </h1>
                    <div class="col-12 mt-4">
                    <p>فيراري 488 جي تي بي هي سيارة رياضية فائقة الأداء (سوبر كار) من إنتاج شركة فيراري الإيطالية، وتم الكشف عنها لأول مرة في عام 2015 كخلفية لطراز فيراري 458. تعتبر 488 جي تي بي مزيجا مثاليا من الأدالء العالي، التصمي الجذاب، والتفنيات الحديثة.</p>
                    </div>
                </div>
            </div>
           </div>
           <div class="row">
            <div class="col-12">
                <div class="same-vehicle">
                    <h1>{{ $t('vehicle_vehicle_semiler') }} </h1>
                        <div class="row">
                           <productSemilerCard></productSemilerCard>
                           <productSemilerCard></productSemilerCard>
                           <productSemilerCard></productSemilerCard>
                           <productSemilerCard></productSemilerCard>
                        </div>
                </div>
            </div>
           </div>
        </div>
    </section>

    <pageFooter></pageFooter>


</template>
<style scoped></style>