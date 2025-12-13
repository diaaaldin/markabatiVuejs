<script>
import { RouterView } from 'vue-router';
import { ElLoading } from 'element-plus';
import { socialUrlData } from '@/config/config';


import { mapState, mapGetters, mapActions } from "vuex";
import axios from "axios";
import { InterfacesEnum } from '@/config/config.js'


export default {
    data() {
        return {

            interfaceId: InterfacesEnum.modals,

            data: {
                id: 0,
                orderType: 0,
                name: "",
                nickName: "",
                email: "",
                mobile: "",
                stateId: "",
                cityId: "",
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
            states: [], // Will hold the list of states
            cities: [], // Will hold the list of cities for the selected state

            selectedService: '', // To store the selected service
            showOtherServiceText: false,
            birthdayBookingFor: 0,
            birthdayAgeGroup: 0,
            childrenServices: [],

            jobApplicationQuestion: [],

            userAnswers: {},
            questions: [ /* your questions array */],
            questionAnswers: {}, // For storing answers to text, radio, and date questions
            selectedAnswers: {}, // For storing checkbox selections
            questionData: [], // This will hold the final structured data
            isSwinging: false, // Controls the swing class

            socialUrls: {
                facebook: socialUrlData.facebook,
                instagram: socialUrlData.instagram,
                twitter: socialUrlData.twitter,
                linkedIn: socialUrlData.linkedIn,
            },
        }
    },
    components: {
        RouterView,
    },
    mounted() {
        // console.log("this.getSiteComunicationData : ", this.getSiteComunicationData);
    },
    beforeUnmount() {
        // Properly destroy the instance when the component is unmounted
    },

    created() {
    },

    computed: {
        ...mapGetters("Interfaces", ["getInterfaceItemsData"]),
        ...mapGetters("Code", ["getStatesData", "getCitiesData"]),
        ...mapGetters("Code", ["getQuestionsData", "getStatesData", "getComunicationMethodsData", "getOrderServicesData", "getChildrenServicesData"]),
        ...mapGetters("Users", ["getSiteComunicationData"]),


        GetUserName() {
            let userName = localStorage.getItem("customerName");
            if (userName == null) {
                return "";
            } else {
                return userName;
            }
        },
    },

    methods: {
        ...mapActions("Code", ["GetQuestionsData", "GetStates", "GetComunicationMethods", "GetOrderServices", "GetChildrenServices"]),
        ...mapActions("Orders", ["CreateOrder"]),


        getTitleByCode(code) {
            // Find the object with the matching code
            const foundItem = this.getInterfaceItemsData.find(item => item.code === code);
            console.log("getInterfaceItemsData : ", this.getInterfaceItemsData);
            if (foundItem) {
                return foundItem.title;  // Set the title if found

            } else {
                return "Title not found";  // If no match is found
            }
        },

        ownerImageFunc(imgae) {
            const imageUrl = imgae
                ? imgae
                : "/img/seller/seller.png";

            return imageUrl;
        },

        applySwing() {
            this.isSwinging = true; // Apply swing class
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
                this.data.service = 0,
                this.data.otherService = "",
                this.data.comunicationMethods = 0,
                this.data.moreInfo = "",
                this.data.questionData = [],
                this.data.childrenServices = "",
                this.data.totalPrice = 0
        },

        stateNameFunc(id) {
            // console.log("this.getStatesData : ",id);
            let res = this.getStatesData.find(x => x.id === id);
            if (res) return res.name;
            else return "";
        },

        cityNameFunc(id) {
            // console.log("this.getCitiesData : ", id);
            let res = this.getCitiesData.find(x => x.id === id);
            if (res) return res.name;
            else return "";
        },

        whatsAppLinkFunc() {
            // const encodedMsg = encodeURIComponent(this.message);
            // return `https://wa.me/${this.phone}?text=${encodedMsg}`;

            let rawNumber = this.getSiteComunicationData.mobile;

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
    <!--start footer section -->
    <footer class="">
        <div class="container py-5">
            <div class="row text-center text-lg-start justify-content-md-center">
                <div class="col-lg-3 col-md-12">
                    <div class="d-flex flex-column flex-lg-column ">
                        <div class="  d-flex justify-content-center justify-content-lg-start  my-3">
                            <img loading="lazy" src="/img/mini_logo.png" alt="" class="img-fluid" width="200">
                        </div>
                        <!-- <p class="text_footer_hero">
                            {{ $t('footer_about') }}
                        </p> -->
                        <div class="text_footer_hero" v-html="getTitleByCode('message_fotter')">

                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 ps-lg-5">
                    <div class="d-flex flex-column flex-lg-column justify-content-center">
                        <h4 class="text_footer-title"> {{ $t('footer_important_links') }} </h4>
                        <router-link :to="{ name: 'main' }">
                            <span class="text_footer">{{ $t('footer_main') }} </span>
                        </router-link>

                        <router-link :to="{ name: 'vehicles' }">
                            <span class="text_footer">{{ $t('footer_vehicles') }} </span>
                        </router-link>

                        <router-link :to="{ name: 'sellers' }">
                            <span class="text_footer">{{ $t('footer_sellers') }} </span>
                        </router-link>
                        <router-link :to="{ name: 'pay_for_us' }">
                            <span class="text_footer">{{ $t('footer_pay_for_website') }} </span>
                        </router-link>
                        <a href="#" data-bs-toggle="modal"
                            :data-bs-target="'#contact_with_seller_' + getSiteComunicationData.id">
                            <span class="text_footer">{{ $t('footer_comunicaation_with_us') }} </span>
                        </a>
                    </div>

                </div>
                <div class="col-lg-3 col-md-3">
                    <div class="d-flex flex-column flex-lg-column justify-content-between">
                        <h4 class="text_footer-title">{{ $t('footer_lows') }}</h4>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#privacy_policy_modal">
                            <span class="text_footer">{{ $t('footer_private_polices') }} </span>
                        </a>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#terms_and_conditions_modal">
                            <span class="text_footer">{{ $t('footer_terms_and_conditions') }} </span>
                        </a>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#return_polices_modal">
                            <span class="text_footer">{{ $t('footer_return_polices') }} </span>
                        </a>
                    </div>

                </div>
                <div class="col-lg-3 col-md-3 social-links">
                    <h4 class="text_footer-title">{{ $t('footer_followus') }}</h4>
                    <div class="d-flex justify-content-center justify-content-lg-start link">
                        <!-- Facebook -->
                        <a v-if="socialUrls.facebook" :href="socialUrls.facebook" target="_blank"
                            rel="noopener noreferrer">
                            <img loading="lazy" alt="Facebook" src="/img/icons/face.svg" class="img-fluid mx-1">
                        </a>
                        <!-- Twitter / X -->
                        <!-- <a v-if="socialUrls.twitter" :href="socialUrls.twitter" target="_blank" rel="noopener noreferrer">
                            <img loading="lazy" alt="Twitter / X" src="/img/icons/twitter.svg" class="img-fluid mx-1">
                        </a> -->
                        <!-- Instagram -->
                        <a v-if="socialUrls.instagram" :href="socialUrls.instagram" target="_blank"
                            rel="noopener noreferrer">
                            <img loading="lazy" alt="Instagram" src="/img/icons/insta.svg" class="img-fluid mx-1">
                        </a>
                    </div>

                </div>

            </div>
        </div>

        <div class="container">
            <div class="row text-center mt-4 mx-0 copy-write">
                <h3 class="text_footer py-2 mb-0">
                    {{ $t('footer_footer') }}
                </h3>
            </div>
        </div>

    </footer>
    <!--end footer section-->
    <div class="modal fade" :id="'contact_with_seller_' + getSiteComunicationData.id" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> تواصل معنا </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card seller_card">
                        <div class="img">
                            <img loading="lazy" v-on:click="toSellerGallaryFunc()"
                                :src="ownerImageFunc(getSiteComunicationData.image)" class="" alt="...">
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-center align-items-baseline mb-2">
                                <h6 class="card-title justify-content-center">{{ getSiteComunicationData.name }} </h6>
                            </div>
                            <div class="d-flex justify-content-center">
                                <div class="d-flex flex-column">
                                    <div class="d-flex align-items-center mb-2">
                                        <ul class="addresul text-center">
                                            <li>{{ cityNameFunc(getSiteComunicationData.addressCityId) }} / {{
                                                stateNameFunc(getSiteComunicationData.addressStateId) }} </li>
                                            <li>{{ getSiteComunicationData.addressInfo }}</li>
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
                                                    </svg> للتواصل: {{ getSiteComunicationData.mobile }} </li>
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
                        راسلنا
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

    <div class="modal fade" id="privacy_policy_modal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> سياسة الخصوصية </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card seller_card">
                        <div class="card-body" v-html="getTitleByCode('privacy_policy_modal')">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="terms_and_conditions_modal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> الشروط والأحكام </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card seller_card">
                        <div class="card-body" v-html="getTitleByCode('terms_and_conditions_modal')">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="return_polices_modal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> سياسة الإرجاع </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card seller_card">
                        <div class="card-body" v-html="getTitleByCode('return_polices_modal')">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.mt-5 {
    background-image: "C:/img\markabatiComponent\fotter.png";
}
</style>

<style>
/* Non-scoped styles for modals - modals are rendered outside component scope */
.modal-footer .btn-primary {
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