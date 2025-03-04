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
    <footer class="mt-5">
        <!-- <div class="container py-5">
            <div class="row align-items-center text-center text-lg-start justify-content-md-center">
                <div class="col-lg-3 col-md-12">
                    <div class="d-flex flex-column flex-lg-column">
                        <div class="d-flex justify-content-center justify-content-lg-start my-3">
                            <img src="/img/WhiteYallaPartyLogo.png" alt="" width="70" class="img-fluid" />
                        </div>

                        <p class="text_footer_hero">
                            Yalla Party is a subsidiary of Yalla Party LLC, registered in the state of Maryland, United
                            States of America.
                        </p>
                        
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 ps-lg-5 services">
                    <div class="d-flex flex-column flex-lg-column justify-content-center">
                        <a href="#">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m9 5 7 7-7 7" />
                            </svg>
                            <span class="text_footer">Services </span>
                        </a>
                 
                        <router-link to="/aboutus">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m9 5 7 7-7 7" />
                            </svg>
                            <span class="text_footer">About Us</span>
                        </router-link>

                        <a id="contact_with" @click="applySwing">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m9 5 7 7-7 7" />
                            </svg>

                            <span class="text_footer"> Contact with us </span>
                        </a>
                        <a href="" data-bs-toggle="modal" data-bs-target="#job-application">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m9 5 7 7-7 7" />
                            </svg>

                            <span class="text_footer">Work with Yalla Party</span>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 info">
                    <div class="d-flex flex-column flex-lg-column justify-content-between">
                        <p class="text_footer_hero">
                            Capitol Heights, MD USA
                        </p>
                        <a>
                            <i class="fa fa-phone white fs-4"></i>
                            <span class="text_footer contact-footer" :class="{ swing: isSwinging }"
                                @animationend="isSwinging = false"> 202 455 9004 </span>
                        </a>
                        <a>
                            <i class="fa fa-envelope white fs-4"></i>
                            <span class="text_footer contact-footer" :class="{ swing: isSwinging }"
                                @animationend="isSwinging = false"> info@yallaparty.net</span>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-12 mb-lg-4 follow">
                    <h3 class="text_footer"> Follow us on: </h3>
                    <div class="d-flex justify-content-center justify-content-lg-start">
                        <div class="social-links">
                            <ul>
                                <li><a :href="socialUrls.facebook"><i class="fab fa-facebook"
                                            aria-hidden="true"></i></a></li>
                                <li><a :href="socialUrls.twitter">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="fa-xx" width="19" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                                </a></li>
                                <li><a :href="socialUrls.instagram"><i class="fab fa-instagram"
                                            aria-hidden="true"></i></a></li>
                       
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row text-center mt-4 mx-0 copy-write">
            <h3 class="text_footer py-2 mb-0">
                Copyright ©2024 Yalla Party. All Rights Reserved Copyright
            </h3>
        </div> -->
    </footer>
    <!--end footer section-->

</template>
<style scoped>
.mt-5 {
background-image: "C:/img\markabatiComponent\fotter.png";
}
</style>
