<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
    activeDropdown: null    }
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
    // console.log("this.getProfileData : ", this.getProfileData);
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
    // ...mapActions("Services", ["GetStatistics"]),
    logOutFunc() {
      localStorage.clear();
      this.$router.push({ name: 'main' });
    },

    toggleDropdown(menu) {
      this.activeDropdown = this.activeDropdown === menu ? null : menu;
    }
  }
};
</script>
<template>
  <!--    start left side list          -->
  <div class="col-12 col-lg-3 h-100 left-side">
    <ul class="list-group list-group-flush white_card_collapse_top">
      <li class="list-group-item">
        <div class="d-flex justify-content-between align-items-center py-2">
          <div class="justify-content-start d-flex">
            <div class="d-flex align-items-center ">
              <img :src="userImage" class="img-fluid hero-profile-pic1" alt="profile pic">
              <div class="d-flex flex-column">

                <router-link to="/profile" class="list_link ms-2" style="color: black">ضياء</router-link>

                <div class=" align-items-center d-flex ms-2">
                  <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="3.5" cy="3.5" r="3.5" fill="#0AB905" />
                  </svg>
                  <span class="gray_text ms-1 " style="font-size: 10px">حساب نشط </span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </li>
    </ul>

    <div class="collapse d-lg-block " id="collapseExample">
      <ul class="list-group list-group-flush white_card_collapse_bottom h-100">
        <li class="list-group-item" :class="{ active: $route.path === '/profile' }">
          <div class="d-flex justify-content-between align-items-center py-2">
            <div class="justify-content-start  d-flex">
              <div class="d-flex align-items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 7.8C4 6.11984 4 5.27976 4.32698 4.63803C4.6146 4.07354 5.07354 3.6146 5.63803 3.32698C6.27976 3 7.11984 3 8.8 3H15.2C16.8802 3 17.7202 3 18.362 3.32698C18.9265 3.6146 19.3854 4.07354 19.673 4.63803C20 5.27976 20 6.11984 20 7.8V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V7.8Z"
                    fill="#26d829" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10ZM13 8C12.4477 8 12 8.44772 12 9C12 9.55228 12.4477 10 13 10H15C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8H13ZM13 12C12.4477 12 12 12.4477 12 13C12 13.5523 12.4477 14 13 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12H13ZM12 17C12 16.4477 12.4477 16 13 16H15C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H13C12.4477 18 12 17.5523 12 17ZM10 13C10 13.5523 9.55228 14 9 14C8.44772 14 8 13.5523 8 13C8 12.4477 8.44772 12 9 12C9.55228 12 10 12.4477 10 13ZM9 18C9.55228 18 10 17.5523 10 17C10 16.4477 9.55228 16 9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18Z"
                    fill="#26d829" />
                  <path
                    d="M9 3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4V3Z"
                    fill="#26d829" />
                </svg>
                <router-link to="/profile" class="list_link ms-2"> {{ $t('profile_sidemenu_profile') }}  </router-link>
              </div>
            </div>
            <div class="justify-content-end  d-flex">
               <svg  class="arrow" height="14px" width="14px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492 492" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12 C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084 c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864 l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"></path> </g> </g> </g></svg>
            </div>
          </div>
        </li>
        <li class="list-group-item " :class="{ active: $route.path === '/my_vehicles' }">
          <div class="d-flex justify-content-between align-items-center py-2">
            <div class="justify-content-start  d-flex">
              <div class="d-flex align-items-center">
             
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                    <path  d="M22.1796 13.66C22.0296 12.01 21.5896 10.25 18.3796 10.25H5.6196C2.4096 10.25 1.9796 12.01 1.8196 13.66L1.2596 19.75C1.1896 20.51 1.4396 21.27 1.9596 21.84C2.4896 22.42 3.2396 22.75 4.0396 22.75H5.9196C7.5396 22.75 7.8496 21.82 8.0496 21.21L8.2496 20.61C8.4796 19.92 8.5396 19.75 9.4396 19.75H14.5596C15.4596 19.75 15.4896 19.85 15.7496 20.61L15.9496 21.21C16.1496 21.82 16.4596 22.75 18.0796 22.75H19.9596C20.7496 22.75 21.5096 22.42 22.0396 21.84C22.5596 21.27 22.8096 20.51 22.7396 19.75L22.1796 13.66Z"
                     fill="#26d829"></path> 
                     <path d="M21 7.25008H20C19.99 7.25008 19.99 7.25008 19.98 7.25008L19.6 5.44008C19.24 3.69008 18.49 2.08008 15.51 2.08008H12.75H11.25H8.49C5.51 2.08008 4.76 3.69008 4.4 5.44008L4.02 7.25008C4.01 7.25008 4.01 7.25008 4 7.25008H3C2.59 7.25008 2.25 7.59008 2.25 8.00008C2.25 8.41008 2.59 8.75008 3 8.75008H3.71L3.29 10.7501C3.83 10.4401 4.58 10.2501 5.62 10.2501H18.38C19.42 10.2501 20.17 10.4401 20.71 10.7501L20.29 8.75008H21C21.41 8.75008 21.75 8.41008 21.75 8.00008C21.75 7.59008 21.41 7.25008 21 7.25008Z"
                      fill="#26d829"></path> 
                      <path d="M9 15.75H6C5.59 15.75 5.25 15.41 5.25 15C5.25 14.59 5.59 14.25 6 14.25H9C9.41 14.25 9.75 14.59 9.75 15C9.75 15.41 9.41 15.75 9 15.75Z" 
                      fill="#26d829"></path> 
                      <path d="M18 15.75H15C14.59 15.75 14.25 15.41 14.25 15C14.25 14.59 14.59 14.25 15 14.25H18C18.41 14.25 18.75 14.59 18.75 15C18.75 15.41 18.41 15.75 18 15.75Z"
                   fill="#26d829"></path> </g></svg>
                <router-link to="/my_vehicles" class="list_link ms-2"> {{ $t('profile_sidemenu_vehicles') }} </router-link>
              </div>
            </div>
            <div class="justify-content-end  d-flex">
              <svg  class="arrow" height="14px" width="14px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492 492" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12 C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084 c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864 l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"></path> </g> </g> </g></svg>
            </div>
          </div>
        </li>

        <li class="list-group-item" :class="{ active: $route.path === '/favorit' }">
          <div class="d-flex justify-content-between align-items-center py-2">
            <div class="justify-content-start  d-flex">
              <div class="d-flex align-items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 2C5.79086 2 4 3.79087 4 6V20.0008C4 21.6842 5.95294 22.6146 7.26018 21.5538L11.3699 18.2191C11.7371 17.9211 12.2629 17.9211 12.6301 18.2191L16.7398 21.5538C18.047 22.6146 19.9999 21.6842 19.9999 20.0008V6C19.9999 3.79086 18.2091 2 15.9999 2H8Z"
                    fill="#26d829" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M15.7071 7.29289C16.0976 7.68342 16.0976 8.31658 15.7071 8.70711L11.7071 12.7071C11.3166 13.0976 10.6834 13.0976 10.2929 12.7071L8.29289 10.7071C7.90237 10.3166 7.90237 9.68342 8.29289 9.29289C8.68342 8.90237 9.31658 8.90237 9.70711 9.29289L11 10.5858L14.2929 7.29289C14.6834 6.90237 15.3166 6.90237 15.7071 7.29289Z"
                    fill="#26d829" />
                </svg>
                <router-link to="/favorit" class="list_link ms-2"> {{ $t('profile_sidemenu_favorite') }} </router-link>
              </div>
            </div>
            <div class="justify-content-end  d-flex">
               <svg  class="arrow" height="14px" width="14px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492 492" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12 C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084 c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864 l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"></path> </g> </g> </g></svg>
          </div>
          </div>
        </li>

<li class="list-group-item dropdown_list"
    :class="{ active: activeDropdown === 'orders' }"
    @click="toggleDropdown('orders')">
              <div class="d-flex justify-content-between align-items-center py-2">
            <div class="justify-content-start  d-flex">
              <div class="d-flex align-items-center">
               <svg viewBox="0 0 24 24" height="24px" width="24px" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.5 4.5H7.25V2C7.25 1.59 6.91 1.25 6.5 1.25C6.09 1.25 5.75 1.59 5.75 2V4.5H5.5C3.91 4.5 3 5.41 3 7V13C3 14.59 3.91 15.5 5.5 15.5H5.75V22C5.75 22.41 6.09 22.75 6.5 22.75C6.91 22.75 7.25 22.41 7.25 22V15.5H7.5C9.09 15.5 10 14.59 10 13V7C10 5.41 9.09 4.5 7.5 4.5Z" 
                  fill="none"></path> <path d="M18.5 8.5H18.25V2C18.25 1.59 17.91 1.25 17.5 1.25C17.09 1.25 16.75 1.59 16.75 2V8.5H16.5C14.91 8.5 14 9.41 14 11V17C14 18.59 14.91 19.5 16.5 19.5H16.75V22C16.75 22.41 17.09 22.75 17.5 22.75C17.91 22.75 18.25 22.41 18.25 22V19.5H18.5C20.09 19.5 21 18.59 21 17V11C21 9.41 20.09 8.5 18.5 8.5Z"
                 fill="#26d829"></path> </g></svg>
                <a class="list_link ms-2"> {{ $t('profile_sidemenu_orders') }} </a>
              </div>
            </div>
            <div class="justify-content-end  d-flex">
               <svg  class="arrow" :class="{ rotate: activeDropdown === 'orders' }" height="14px" width="14px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492 492" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12 C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084 c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864 l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"></path> </g> </g> </g></svg>
            </div>
          </div>
        </li>

      <li v-if="activeDropdown === 'orders'" class="list-group-item ps-4">
        <div class="justify-content-start  d-flex">
              <div class="d-flex align-items-center">
               <svg viewBox="0 0 24 24" width="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M18 9.32993V14.6699C18 17.9899 15.65 19.3399 12.78 17.6899L11.5 16.9499C11.19 16.7699 11 16.4399 11 16.0799V7.91993C11 7.55993 11.19 7.22993 11.5 7.04993L12.78 6.30992C15.65 4.65992 18 6.00993 18 9.32993Z" fill="#26d829"></path> <path  d="M10.0005 8.79006V15.2201C10.0005 15.6101 9.58055 15.8501 9.25055 15.6501L8.15055 15.0101C5.28055 13.3601 5.28055 10.6401 8.15055 8.99006L9.25055 8.35006C9.58055 8.16006 10.0005 8.40006 10.0005 8.79006Z" fill="#26d829"></path> </g></svg>
                <router-link to="/ads_orders"  class="list_link">{{ $t('profile_sidemenu_orders_ads') }}</router-link>
              </div>
          </div>
      </li>
      <li v-if="activeDropdown === 'orders'" class="list-group-item ps-4">
              <div class="justify-content-start  d-flex">
              <div class="d-flex align-items-center">
               <svg viewBox="0 0 24 24" width="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M18 9.32993V14.6699C18 17.9899 15.65 19.3399 12.78 17.6899L11.5 16.9499C11.19 16.7699 11 16.4399 11 16.0799V7.91993C11 7.55993 11.19 7.22993 11.5 7.04993L12.78 6.30992C15.65 4.65992 18 6.00993 18 9.32993Z" fill="#26d829"></path> <path  d="M10.0005 8.79006V15.2201C10.0005 15.6101 9.58055 15.8501 9.25055 15.6501L8.15055 15.0101C5.28055 13.3601 5.28055 10.6401 8.15055 8.99006L9.25055 8.35006C9.58055 8.16006 10.0005 8.40006 10.0005 8.79006Z" fill="#26d829"></path> </g></svg>
                <router-link to="/star_orders" class="list_link">{{ $t('profile_sidemenu_orders_star') }}</router-link>
              </div>
          </div>      
    </li>
 <li class="list-group-item" :class="{ active: $route.path === '/payment_operation' }">
          <div class="d-flex justify-content-between align-items-center py-2">
            <div class="justify-content-start  d-flex">
              <div class="d-flex align-items-center">
                <svg viewBox="0 0 24 24" width="24" height="24"  fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z" 
                  fill="#26d829"></path> <path d="M14.85 3.95012V7.75011H6.26C4.19 7.75011 2.5 9.44012 2.5 11.5101V7.84014C2.5 6.65014 3.23 5.59009 4.34 5.17009L12.28 2.17009C13.52 1.71009 14.85 2.62012 14.85 3.95012Z" 
                  fill="#26d829"></path> <path d="M22.5608 13.9702V16.0302C22.5608 16.5802 22.1208 17.0302 21.5608 17.0502H19.6008C18.5208 17.0502 17.5308 16.2602 17.4408 15.1802C17.3808 14.5502 17.6208 13.9602 18.0408 13.5502C18.4108 13.1702 18.9208 12.9502 19.4808 12.9502H21.5608C22.1208 12.9702 22.5608 13.4202 22.5608 13.9702Z" 
                  fill="#26d829"></path> <path d="M14 12.75H7C6.59 12.75 6.25 12.41 6.25 12C6.25 11.59 6.59 11.25 7 11.25H14C14.41 11.25 14.75 11.59 14.75 12C14.75 12.41 14.41 12.75 14 12.75Z" 
                  fill="#26d829"></path> </g></svg>
                <router-link to="/payment_operation" class="list_link ms-2"> {{ $t('profile_sidemenu_payment_operation') }} </router-link>
              </div>
            </div>
            <div class="justify-content-end  d-flex">
               <svg  class="arrow" height="14px" width="14px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492 492" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12 C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084 c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864 l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"></path> </g> </g> </g></svg>
          </div>
          </div>
        </li>

    
        <li class="list-group-item" :class="{ active: $route.path === '/change_password' }">
          <div class="d-flex justify-content-between align-items-center py-2">
            <div class="justify-content-start  d-flex">
              <div class="d-flex align-items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M10.0001 3.5C10.0001 2.67157 10.6716 2 11.5001 2H12.5001C13.3285 2 14.0001 2.67157 14.0001 3.5V3.86445C14.0001 4.09259 14.155 4.29021 14.3729 4.35779C14.8439 4.50387 15.2962 4.69228 15.7255 4.91859C15.9274 5.025 16.1767 4.99485 16.3381 4.8335L16.5962 4.57538C17.182 3.98959 18.1317 3.98959 18.7175 4.57538L19.4246 5.28249C20.0104 5.86827 20.0104 6.81802 19.4246 7.40381L19.1665 7.66193C19.0052 7.82328 18.975 8.07264 19.0814 8.27449C19.3077 8.70378 19.4961 9.15614 19.6422 9.62713C19.7098 9.84503 19.9074 10 20.1356 10H20.5C21.3284 10 22 10.6716 22 11.5V12.5C22 13.3284 21.3284 14 20.5 14H20.1356C19.9074 14 19.7098 14.155 19.6422 14.3729C19.4961 14.8439 19.3077 15.2962 19.0814 15.7255C18.975 15.9274 19.0052 16.1767 19.1665 16.3381L19.4246 16.5962C20.0104 17.182 20.0104 18.1317 19.4246 18.7175L18.7175 19.4246C18.1317 20.0104 17.182 20.0104 16.5962 19.4246L16.3381 19.1665C16.1767 19.0052 15.9274 18.975 15.7255 19.0814C15.2962 19.3077 14.8439 19.4961 14.3729 19.6422C14.155 19.7098 14.0001 19.9074 14.0001 20.1355V20.5C14.0001 21.3284 13.3285 22 12.5001 22H11.5001C10.6716 22 10.0001 21.3284 10.0001 20.5V20.1356C10.0001 19.9074 9.84509 19.7098 9.62719 19.6422C9.15618 19.4962 8.70379 19.3077 8.27449 19.0814C8.07264 18.975 7.82327 19.0052 7.66192 19.1665L7.40381 19.4246C6.81802 20.0104 5.86827 20.0104 5.28249 19.4246L4.57538 18.7175C3.98959 18.1317 3.98959 17.182 4.57538 16.5962L4.8335 16.3381C4.99485 16.1767 5.025 15.9274 4.91859 15.7255C4.69227 15.2962 4.50385 14.8439 4.35777 14.3729C4.29019 14.155 4.09257 14 3.86443 14H3.5C2.67157 14 2 13.3284 2 12.5V11.5C2 10.6716 2.67157 10 3.5 10H3.86443C4.09257 10 4.29019 9.84503 4.35778 9.62713C4.50385 9.15614 4.69227 8.70378 4.91859 8.27449C5.025 8.07264 4.99485 7.82327 4.8335 7.66193L4.57538 7.40381C3.98959 6.81802 3.98959 5.86827 4.57538 5.28249L5.28249 4.57538C5.86827 3.98959 6.81802 3.98959 7.40381 4.57538L7.66193 4.8335C7.82327 4.99485 8.07264 5.025 8.27449 4.91859C8.70379 4.69226 9.15618 4.50384 9.62719 4.35776C9.84509 4.29017 10.0001 4.09255 10.0001 3.86441V3.5Z"
                    fill="#26d829" />
                  <path
                    d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                    fill="#26d829" />
                </svg>

                <router-link to="/change_password" class="list_link ms-2"> {{ $t('profile_sidemenu_change_password') }} </router-link>
              </div>
            </div>
            <div class="justify-content-end  d-flex">
               <svg  class="arrow" height="14px" width="14px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492 492" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12 C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084 c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864 l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"></path> </g> </g> </g></svg>

            </div>
          </div>
        </li>

        <li class="list-group-item mt-lg-5">
          <div class="d-flex justify-content-between align-items-center py-2">
            <div class="justify-content-start  d-flex">
              <div class="d-flex align-items-center">
                <svg width="24" height="24" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.85 2.70332V10.2966C0.85 11.4258 1.77072 12.3465 2.89986 12.3465H9.03692C10.1661 12.3465 11.0868 11.4258 11.0868 10.2966V9.06677C11.0868 8.7759 10.8514 8.54047 10.5605 8.54047C10.2696 8.54047 10.0342 8.7759 10.0342 9.06677V10.2966C10.0342 10.8471 9.5843 11.297 9.03386 11.297H2.89986C2.34941 11.297 1.89954 10.8471 1.89954 10.2966V2.70332C1.89954 2.15288 2.34941 1.70301 2.89986 1.70301H9.03692C9.58736 1.70301 10.0372 2.15288 10.0372 2.70332V3.93318C10.0372 4.22406 10.2727 4.45948 10.5635 4.45948C10.8544 4.45948 11.0898 4.22406 11.0898 3.93318V2.70332C11.0898 1.57418 10.1691 0.653467 9.03998 0.653467H2.89986C1.77087 0.653467 0.85 1.57097 0.85 2.70332Z"
                    fill="#ff0101" stroke="#ff0101" stroke-width="0.1" />
                  <path
                    d="M12.6848 9.43595C12.7873 9.53847 12.9207 9.59002 13.057 9.59002C13.1933 9.59002 13.3267 9.53847 13.4292 9.43595L15.996 6.86915C16.2014 6.66372 16.2014 6.33318 15.996 6.12775L13.4292 3.56096C13.2238 3.35553 12.8932 3.35553 12.6878 3.56096C12.4824 3.76638 12.4824 4.09693 12.6878 4.30236L14.3591 5.97368H7.68782C7.39695 5.97368 7.16152 6.2091 7.16152 6.49998C7.16152 6.79086 7.39694 7.02628 7.68782 7.02628H14.3561L12.6853 8.69708C12.479 8.89975 12.4792 9.23464 12.6859 9.43706L12.7908 9.32989L12.6848 9.43595Z"
                    fill="#ff0101" stroke="#26d829" stroke-width="0.1" />
                </svg>

                <a href="javascript:void(0)" v-on:click="logOutFunc()" class="list_link ms-2"> {{ $t('profile_sidemenu_logout') }} </a>
              </div>
            </div>
            <div class="justify-content-end  d-flex">
               <svg  class="arrow" height="14px" width="14px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492 492" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12 C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084 c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864 l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"></path> </g> </g> </g></svg>

            </div>
          </div>
        </li>
      </ul>


    </div>


  </div>
  <!-- end left side list      -->
</template>
<style scoped>
.dropdown_list{
  cursor: pointer;
}
</style>