//import * as Vue from "vue"
import { createApp } from 'vue';
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import Users from "./modules/Users/index";
import Code from "./modules/Code/index";
import Orders from "./modules/Orders/index";
import NotificationsAndMessages from "./modules/NotificationsAndMessages/index";
import Payment from "./modules/Payment/index";
import Roles from "./modules/Roles/index";
import Visit from "./modules/Visit/index";
import Vehicles from "./modules/Vehicles/index";

import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

const app = createApp();
app.use(Vuex);

const store = new Vuex.Store({
    state:{
        isLogged : false,
    },

    // getter for read
    getters : getters,
    // mutations for update and operation  like setter 
    mutations : mutations,
    // for custom function 
    actions : actions,
    
     modules :{
      Users,
      Code,
      Orders,
      NotificationsAndMessages,
      Visit,
      Payment,
      Roles,
      Vehicles,
     },

     plugins: [
        createPersistedState({
          paths: ['Users','Code','Orders','NotificationsAndMessages','Visit','Payment','Roles','Vehicles'],
        })
      ],
});

export default store;