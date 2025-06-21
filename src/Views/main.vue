<script>
import { useHead } from '@vueuse/head'
import { RouterView } from 'vue-router';
import { ElLoading } from 'element-plus';

import { mapState, mapGetters, mapActions } from "vuex";
import darkNavbar from '@/components/darkNavbar.vue';
import mainAnnouncement from '@/components/Announcement/mainAnnouncement.vue';
import lowerAnnouncement from '@/components/Announcement/lowerAnnouncement.vue';
import pageFooter from '../components/footer.vue';
import productCard from '@/components/Cards/productCard.vue';

export default {
    data() {
        return {
            data: {
                id: 0,
                orderType: 0,
                name: "",
                nickName: "",
                email: "",
                mobile: "",
                stateId: "",
                cityId: "",
                orderDate: null,
                comunicationMethods: 0,
                service: 0,
                otherService: "",
                moreInfo: "",
                questionData: [],
                birthdayOwnerName: "",
                childrenServices: "",
                totalPrice: 0
            },
            emailError: '',
            // states: [], // Will hold the list of states
            cities: [], // Will hold the list of cities for the selected state

            selectedService: '', // To store the selected service
            showOtherServiceText: false,
            birthdayBookingFor: 0,
            birthdayAgeGroup: 0,
            childrenServices: [],

            weddingQuestion: [],
            engagementQuestion: [],
            birthdayQuestion: [],
            graduationQuestion: [],
            specialQuestion: [],
            jobApplicationQuestion: [],

            userAnswers: {},
            questions: [ /* your questions array */],
            questionAnswers: {}, // For storing answers to text, radio, and date questions
            selectedAnswers: {}, // For storing checkbox selections
            questionData: [] // This will hold the final structured data
        }
    },
    components: {
        RouterView,
        darkNavbar,
        mainAnnouncement,
        lowerAnnouncement,
        pageFooter,
        productCard
    },
    mounted() {
        this.MainSlider();

        useHead({
            // Can be static or computed
            title: 'Home | Markabati',
            meta: [
                {
                    name: `description`,
                    content: 'Markabati is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties. Our platform also supports businesses by providing a marketplace where they can showcase and sell everything related to parties.',
                },
            ],

        });
        //console.log("this.getQuestionsData : ", this.getQuestionsData);
        // Initialize intl-tel-input on the input element
    },
    beforeUnmount() {
        // Properly destroy the instance when the component is unmounted

    },

    created() {
        // this.fetchStates();

    },

    computed: {
        // ...mapGetters("Code", ["getQuestionsData", "getStatesData", "getComunicationMethodsData", "getOrderServicesData", "getChildrenServicesData"]),

        GetUserName() {
            let userName = "";
            // let userName = localStorage.getItem("customerName");
            if (userName == null) {
                return "";
            } else {
                return userName;
            }
        },

    },

    methods: {
        ...mapActions("Code", ["GetQuestionsData", "GetComunicationMethods", "GetOrderServices", "GetChildrenServices"]),
        ...mapActions("Orders", ["CreateOrder"]),
        ...mapActions("Users", ["CustomerProfileInfo"]),

        goToProfileFunc() {
            if (!this.isTokenValid()) {
                this.$router.push({ name: 'login' });
            } else {
                let email = localStorage.getItem("email");
                this.CustomerProfileInfo(email).then(Response => {
                    this.$router.push({ name: 'profileProfile' });
                })
            }
        },

        isTokenValid() {
            const token = localStorage.getItem('token');
            if (!token) return false;
            // Example: check token expiration
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp > currentTime;
        },

        logoutFunc() {
            localStorage.clear();
            this.$router.push({ name: 'main' });
            window.location.reload();
        },

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

        clearData() {
            this.data.id = 0,
                this.data.orderType = 0,
                this.data.name = "",
                this.data.nickName = "",
                this.data.email = "",
                this.data.mobile = "",
                this.data.stateId = "",
                this.data.cityId = "",
                this.data.orderDate = null,
                this.data.service = 0,
                this.data.otherService = "",
                this.data.comunicationMethods = 0,
                this.data.moreInfo = "",
                this.data.questionData = [],
                this.data.childrenServices = "",
                this.data.totalPrice = 0,
                this.emailError = ''
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

    }

};


</script>

<template>
    <div class="home">
        <!-- start header section -->
        <darkNavbar> </darkNavbar>
        <section class="slider-main">
            <div class="slider">
                <div class="card-slider">
                    <img src="/img/slider/s1.png" class="card-img-top" alt="...">
                    <!-- <div class="card-body">
                        <div class="d-flex justify-content-between mb-2">
                            <h1 class="card-title justify-content-start">سيارتك المثالية بين يديك, ابدأ رحلتك معنا!
                            </h1>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class=" d-flex  flex-column">
                                <div class="d-flex align-items-center mb-3">
                                    <h3>حقق أحلامك على الطريق مع أفضل السيارات للبيع والإيجار! اختر من بين مجموعة فاخرة
                                        ومميزة تلبي كل احتياجاتك بأسعار تنافسية وخدمات لا تضاهي. سواء كنت تبحث عن
                                        الفخامة أو الأداء أو الراحة، نحن هنا لنمنحك تحربة قيادة تفوق التوقعات!</h3>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class=" d-flex  flex-column">
                                <div class="d-flex align-items-center mb-3">
                                    <a href="">استكشف معنا</a>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
                <div class="card-slider">
                    <img src="/img/slider/s2.png" class="card-img-top" alt="...">
                     <!-- <div class="card-body">
                        <div class="d-flex justify-content-between mb-2">
                            <h1 class="card-title justify-content-start">سيارتك المثالية بين يديك, ابدا رحلتك معنا!
                            </h1>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class=" d-flex  flex-column">
                                <div class="d-flex align-items-center mb-3">
                                    <h3>حقق أحلامك على الطريق مع أفضل السيارات للبيع والإيجار! اختر من بين مجموعة فاخرة
                                        ومميزة تلبي كل احتياجاتك بأسعار تنافسية وخدمات لا تضاهي. سواء كنت تبحث عن
                                        الفخامة أو الأداء أو الراحة، نحن هنا لنمنحك تحربة قيادة تفوق التوقعات!</h3>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class=" d-flex  flex-column">
                                <div class="d-flex align-items-center mb-3">
                                    <a href="">استكشف المزيد</a>
                                </div>
                            </div>
                        </div>
                    </div>  -->
                </div>


            </div>
        </section>
        <section class="cars">
            <div class="container">
                <div class="row">
                <div class="col-lg-9">
                    <div class="row">
                        <productCard ></productCard>
                        <productCard ></productCard>
                        <productCard ></productCard>
                        <productCard ></productCard>
                        <productCard ></productCard>
                        <productCard ></productCard>
                        
                    </div>
                    <div class="row justify-content-center see-more">
                    <div class="col-6 col-lg-4">
                        <div class=" d-flex align-items-center justify-content-center ">
                            <a href="#" class="btn btn-light p-3  show-more-btn w-100">
                                {{ $t('main_show_all') }}
                              </a>
                        </div>
                    </div>

                </div>
                </div>
                <!--        end card rows -->
                    <div class="col-md-3 ads-card">
                        <div class="row">
                            <div class="col-12 col-lg-12 col-md-6 mt-4" data-aos="fade-up" data-aos-delay="100"
                            data-aos-duration="700">
                            <a href="service_details.html" style="color:black;">
                                <div class="card custom_card">
                                    <div class="image">
                                        <img src="/img/ads/ad2.png" class="card-img-top index-img-card" alt="...">
                                    </div>
                                    <!-- <div class="card-body">
                                        <div class=" mb-2">
                                            <h6 class="card-title ">فيراري</h6>
                                        </div>
                                        <div class="">
                                            <div class=" d-flex  flex-column">
                                                <div class="d-flex align-items-center mb-2">
                                                    <a href="hotel_details.html" class="name-details">
                                                        فيراري 488 جي تي بي                                                        
                                                    </a>
                                                </div>
                                                <div class=" d-flex align-items-center rate mb-2">
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
                                                </div>
                                                <div class=" d-flex align-items-center">
                                                    
                                                    <span class="price">
                                                            5000$
                                                    </span>
                                                    <span class="des">
                                                            34.75$
                                                    </span>
                                                </div>

                                            </div>
                                            

                                        </div>
                                    </div> -->
                                </div>
                            </a>
                        </div>
                        <div class="col-12 col-lg-12 col-md-6 mt-4" data-aos="fade-up" data-aos-delay="100"
                            data-aos-duration="700">
                            <a href="" style="color:black;">
                                <div class="card custom_card">
                                    <div class="image">
                                        <img src="/img/ads/ad1.png" class="card-img-top index-img-card" alt="...">
                                    </div>
                                    <!-- <div class="card-body">
                                        <div class="mb-2">
                                            <h6 class="card-title">فيراري</h6>
                                           
                                        </div>
                                        <div class="">
                                            <div class=" d-flex  flex-column">
                                                <div class="d-flex align-items-center mb-2">
                                                    <a href="hotel_details.html" class="name-details">
                                                        فيراري 488 جي تي بي                                                        
                                                    </a>
                                                </div>
                                                <div class=" d-flex align-items-center rate mb-2">
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
                                                </div>
                                                <div class=" d-flex align-items-center">
                                                    
                                                    <span class="price">
                                                            5000$
                                                    </span>
                                                    <span class="des">
                                                            34.75$
                                                    </span>
                                                </div>

                                            </div>
                                            

                                        </div>
                                    </div> -->
                                </div>
                            </a>
                        </div>
                        </div>
                    </div>
                <!-- start show more button  -->
            </div>
            </div>
        </section>

        <section class="slider-main ads-main">
            <div class="slider">
                <div class="card-slider">
                    <img src="/img/slider/s2.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-2">
                            <h1 class="card-title justify-content-start"> 
                                انطلق بقوة وأناقة مع سيارة الأحلام أصبحت في متناول يديك!
                            </h1>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class=" d-flex  flex-column">
                                <div class="d-flex align-items-center mb-3">
                                    <ul class="details">
                                        <li>
                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z" fill="#24DC26"/>
                                            </svg>
                                            المواصفات</li>
                                        <li>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.2197 6.96967L8.75 11.4393L6.78033 9.4697C6.48744 9.1768 6.01256 9.1768 5.71967 9.4697C5.42678 9.7626 5.42678 10.2374 5.71967 10.5303L8.2197 13.0303C8.5126 13.3232 8.9874 13.3232 9.2803 13.0303L14.2803 8.0303C14.5732 7.73744 14.5732 7.26256 14.2803 6.96967C13.9874 6.67678 13.5126 6.67678 13.2197 6.96967Z" fill="white"/>
                                            </svg>

                                            محرك v8 توربو بقوة مذهلة</li>
                                        <li>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.2197 6.96967L8.75 11.4393L6.78033 9.4697C6.48744 9.1768 6.01256 9.1768 5.71967 9.4697C5.42678 9.7626 5.42678 10.2374 5.71967 10.5303L8.2197 13.0303C8.5126 13.3232 8.9874 13.3232 9.2803 13.0303L14.2803 8.0303C14.5732 7.73744 14.5732 7.26256 14.2803 6.96967C13.9874 6.67678 13.5126 6.67678 13.2197 6.96967Z" fill="white"/>
                                            </svg>
                                            تسارع من 0 إلى 100 كم/س في عدد الثواني </li>
                                        <li>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.2197 6.96967L8.75 11.4393L6.78033 9.4697C6.48744 9.1768 6.01256 9.1768 5.71967 9.4697C5.42678 9.7626 5.42678 10.2374 5.71967 10.5303L8.2197 13.0303C8.5126 13.3232 8.9874 13.3232 9.2803 13.0303L14.2803 8.0303C14.5732 7.73744 14.5732 7.26256 14.2803 6.96967C13.9874 6.67678 13.5126 6.67678 13.2197 6.96967Z" fill="white"/>
                                            </svg>
                                            تصميم رياضي فاخر يعكس الإبداع الإيطالي</li>
                                        <li>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.2197 6.96967L8.75 11.4393L6.78033 9.4697C6.48744 9.1768 6.01256 9.1768 5.71967 9.4697C5.42678 9.7626 5.42678 10.2374 5.71967 10.5303L8.2197 13.0303C8.5126 13.3232 8.9874 13.3232 9.2803 13.0303L14.2803 8.0303C14.5732 7.73744 14.5732 7.26256 14.2803 6.96967C13.9874 6.67678 13.5126 6.67678 13.2197 6.96967Z" fill="white"/>
                                            </svg>
                                            
                                            أنظمة تكنولوجيا متقدمة لتجربة قيادة لا تنسى</li>

                                        <li>فقط<span>$4000</span></li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class=" d-flex  flex-column">
                                <div class="d-flex align-items-center mb-3">
                                    <a href="">تواصل مع البائع</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-slider">
                    <img src="/img/slider/s1.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-2">
                            <h1 class="card-title justify-content-start">سيارتك المثالية بين يديك, ابدا رحلتك معنا!
                            </h1>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class=" d-flex  flex-column">
                                <div class="d-flex align-items-center mb-3">
                                    <h3>حقق أحلامك على الطريق مع أفضل السيارات للبيع والإيجار! اختر من بين مجموعة فاخرة
                                        ومميزة تلبي كل احتياجاتك بأسعار تنافسية وخدمات لا تضاهي. سواء كنت تبحث عن
                                        الفخامة أو الأداء أو الراحة، نحن هنا لنمنحك تحربة قيادة تفوق التوقعات!</h3>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class=" d-flex  flex-column">
                                <div class="d-flex align-items-center mb-3">
                                    <a href="">استكشف المزيد</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </section>
        


        <mainAnnouncement></mainAnnouncement>

        <lowerAnnouncement></lowerAnnouncement>
    </div>

    <!--start footer section -->
    <pageFooter> </pageFooter>
    <!--end footer section-->


</template>

<style scoped></style>