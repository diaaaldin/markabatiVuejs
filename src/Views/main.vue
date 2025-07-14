<script>
import { useHead } from '@vueuse/head'
import { RouterView } from 'vue-router';
import { ElLoading } from 'element-plus';

import { mapState, mapGetters, mapActions } from "vuex";
import darkNavbar from '@/components/darkNavbar.vue';
import mainAnnouncement from '@/components/Announcement/mainAnnouncement.vue'
import lowerAnnouncement from '@/components/Announcement/lowerAnnouncement.vue'
import sideAnnouncement from '@/components/Announcement/sideAnnouncement.vue'

import pageFooter from '../components/footer.vue';
import productCard from '@/components/Cards/productCard.vue';

export default {
    data() {
        return {
            data: {
            },
            dataNotification: {
                page: 1,
                pageSize: 1000
            },
        }
    },
    components: {
        RouterView,
        darkNavbar,
        mainAnnouncement,
        lowerAnnouncement,
        sideAnnouncement,
        pageFooter,
        productCard
    },
    mounted() {
        this.mainSlider();
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
        // this.initFunc();
    },
    beforeUnmount() {
        // Properly destroy the instance when the component is unmounted
    },

    created() {

    },

    computed: {
        ...mapGetters("Announcement", ["getMainAnnouncementData", "getVerticalAnnouncementData", "getHorizontalAnnouncementData"]),
        ...mapGetters("Orders", ["getStarActiveVehicleData"]),

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
        ...mapActions("Announcement", ["GetMainAnnouncementActiveOrder", "GetVerticalAnnouncementActiveOrder", "GetHorizontalAnnouncementActiveOrder"]),
        ...mapActions("Orders", ["GetStarActiveVehicles"]),
        ...mapActions("NotificationsAndMessages", ["GetUserNotifications", "ReadNotReadNotifications"]),
        ...mapActions("Code", ["GetStates", "GetCities"]),
        ...mapActions("Users", ["GetWebSiteComunicationInfo"]),

        getNotificationFunc() {
            if (this.isTokenValid()) {
                this.GetUserNotifications(this.dataNotification).then(Response => {
                }).catch(error => {
                    this.$moshaToast(error.response.data.message, {
                        hideProgressBar: 'false',
                        position: 'top-center',
                        showIcon: 'true',
                        swipeClose: 'true',
                        type: 'warning',
                        timeout: 3000,
                    });
                });
            }
        },

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

        mainSlider() {
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

        <mainAnnouncement></mainAnnouncement>

        <section class="cars">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9">
                        <div class="row">
                            <productCard v-for="item in getStarActiveVehicleData" :product='item'></productCard>


                        </div>
                        <div class="row justify-content-center see-more">
                            <div class="col-6 col-lg-4">
                                <div class=" d-flex align-items-center justify-content-center ">
                                    <router-link to="/vehicles" class="btn btn-light p-3  show-more-btn w-100">
                                        {{ $t('main_show_all') }}
                                    </router-link>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!--        end card rows -->

                    <sideAnnouncement></sideAnnouncement>
                    <!-- start show more button  -->
                </div>
            </div>
        </section>

        <lowerAnnouncement></lowerAnnouncement>


    </div>

    <!--start footer section -->
    <pageFooter> </pageFooter>
    <!--end footer section-->


</template>

<style scoped></style>