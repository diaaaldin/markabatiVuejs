<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import { useHead } from '@vueuse/head'
import pageNav from '@/components/lightNavbar.vue';
import pageFooter from '@/components/footer.vue';
import { InterfacesEnum } from '@/config/config.js'



export default {
    data() {
        return {
            interfaceId: InterfacesEnum.aboutUs,
        }
    },
    mounted() {
        useHead({
            title: 'About Us | Markabati',
            meta: [
                {
                    name: `description`,
                    content: 'Markabati is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties.',
                },
            ],
        });
    },
    components: {
        pageNav,
        pageFooter,


    },

    emits: {

    },

    created() {
        // Call the function from the store directly when the component is created
        this.initFunc();
        
        
    },

    computed: {
        ...mapGetters("Interfaces", ["getInterfaceItemsData"]),

    },
    methods: {
        ...mapActions("Interfaces", ["GetInterfaceItem", "GetInterfaceItems", "CreateInterfaceItem", "UpdateInterfaceItem", "DeleteInterfaceItem"]),

        initFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });
            this.GetInterfaceItems(this.interfaceId).then(Response => {
                console.log("this.getInterfaceItemsData : ",this.getInterfaceItemsData);
                console.log("about_us_mobile1_data : " , this.getTitleByCode("about_us_mobile1_data"));
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
        },

        getTitleByCode(code) {
            // Find the object with the matching code
            const foundItem = this.getInterfaceItemsData.find(item => item.code === code);
            
            if (foundItem) {
               return foundItem.title;  // Set the title if found
                
            } else {
                return "Title not found";  // If no match is found
            }
        }

    }
};
</script>
<template>
    <pageNav></pageNav>

    <div class="about-us">
        <div class="header-title bg text-center">
            <div class="container">
                <div class="text-center">
                    <h1 class="mb-5 white"> {{ $t('aboutUs_title') }}</h1>
                </div>
            </div>
        </div>
        <section class="about-us mt-5">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-lg-6">
                        <div class="me-3 mt-5">
                            <div class="">
                                <h2 class="title mb-0"> {{ getTitleByCode("about_us_data_title") }} </h2>
                                <p class="item_about_us mt-5">
                                        {{ getTitleByCode("about_us_general_data") }}
                                </p>
                            </div>
                            <ul class="ul_about mt-3 ">
                                <li class="item_about_us py-2">{{ getTitleByCode("about_us_sort1_data") }}</li>
                                <li class="item_about_us py-2">{{ getTitleByCode("about_us_sort2_data") }}</li>
                                <li class="item_about_us py-2">{{ getTitleByCode("about_us_sort3_data") }}</li>
                            </ul>
                            <ul class="ul_about_green">
                                <li class="item_about_us_green">
                                    <svg width="15" height="15" viewBox="0 0 28 28" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z"
                                            fill="#24DC26">
                                        </path>
                                    </svg> {{ $t('aboutUs_for_comunication') }}  {{ getTitleByCode("about_us_mobile1_data") }}
                                </li>
                                <li class="item_about_us_green">
                                    <svg width="15" height="15" viewBox="0 0 28 28" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z"
                                            fill="#24DC26">
                                        </path>
                                    </svg> {{ $t('aboutUs_for_comunication') }} {{ getTitleByCode("about_us_mobile2_data") }}
                                </li>
                            </ul>

                        </div>
                        <div class="mt-5">
                            <button class="btn-contact">تواصل معنا</button>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 img-about-us">
                        <div class="row">
                            <div class=" col-12">
                                <div class="d-flex flex-column mt-lg-5 ">
                                    <img class="img-fluid my-2" src="/img/aboutus1.jpg" alt="">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>



    <pageFooter></pageFooter>
</template>
<style scoped></style>