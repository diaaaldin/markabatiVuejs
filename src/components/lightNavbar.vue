<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Urls } from '@/config/config';

export default {
    data() {
        return {

        dashUrl :{
            login : Urls.login,
            addProduct :Urls.addProduct ,
            addEvent :Urls.addEvent ,
            storeSignup : Urls.storeSignup,
            companySignup :Urls.companySignup ,
            partnerSignup :Urls.partnerSignup ,
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
        // this.GetStatistics();

    },

    computed: {
        // ...mapGetters("Services", ["getStatisticsData"]),
        GetUserName() {
            const name = this.getUserLoginName;// just for loud this function again when name change
            let userName = localStorage.getItem("userName");
            if (userName == null) {
                return "";
            } else {
                return userName;
            }
        },
    },
    methods: {
        ...mapActions("Users", ["CustomerProfileInfo"]),
        goToProfileFunc() {
            if (!this.isTokenValid()) {
                this.$router.push({ name: 'login' });
            } else {
                let email = localStorage.getItem("email");
                // this.CustomerProfileInfo(email).then(Response => {
                    this.$router.push({ name: 'profile' });
                // })
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
            //window.location.reload();
            /// refresh page
        },
        
    }
};
</script>
<template>
    <div class="header-div second">
        <nav class="navbar navbar-expand-lg navbar-expand-lg">
            <div class="container">

                <div class="navbar-brand">

                    <router-link to="/">
                        <img src="/img/logo.png" width="100" alt="" />
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
                            <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }"> {{ $t('navbar_main') }}</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/vehicles" class="nav-link" :class="{ active: $route.path === '/vehicles' }"> {{ $t('navbar_vehicles') }} </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/sellers" class="nav-link" :class="{ active: $route.path === '/sellers' }"> {{ $t('navbar_sellers') }} </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/aboutus" class="nav-link" :class="{ active: $route.path === '/aboutus' }"> {{ $t('navbar_aboutus') }}  </router-link>
                        </li>
                    </ul>

                       <ul v-if="GetUserName == ''"
                        class="nav align-items-center mb-2 mb-lg-0 white-header justify-content-center gradiant_nav">
                        <li class="nav-item login">
                            <router-link to="/login" class="px-3 py-2 align-items-center d-flex login-btn"> {{ $t('navbar_login') }} </router-link>
                        </li>
                        <li class="nav-item sign-up">
                            <router-link to="/signUp" class="px-3 py-2 align-items-center d-flex login-btn">{{ $t('navbar_signup') }}</router-link>
                        </li>
                    </ul>

                    <ul v-else
                            class="nav align-items-center mb-2 mb-lg-0 white-header justify-content-center gradiant_nav">
                            <li class="nav-item dropdown ms-2">
                                <a href="" class="dropdown-toggle px-3 py-2 align-items-center d-flex login-btn"
                                    id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div class="img">
                                        <img src="/img/profile-icon.png" class="" alt="...">
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
                                        <a href="" class="dropdown-item" v-on:click="logoutFunc()">
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

</style>