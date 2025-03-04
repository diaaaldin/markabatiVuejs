<script>
import { useHead } from '@vueuse/head'
import { RouterView } from 'vue-router';
import { ElLoading } from 'element-plus';

import { mapState, mapGetters, mapActions } from "vuex";
import darkNavbar from '@/components/darkNavbar.vue';
import mainAnnouncement from '@/components/Announcement/mainAnnouncement.vue';
import lowerAnnouncement from '@/components/Announcement/lowerAnnouncement.vue';
import pageFooter from '../components/footer.vue';

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
    },
    mounted() {
        useHead({
                // Can be static or computed
                title: 'Home | YallaParty',
                meta: [
                    {
                    name: `description`,
                    content: 'Yalla Party is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties. Our platform also supports businesses by providing a marketplace where they can showcase and sell everything related to parties.',
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

    }
};
</script>

<template>
    <div class="home">
        <!--start header section -->
        <darkNavbar></darkNavbar>
        
        <mainAnnouncement></mainAnnouncement>
        
        <div>
            <img src="C:/img\markabatiComponent\homeWrappe.png" alt="">
        </div>

        <lowerAnnouncement></lowerAnnouncement>
    </div>

    <!--start footer section -->
    <pageFooter> </pageFooter>
    <!--end footer section-->


</template>

<style scoped></style>