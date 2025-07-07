<script>
import { RouterView } from 'vue-router';
import { ElLoading } from 'element-plus';
import { socialUrlData } from '@/config/config';


import { mapState, mapGetters, mapActions } from "vuex";
import axios from "axios";


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



    },
    beforeUnmount() {
        // Properly destroy the instance when the component is unmounted
    },

    created() {

    },

    computed: {
        ...mapGetters("Code", ["getQuestionsData", "getStatesData", "getComunicationMethodsData", "getOrderServicesData", "getChildrenServicesData"]),

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
                            <img src="/img/logo.png" alt="" class="img-fluid">
                        </div>
                        <p class="text_footer_hero">
                            {{ $t('footer_about') }}
                          </p>
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
                        <router-link :to="{ name: 'main' }">
                            <span class="text_footer">{{ $t('footer_pay_for_website') }} </span>
                        </router-link>
                         <router-link :to="{ name: 'main' }">
                            <span class="text_footer">{{ $t('footer_comunicaation_with_us') }} </span>
                        </router-link>
                    </div>
                    
                </div>
                <div class="col-lg-3 col-md-3">
                    <div class="d-flex flex-column flex-lg-column justify-content-between">
                        <h4 class="text_footer-title">{{ $t('footer_lows') }}</h4>
                        <a href="#">
                            <span class="text_footer">{{ $t('footer_private_polices') }}  </span>
                        </a>
                        <a href="#">
                            <span class="text_footer">{{ $t('footer_jadgement') }} </span>
                        </a>
                        <a href="#">
                            <span class="text_footer">{{ $t('footer_return_polices') }} </span>
                        </a>
                    </div>

                </div>
                <div class="col-lg-3 col-md-3 social-links">
                    <h4 class="text_footer-title">{{ $t('footer_followus') }}</h4>
                    <div class="d-flex justify-content-center justify-content-lg-start link">
                        <a href="#">
                            <img alt="Facebook" src="/img/icons/face.svg" class="img-fluid mx-1">
                        </a>
                        <a href="#">
                            <img alt="web" src="/img/icons/web.svg" class="img-fluid mx-1">
                        </a>
                        <a href="#">
                            <img alt="ln" src="/img/icons/ln.svg" class="img-fluid mx-1">
                        </a>
                        <a href="#">
                            <img alt="insta" src="/img/icons/insta.svg" class="img-fluid mx-1">
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

</template>
<style scoped>
.mt-5 {
    background-image: "C:/img\markabatiComponent\fotter.png";
}
</style>
