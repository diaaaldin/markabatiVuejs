import { createRouter, createWebHistory } from 'vue-router'

// user
import login from '@/Views/User/login.vue'
import signUp from '@/Views/User/signUp.vue'

//profile
import profile from '@/Views/profile.vue'
import profile_profile from '@/Views/Profile/profile.vue'
import profile_my_vehicles from '@/Views/Profile/myVehicles.vue'
import profile_ads_orders from '@/Views/Profile/Orders/ads_orders.vue'
import profile_star_orders from '@/Views/Profile/Orders/star_orders.vue'
import profile_change_password from '@/Views/Profile/changePassword.vue'
import profile_favorit from '@/Views/Profile/favorit.vue'
import profile_Payment from '@/Views/Profile/PaymentOperations.vue'

import profile_add_vehicle from '@/Views/Profile/add_vehicle.vue'
import profile_update_vehicle from '@/Views/Profile/update_vehicle.vue'
import profile_add_ads from '@/Views/Profile/add_ads.vue'


//announcement
import add_announcement from '@/Views/Announcement/addAnnouncement.vue'
import update_announcement from '@/Views/Announcement/updateAnnouncement.vue'

//vehicle
// import add_vehicle from '@/Views/Vehicle/add_vehicle.vue'
// import update_vehicle from '@/Views/Vehicle/updateVehicle.vue'

//main
import main from '@/Views/main.vue'
import aboutus from '@/Views/aboutUs.vue'
import sellers from '@/Views/sellers.vue'
import vehicle from '@/Views/vehicle.vue'
import vehicles from '@/Views/vehicles.vue'
import gallary from '@/Views/gallary.vue'
import payment from '@/Views/payment.vue'
import pay_for_us from '@/Views/payForUs.vue'

import teckitsuccess from '@/Views/Checkout/PaymentSuccess.vue'
import teckitfail from '@/Views/Checkout/PaymentFail.vue'



const routes = [
    {
        path: '/',
        name: "main",
        component: main
    },
    {
        path: '/login',
        name: "login",
        component: login
    },
    {
        path: '/signUp',
        name: "signUp",
        component: signUp
    },
    {
        path: '/aboutus',
        name: "aboutus",
        component: aboutus
    },
    {
        path: '/vehicles',
        name: "vehicles",
        component: vehicles
    },

    {
        path: '/sellers',
        name: "sellers",
        component: sellers
    },
    {
        path: '/vehicle/:slug',
        name: "vehicle",
        component: vehicle
    },
    {
        path: '/gallary/:slug',
        name: "gallary",
        component: gallary
    },
    {
        path: '/payment',
        name: "payment",
        component: payment
    },
    {
        path: '/pay_for_us',
        name: "pay_for_us",
        component: pay_for_us
    },
    {
        path: '/teckitfail',
        name: "teckitfail",
        component: teckitfail
    },
    {
        path: '/teckitsuccess',
        name: "teckitsuccess",
        component: teckitsuccess,
        props: route => ({ sessionId: route.query.sessionId }) // Pass sessionId as a prop
    },
    {
        path: '/profile',
        name: "profile",
        component: profile,
        children: [
            {
                path: '',
                name: "profile_profile",
                component: profile_profile
            },
            {
                path: '/my_vehicles',
                name: "profile_my_vehicles",
                component: profile_my_vehicles
            },
            {
                path: '/ads_orders',
                name: "profile_ads_orders",
                component: profile_ads_orders
            },
            {
                path: '/star_orders',
                name: "profile_star_orders",
                component: profile_star_orders
            },
            {
                path: '/change_password',
                name: "profile_change_password",
                component: profile_change_password
            },
            {
                path: '/favorit',
                name: "profile_favorit",
                component: profile_favorit
            },
            {
                path: '/payment_operation',
                name: "profile_Payment",
                component: profile_Payment
            },
            {
                path: '/add_vehicle',
                name: "profile_add_vehicle",
                component: profile_add_vehicle
            },
             {
                path: '/update_vehicle',
                name: "profile_update_vehicle",
                component: profile_update_vehicle
            },
            {
                path: '/add_ads',
                name: "profile_add_ads",
                component: profile_add_ads
            },
           
        ]
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
    
      // to scroll to the top if any route happen
      scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {  top: 0 }; // Always scroll to the top
        }
    }
});

export default router 