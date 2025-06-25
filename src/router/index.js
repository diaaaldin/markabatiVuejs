import { createRouter, createWebHistory } from 'vue-router'

// user
import login from '@/Views/User/login.vue'
import signUp from '@/Views/User/signUp.vue'

//profile
import profile from '@/Views/profile.vue'
import profile_profile from '@/Views/Profile/profile.vue'
import profile_my_vehicles from '@/Views/Profile/myVehicles.vue'
import profile_announcement_orders from '@/Views/Profile/Orders/announcementOrders.vue'
import profile_star_orders from '@/Views/Profile/Orders/starOrders.vue'
import profile_change_password from '@/Views/Profile/changePassword.vue'
import profile_favorit from '@/Views/Profile/favorit.vue'
import profile_Payment from '@/Views/Profile/PaymentOperations.vue'

//announcement
import add_announcement from '@/Views/Announcement/addAnnouncement.vue'
import update_announcement from '@/Views/Announcement/updateAnnouncement.vue'

//vehicle
import add_vehicle from '@/Views/Vehicle/addVehicle.vue'
import update_vehicle from '@/Views/Vehicle/updateVehicle.vue'

//main
import main from '@/Views/main.vue'
import aboutus from '@/Views/aboutUs.vue'
import seller from '@/Views/seller.vue'
import sellers from '@/Views/sellers.vue'
import vehicle from '@/Views/vehicle.vue'
import vehicles from '@/Views/vehicles.vue'
import gallary from '@/Views/gallary.vue'

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
        path: '/seller/:slug',
        name: "seller",
        component: seller
    },
    {
        path: '/sellers',
        name: "sellers",
        component: sellers
    },
    {
        path: '/vehicle',
        name: "vehicle",
        component: vehicle
    },
    {
        path: '/gallary',
        name: "gallary",
        component: gallary
    },

    {
        path: '/add_announcement',
        name: "add_announcement",
        component: add_announcement
    },
    {
        path: '/update_announcement',
        name: "update_announcement",
        component: update_announcement
    },
    {
        path: '/add_vehicle',
        name: "add_vehicle",
        component: add_vehicle
    },
    {
        path: '/update_vehicle',
        name: "update_vehicle",
        component: update_vehicle
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
                path: '/announcement_orders',
                name: "profile_announcement_orders",
                component: profile_announcement_orders
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
                path: '/PaymentOperations',
                name: "profile_Payment",
                component: profile_Payment
            },
           
        ]
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
      // to scroll to the top if any route happen
    //   scrollBehavior(to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition;
    //     } else {
    //         return { left: 0, top: 0 }; // Always scroll to the top
    //     }
    // }
});

export default router 