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
        component: () => import('@/Views/main.vue')
    },
    {
        path: '/login',
        name: "login",
        component:  () => import('@/Views/User/login.vue')
    },
    {
        path: '/signUp',
        name: "signUp",
        component:  () => import('@/Views/User/signUp.vue')
    },
    {
        path: '/aboutus',
        name: "aboutus",
        component:  () => import('@/Views/aboutUs.vue')
    },
    {
        path: '/vehicles',
        name: "vehicles",
        component:  () => import('@/Views/vehicles.vue')
    },

    {
        path: '/sellers',
        name: "sellers",
        component:  () => import('@/Views/sellers.vue')
    },
    {
        path: '/vehicle/:slug',
        name: "vehicle",
        component:  () => import('@/Views/vehicle.vue')
    },
    {
        path: '/gallary/:slug',
        name: "gallary",
        component:  () => import('@/Views/gallary.vue')
    },
    {
        path: '/payment',
        name: "payment",
        component:  () => import('@/Views/payment.vue')
    },
    {
        path: '/pay_for_us',
        name: "pay_for_us",
        component:  () => import('@/Views/payForUs.vue')
    },
    {
        path: '/teckitfail',
        name: "teckitfail",
        component:  () => import('@/Views/Checkout/PaymentFail.vue')
    },
    {
        path: '/teckitsuccess',
        name: "teckitsuccess",
        component:  () => import('@/Views/Checkout/PaymentSuccess.vue'),
        props: route => ({ sessionId: route.query.sessionId }) // Pass sessionId as a prop
    },
    {
        path: '/profile',
        name: "profile",
        component:  () => import('@/Views/profile.vue'),
        children: [
            {
                path: '',
                name: "profile_profile",
                component:  () => import('@/Views/Profile/profile.vue')
            },
            {
                path: '/my_vehicles',
                name: "profile_my_vehicles",
                component:  () => import('@/Views/Profile/myVehicles.vue')
            },
            {
                path: '/ads_orders',
                name: "profile_ads_orders",
                component:  () => import('@/Views/Profile/Orders/ads_orders.vue')
            },
            {
                path: '/star_orders',
                name: "profile_star_orders",
                component:  () => import('@/Views/Profile/Orders/star_orders.vue')
            },
            {
                path: '/change_password',
                name: "profile_change_password",
                component:  () => import('@/Views/Profile/changePassword.vue')
            },
            {
                path: '/favorit',
                name: "profile_favorit",
                component:  () => import('@/Views/Profile/favorit.vue')
            },
            {
                path: '/payment_operation',
                name: "profile_Payment",
                component:  () => import('@/Views/Profile/PaymentOperations.vue')
            },
            {
                path: '/add_vehicle',
                name: "profile_add_vehicle",
                component:  () => import('@/Views/Profile/add_vehicle.vue')
            },
             {
                path: '/update_vehicle',
                name: "profile_update_vehicle",
                component:  () => import('@/Views/Profile/update_vehicle.vue')
            },
            {
                path: '/add_ads',
                name: "profile_add_ads",
                component:  () => import('@/Views/Profile/add_ads.vue')
            },
           
        ]
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
    // Optimize scroll behavior
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { 
                top: 0,
                behavior: 'smooth' // Smooth scroll for better UX
            };
        }
    }
});

export default router 