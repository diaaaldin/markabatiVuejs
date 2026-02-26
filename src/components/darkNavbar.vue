<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Urls } from '@/config/config';

export default {
    data() {
        return {

            dashUrl: {
                login: Urls.login,
                addProduct: Urls.addProduct,
                addEvent: Urls.addEvent,
                storeSignup: Urls.storeSignup,
                companySignup: Urls.companySignup,
                partnerSignup: Urls.partnerSignup,
            },
            dataNotification: {
                page: 1,
                pageSize: 1000
            }
        }
    },
    mounted() {

    },
    components: {

    },

    emits: {

    },

    created() {
        // Call the function from the store directly when the component is created

    },

    computed: {
        ...mapGetters("Users", ["getUserData"]),
        ...mapGetters("NotificationsAndMessages", ["getUserNotificationsData"]),

        userImage() {
            const imageUrl = this.getUserData && this.getUserData.image
                ? this.getUserData.image
                : "/img/profile-icon.png";

            return imageUrl;
        },
        userHaveToken() {
            const name = this.getUserLoginName;// just for loud this function again when name change
            let token = localStorage.getItem("token");
            if (token == null) {
                return false;
            } else {
                return true;
            }
        },

    },
    methods: {
        ...mapActions("Users", ["CustomerProfileInfo"]),
        ...mapActions("NotificationsAndMessages", ["GetUserNotifications", "ReadNotReadNotifications"]),


        // initFunc() {
        //     this.GetUserNotifications(this.dataNotification).then(Response => {
        //         console.log("getUserNotificationsData :", this.getUserNotificationsData);
        //     }).catch(error => {
        //         this.$moshaToast(error.response.data.message, {
        //             hideProgressBar: 'false',
        //             position: 'top-center',
        //             showIcon: 'true',
        //             swipeClose: 'true',
        //             type: 'warning',
        //             timeout: 3000,
        //         });
        //     });
        // },

        ReadNotReadNotificationsFunc() {
            this.ReadNotReadNotifications().then(Response => {
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
        },

        formatDateTime(dateString) {
            const date = new Date(dateString);
            if (isNaN(date)) return '';

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            let hours = date.getHours();
            const minutes = String(date.getMinutes()).padStart(2, '0');

            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // Convert 0 to 12
            const formattedHours = String(hours).padStart(2, '0');

            return `${year}-${month}-${day} ${formattedHours}:${minutes} ${ampm}`;
        },

        goToProfileFunc() {
            if (!this.isTokenValid()) {
                this.$router.push({ name: 'login' });
            } else {
                this.$router.push({ name: "profile_profile" });
            }
        },

        // isTokenValid() {
        //     const token = localStorage.getItem('token');
        //     if (!token) return false;
        //     // Example: check token expiration
        //     const payload = JSON.parse(atob(token.split('.')[1]));
        //     const currentTime = Math.floor(Date.now() / 1000);
        //     return payload.exp > currentTime;
        // },

        
		isTokenValid() {
			const token = localStorage.getItem('token');

			if (!token || typeof token !== 'string' || !token.includes('.')) {
				console.warn("Token is missing or invalid structure");
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

				return decodedPayload.exp > currentTime;
			} catch (error) {
				console.error("Token decoding failed:", error);
				return false;
			}
		},

        logoutFunc() {
            localStorage.clear();
            this.$router.push({ name: 'main' });
            //window.location.reload();
            /// refresh page
        },


    }
};
</script>
<template>
    <div class="header-div main">
        <nav class="navbar navbar-expand-lg navbar-expand-lg ">
            <div class="container">

                <div class="navbar-brand">
                    <router-link to="/">
                        <img loading="lazy" src="/img/mini_logo.png"  alt="" />
                    </router-link>

                </div>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler">
                        <svg width="34" height="26" viewBox="0 0 34 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.3479 21.124H0V25.3656H11.3479V21.124Z" fill="white"></path>
                            <path d="M22.6738 10.5625H0.148438V14.8041H22.6738V10.5625Z" fill="white"></path>
                            <path d="M34 0H0.148438V4.24156H34V0Z" fill="white"></path>
                        </svg>
                    </span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav align-items-center mx-auto mb-2 mb-lg-0 gradiant_nav">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }"> {{
                                $t('navbar_main') }} </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/vehicles" class="nav-link"
                                :class="{ active: $route.path === '/vehicles' }"> {{ $t('navbar_vehicles') }}
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/sellers" class="nav-link" :class="{ active: $route.path === '/sellers' }">
                                {{ $t('navbar_sellers') }} </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/aboutus" class="nav-link" :class="{ active: $route.path === '/aboutus' }">
                                {{ $t('navbar_aboutus') }} </router-link>
                        </li>
                    </ul>
                

                <ul v-if="userHaveToken == false"
                    class="nav align-items-center mb-2 mb-lg-0 white-header justify-content-center gradiant_nav">
                    <li class="nav-item login">
                        <router-link to="/login" class="px-3 py-2 align-items-center d-flex login-btn"> {{
                            $t('navbar_login') }} </router-link>
                    </li>
                    <li class="nav-item sign-up">
                        <router-link to="/signUp" class="px-3 py-2 align-items-center d-flex login-btn">{{
                            $t('navbar_signup') }}</router-link>
                    </li>
                </ul>

                <ul v-else class="nav align-items-center mb-2 mb-lg-0 white-header justify-content-center gradiant_nav">
                    <li class="nav-item">
                        <div class="dropdown hero-notification-div ">
                            <span v-if="(getUserNotificationsData.notReadNum ?? 0) > 0" class="account">
                                {{ getUserNotificationsData.notReadNum ?? 0 }}
                            </span>
                            <svg v-on:click="ReadNotReadNotificationsFunc()" class="noti-svg dropdown-toggle"
                                id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11 3C11 2.44772 11.4477 2 12 2C12.5523 2 13 2.44772 13 3V4C13 4.02774 12.9989 4.05522 12.9967 4.08239C15.836 4.55707 18 7.02582 18 10V11.9574C18 12.3881 18.156 12.8042 18.439 13.1289L19.0834 13.8682C21.1702 16.2623 19.4699 20 16.294 20H14C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20H7.70609C4.53019 20 2.82986 16.2623 4.91668 13.8682L5.56112 13.1289C5.84413 12.8042 6.00004 12.3881 6.00004 11.9574V10C6.00004 7.02585 8.16401 4.55712 11.0033 4.08241C11.0011 4.05523 11 4.02775 11 4V3ZM12 6C9.7909 6 8.00004 7.79086 8.00004 10V11.9574C8.00004 12.8712 7.66924 13.7542 7.06876 14.443L6.42432 15.1824C5.4654 16.2825 6.24672 18 7.70609 18H16.294C17.7534 18 18.5347 16.2825 17.5758 15.1824L16.9313 14.443C16.3308 13.7542 16 12.8712 16 11.9574V10C16 7.79086 14.2092 6 12 6Z"
                                    fill="#0B3D74" />
                            </svg>

                            <ul class="dropdown-menu notification pt-3" aria-labelledby="dropdownMenuButton1">
                                <div class="container">
                                    <h6> {{ $t('navbar_notifications') }}</h6>
                                    <div class="gray-inp mt-4"
                                        v-for="(item, index) in (getUserNotificationsData.notifications?.data || [])">
                                        <div class=" p-2 row">
                                            <div class="col-3 ">
                                                <div class="notification_icon_div px-1 py-3 mx-0 d-flex align-items-center justify-content-center"
                                                    style="background: #E5F2ED;">

                                                    <svg v-if="item.isRead" width="21" height="21" viewBox="0 0 21 21"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M9.795 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H15C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V9"
                                                            stroke="#F2851D" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path
                                                            d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z"
                                                            stroke="#F2851D" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path d="M16 14.496V16L17 17M13 1V5V1ZM5 1V5V1ZM1 9H17H1Z"
                                                            stroke="#F2851D" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>
                                                    <svg v-else width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M9.795 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H15C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V9"
                                                            stroke="#47D697" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path
                                                            d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z"
                                                            stroke="#47D697" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path d="M16 14.496V16L17 17M13 1V5V1ZM5 1V5V1ZM1 9H17H1Z"
                                                            stroke="#47D697" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>

                                                </div>
                                            </div>
                                            <div class="col-8 ps-0 ">
                                                <span class="gray_text">{{ item.title }}</span>
                                                <!-- <p class="gray_text">اليوم 19:10</p> -->
                                                <p class="gray_text">{{ formatDateTime(item.createdAt) }}</p>
                                            </div>
                                            <p class="gray_text">{{ item.message }}</p>
                                        </div>
                                    </div>
                                    <!-- <div class="gray-inp mt-2">
                                        <div class=" p-2 row">
                                            <div class="col-3 ">
                                                <div class="notification_icon_div px-1 py-3 mx-0 d-flex align-items-center justify-content-center"
                                                    style="background: #F4EFE9;">
                                                    <svg  width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M9.795 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H15C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V9"
                                                            stroke="#F2851D" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path
                                                            d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z"
                                                            stroke="#F2851D" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path d="M16 14.496V16L17 17M13 1V5V1ZM5 1V5V1ZM1 9H17H1Z"
                                                            stroke="#F2851D" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>


                                                </div>
                                            </div>
                                            <div class="col-8 ps-0 ">
                                                <span class="gray_text">طلب قيد التنفيذ</span>
                                                <p class="gray_text">اليوم 19:10</p>
                                            </div>
                                            <p class="gray_text">تم انتقال طلب خدمة : طلب فندق بنجاح ، يرجى مراجعة
                                                تفاصيل الطلب .</p>

                                        </div>
                                    </div>
                                    <div class="gray-inp mt-2">
                                        <div class=" p-2 row">
                                            <div class="col-3 ">
                                                <div class="notification_icon_div px-1 py-3 mx-0 d-flex align-items-center justify-content-center"
                                                    style="background: #E3EAF5;">
                                                    <svg width="22" height="17" viewBox="0 0 22 17" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M11.2391 4.45192e-06C15.4598 4.45192e-06 18.9272 3.30134 19.513 7.58928H22L17.8152 12.6488L13.6304 7.58928H16.4043C16.1369 6.3511 15.4804 5.24543 14.5423 4.45285C13.6042 3.66026 12.4397 3.22757 11.2391 3.22545C9.50543 3.22545 7.975 4.12351 7.00652 5.47693L4.96196 3.01042C5.74453 2.06373 6.70962 1.30526 7.79235 0.786001C8.87507 0.266746 10.0503 -0.00125978 11.2391 4.45192e-06V4.45192e-06ZM10.7609 17C6.55217 17 3.07283 13.6986 2.48696 9.41071H0L4.18478 4.35119C5.5837 6.03348 6.97065 7.72842 8.36956 9.41071H5.59565C5.86314 10.6489 6.51955 11.7546 7.45769 12.5471C8.39583 13.3397 9.56028 13.7724 10.7609 13.7745C12.4946 13.7745 14.025 12.8765 14.9935 11.5231L17.038 13.9896C16.2562 14.9372 15.2913 15.6964 14.2084 16.2157C13.1255 16.735 11.9498 17.0025 10.7609 17V17Z"
                                                            fill="#0C65EB" />
                                                    </svg>



                                                </div>
                                            </div>
                                            <div class="col-8 ps-0 ">
                                                <span class="gray_text">تحديث التطبيق</span>
                                                <p class="gray_text">اليوم 19:10</p>
                                            </div>
                                            <p class="gray_text">تم تحديث نسخة التطبيق الى اصدار 12.1 يرجى التحديث.
                                            </p>

                                        </div>
                                    </div>
                                    <div class="gray-inp mt-2">
                                        <div class=" p-2 row">
                                            <div class="col-3 ">
                                                <div class="notification_icon_div px-1 py-3 mx-0 d-flex align-items-center justify-content-center"
                                                    style="background: #E5F2ED;">
                                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M9.795 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H15C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V9"
                                                            stroke="#47D697" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path
                                                            d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z"
                                                            stroke="#47D697" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                        <path d="M16 14.496V16L17 17M13 1V5V1ZM5 1V5V1ZM1 9H17H1Z"
                                                            stroke="#47D697" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round" />
                                                    </svg>

                                                </div>
                                            </div>
                                            <div class="col-8 ps-0 ">
                                                <span class="gray_text">طلب مكتمل</span>
                                                <p class="gray_text">اليوم 19:10</p>
                                            </div>
                                            <p class="gray_text">تهانينا ، تم الانتهاء من خدمة حجز فندق الامل بنجاح
                                                ، يرجى تقييم الاوتيل .</p>

                                        </div>
                                    </div> -->

                                </div>
                            </ul>
                        </div>

                    </li>
                    <li class="nav-item dropdown ms-2">
                        <a href="" class="dropdown-toggle px-3 py-2 align-items-center d-flex" id="navbarDropdown"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class=""
                                viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                            </svg>
                            <div class="img">
                                <img loading="lazy" :src="userImage" width="48" height="" class="profile-icon" alt="...">
                            </div>
                            <!-- {{ GetUserName }} -->
                        </a>
                        <ul class="dropdown-menu user-ul" aria-labelledby="navbarDropdown">
                            <li class="profile">
                                <a class="dropdown-item" v-on:click="goToProfileFunc()">
                                    {{ $t('navbar_profile') }}

                                </a>
                            </li>
                            <li class="log-out">
                                <a href="javascript:void(0)" class="dropdown-item" @click.prevent="logoutFunc()">
                                    {{ $t('navbar_logout') }}
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    </div>
</template>
<style scoped>
.dropdown-toggle svg {
    margin-left: 8px;
}

.dropdown-toggle svg path {
    fill: white !important;
    ;
}

.dropdown-toggle:hover svg path,
.dropdown-toggle:focus svg path {
    fill: var(--main-color) !important;
}

.dropdown-toggle::after {
    display: none;
}

.hero-notification-div svg path {
    fill: #fff;
}

.profile-icon {
    border-radius: 8px;
}
.header-div .navbar .sign-up a{
    background-color: var(--main-color);
    color: #fff;
}
.header-div .navbar .sign-up a:hover{
    background-color: #fff;
    color: #000;
}
.header-div .navbar .login a:hover{
    background-color: var(--main-color);
    color: #fff;
}
</style>
