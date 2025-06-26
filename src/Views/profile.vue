<script>
import { useHead } from '@vueuse/head'
import { mapState, mapGetters, mapActions } from "vuex";

import profileHeader from '@/components/Profile/profileHeader.vue';
import profileSideMenu from '@/components/Profile/profileSideMenu.vue';
import profileNav from '@/components/darkNavbar.vue';
import pageFooter from '@/components/footer.vue';

import pageNav from '@/components/lightNavbar.vue';

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
        //...mapGetters(),
        //...mapGetters(),
    },
    methods: {
        //...mapActions(),
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
                    
                    <li class="breadcrumb-item active" aria-current="page">الصفحة الشخصية</li>
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