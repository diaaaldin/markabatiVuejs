<script>
import { useHead } from '@vueuse/head'
import { mapState, mapGetters, mapActions } from "vuex";

import profileHeader from '@/components/Profile/profileHeader.vue';
import profileSideMenu from '@/components/Profile/profileSideMenu.vue';
import profileNav from '@/components/darkNavbar.vue';
import pageFooter from '@/components/footer.vue';
import pageNav from '@/components/lightNavbar.vue';
import { UserTypeEnum } from '@/config/config';


export default {

    data() {
        return {

        }
    },
    mounted() {
        useHead({
            title: 'Profile | Markabati',
            meta: [
                {
                    name: `description`,
                    content: 'Markabati is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties.',
                },
            ],
        });

    },
    components: {
        profileHeader,
        profileNav,
        profileSideMenu,
        pageFooter,
        pageNav
    },

    emits: {

    },

    created() {
        // Call the function from the store directly when the component is created

    },

    computed: {
        ...mapGetters("Users", ["getUserData"]),
        userImage() {
            const imageUrl = this.getUserData && this.getUserData.image
                ? this.getUserData.image
                : "/img/profile-icon.png";

            return imageUrl;
        }
    },
    methods: {
        ...mapActions("Users", ["CustomerProfileInfo", "CompanyProfileInfo" ]),

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

            if ( localStorage.getItem('userType') == UserTypeEnum.Normal) {
                this.CustomerProfileInfo(id).then(Response => {
                    // this.setData();
                    loading.close();
                }).catch(error => {
                    if (error.response && error.response.status === 401) {
                        this.$moshaToast(this.$t('general_user_not_allow_error_message'), {
                            hideProgressBar: 'false',
                            position: 'top-center',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'warning',
                            timeout: 3000,
                        });
                    } else {
                        // Handle other errors with the provided message from the response
                        this.$moshaToast(error.response?.data?.message || 'An error occurred', {
                            hideProgressBar: 'false',
                            position: 'top-center',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'warning',  // Default type is 'warning'
                            timeout: 3000,
                        });
                    }
                    loading.close();
                });
            } else {
                this.CompanyProfileInfo(id).then(Response => {
                    // this.setData();
                    loading.close();
                }).catch(error => {
                    if (error.response && error.response.status === 401) {
                        this.$moshaToast(this.$t('general_user_not_allow_error_message'), {
                            hideProgressBar: 'false',
                            position: 'top-center',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'warning',
                            timeout: 3000,
                        });
                    } else {
                        // Handle other errors with the provided message from the response
                        this.$moshaToast(error.response?.data?.message || 'An error occurred', {
                            hideProgressBar: 'false',
                            position: 'top-center',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'warning',  // Default type is 'warning'
                            timeout: 3000,
                        });
                    }
                    loading.close();
                });
            }
        },
    }
};
</script>
<template>
    <pageNav></pageNav>
    <div class="bread">
        <nav>
            <div class="container">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item" :class="{ active: $route.path === '/' }">
                        <router-link :to="{ name: 'main' }"> {{ $t('location_menu_main') }} </router-link>
                    </li>
                    <li v-if="$route.path === '/profile'" class="breadcrumb-item active" aria-current="page">
                        {{ $t('location_menu_profile') }}
                    </li>
                    <li v-else class="breadcrumb-item" aria-current="page"
                        :class="{ active: $route.path === '/profile' }">
                        <router-link :to="{ name: 'profile_profile' }"> {{ $t('location_menu_profile') }} </router-link>
                    </li>
                    <li v-if="$route.path === '/my_vehicles'" class="breadcrumb-item active" aria-current="page">
                        {{ $t('location_menu_my_vehicles') }}
                    </li>
                    <li v-if="$route.path === '/update_vehicle'" class="breadcrumb-item">
                        <router-link :to="{ name: 'profile_my_vehicles' }"> {{ $t('location_menu_my_vehicles') }}
                        </router-link>
                    </li>
                    <li v-if="$route.path === '/favorit'" class="breadcrumb-item active" aria-current="page">
                        {{ $t('location_menu_favorite') }}
                    </li>
                    <li v-if="$route.path === '/ads_orders'" class="breadcrumb-item active" aria-current="page">
                        {{ $t('location_menu_ads_orders') }}
                    </li>
                    <li v-if="$route.path === '/star_orders'" class="breadcrumb-item active" aria-current="page">
                        {{ $t('location_menu_star_orders') }}
                    </li>
                    <li v-if="$route.path === '/payment_operation'" class="breadcrumb-item active" aria-current="page">
                        {{ $t('location_menu_payment_operations') }}
                    </li>
                    <li v-if="$route.path === '/change_password'" class="breadcrumb-item active" aria-current="page">
                        {{ $t('location_menu_change_password') }}
                    </li>

                    <li v-if="$route.path === '/add_vehicle'" class="breadcrumb-item active" aria-current="page">
                        {{ $t('location_menu_add_vehicle') }}
                    </li>
                    <li v-if="$route.path === '/update_vehicle'" class="breadcrumb-item active" aria-current="page">
                        {{ $t('location_menu_update_vehicle') }}
                    </li>

                    <li v-if="$route.path === '/add_ads'" class="breadcrumb-item active" aria-current="page">
                        {{ $t('location_menu_add_ads') }}
                    </li>
                </ol>

            </div>
        </nav>
    </div>

    <section class="profile mt-5">
        <div class="container">
            <div class="row mt-5 h-100 ">
                <!-- start left side list -->
                <profileSideMenu></profileSideMenu>
                <!-- end left side list  -->
                <!-- right side container -->
                <router-view />
                <!-- end right side  -->
            </div>
        </div>
    </section>

    <pageFooter></pageFooter>
</template>
<style scoped></style>