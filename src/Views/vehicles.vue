<script>
import { useHead } from '@vueuse/head'
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import axios from "axios";


import pageNav from '@/components/lightNavbar.vue';
import lowerAnnouncement from '@/components/Announcement/lowerAnnouncement.vue';
import pageFooter from '@/components/footer.vue';
import productCard from '@/components/Cards/productCard.vue';
import Filter from '@/components/Vehicles/filter.vue'

export default {

    data() {
        return {
            dataSearch: {
                exceptionIds: [],
                productName: "",
                productSection: 0,
                userId: 0,
                userEmail: "",
                userName: "",
                stateId: "",
                page: 1,
                pageSize: 12,
            },


            productsData: [],
            moreDataShow: false,

            selectedOption: '-- select --', // Default selected option
            selectedOption2: '-- select2 --', // Default selected option
            isOpen: false, // Dropdown visibility state
            isOpen2: false, // Dropdown visibility state

            cities: []
        }
    },
    mounted() {
        this.MainSlider();

        useHead({
            title: 'Vehicles | Markabati',
            meta: [
                {
                    name: `description`,
                    content: 'Yalla Party is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties.',
                },
            ],
        });

        //document.addEventListener('click', this.closeDropdown);
    },
    components: {
        pageNav,
        pageFooter,
        lowerAnnouncement,
        productCard,
        Filter,
    },

    emits: {

    },

    async created() {
        // Call the function from the store directly when the component is created
        // this.GetToolsSections();
        // await this.initFunc();

        // if (this.getCompanyData.stateId) {
        //     await this.fetchSearchCities(this.getCompanyData.stateId);
        // }
    },
    watch: {
        // Watch for changes in the event prop's stateId
        // "getCompanyData.stateId": {
        //     immediate: true,
        //     handler(newStateId) {
        //         if (newStateId) {
        //             this.fetchSearchCities(newStateId);
        //         }
        //     }
        // }
    },

    computed: {
        // ...mapGetters("Code", ["getToolsSectionsData"]),
        // ...mapGetters("Products", ["getProductsData"]),
        // ...mapGetters("Users", ["getCompanyData"]),

        // userImage() {
        //     const imageUrl = this.getCompanyData && this.getCompanyData.image
        //         ? this.getCompanyData.image
        //         : "/img/person1.jpg";
        //     return imageUrl;
        // },
    },
    methods: {
        ...mapActions("Code", ["GetToolsSections"]),
        ...mapActions("Products", ["GetProducts"]),
        ...mapActions("Users", ["GetStoreInfo"]),



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

            this.dataSearch.userId = id;

            this.GetStoreInfo(id);
            this.GetProducts(this.dataSearch).then(Response => {
                Response.products.data.forEach(event => {
                    this.productsData.push(event);
                });
                if (Response.products.pagination.currentPage >= Response.products.pagination.pageCount) this.moreDataShow = false;
                else this.moreDataShow = true;



                loading.close();
            }).catch(error => {
                this.$moshaToast(error.response.data.message, {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                loading.close();
            });
        },

        SearchChangeFunc() {
            this.GetData();
        },

        GetData() {
            this.GetProducts(this.dataSearch).then(Response => {
                this.productsData = [];
                Response.products.data.forEach(event => {
                    this.productsData.push(event);
                });
                if (Response.products.pagination.currentPage >= Response.products.pagination.pageCount) this.moreDataShow = false;
                else this.moreDataShow = true;
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

        seeMoreFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });

            this.productsData.forEach(tool => {
                this.dataSearch.exceptionIds.push(tool.id);
            });
            this.GetProducts(this.dataSearch).then(Response => {
                Response.products.data.forEach(event => {
                    this.productsData.push(event);
                });
                if (Response.products.pagination.currentPage >= Response.products.pagination.pageCount) this.moreDataShow = false;
                else this.moreDataShow = true;

                loading.close();
            }).catch(error => {
                this.$moshaToast(error.response.data.message, {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                loading.close();
            });
        },

        toggleDropdown() {
            this.isOpen = !this.isOpen; // Toggle dropdown visibility
        },

        selectOption(option) {
            if (option == 0) {
                this.selectedOption = "-- select section --";
                this.dataSearch.productSection = 0;
            } else {
                this.selectedOption = option.name;
                this.dataSearch.productSection = option.id;
            }
            this.SearchChangeFunc();
            this.isOpen = false; // Close dropdown
        },

        toggleDropdown2() {
            this.isOpen2 = !this.isOpen2; // Toggle dropdown visibility
        },

        // selectOption2(option) {
        //     this.selectedOption2 = option; // Update selected option
        //     this.isOpen2 = false; // Close dropdown
        // },

        closeDropdown(e) {
            const customSelect1 = this.$refs.customSelect;
            const customSelect2 = this.$refs.customSelect2;

            // Check if click is outside customSelect1
            if (!customSelect1.contains(e.target)) {
                this.isOpen = false;
            }
            // // Check if click is outside customSelect2
            // if (!customSelect2.contains(e.target)) {
            //     this.isOpen2 = false;
            // }
        },

        // Fetch cities for the given stateId
        async fetchSearchCities(stateId) {
            try {
                const response = await axios.get(
                    `https://api.census.gov/data/2020/dec/pl?get=NAME&for=place:*&in=state:${stateId}`
                    , { withCredentials: false }
                );
                this.cities = response.data;
            } catch (error) {
                console.error("Error fetching cities:", error);
            }

        },

        // Get city name by city ID (index 2 in the data array)
        getCityName(cityId) {

            const selectedCity = this.cities.find(x => x[2] === cityId);  // Assuming cityId is at index 2
            return selectedCity ? selectedCity[0] : "City not found";  // Return city name or a default message
        },
        MainSlider() {
            $('.slider').slick({
                dots: true,
                infinite: false,
                speed: 300,
                slidesToShow: 1,
                rtl: true,
                autoplay: true,
                autoplaySpeed: 2000,
                prevArrow: '<button class="slick-prev prev-arrow"> <i class="fa-solid fa-angle-right"></i></button>',
                nextArrow: '<button class="slick-next next-arrow"> <i class="fa-solid fa-angle-left"></i></button>',
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 1008,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            arrows: false,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    }
                ]
            });
        },

    },
    beforeDestroy() {
        document.removeEventListener('click', this.closeDropdown);
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
                    
                    <li class="breadcrumb-item active" aria-current="page">{{ $t('location_menu_vehicles') }}</li>
                </ol>
                
            </div>
        </nav>
    </div>
    
    <section class="profile campany mt-5">
        <div class="container">
            <div class="row mt-5 h-100">
                <!--  start left side list  -->
                <Filter></Filter>
                <!-- end left side list-->

                <!-- right side container -->
                <div class="col-12 col-lg-9 ">
                    <div class="container white_card mt-2 right-side">
                        <span class="header-title">  {{ $t('vehicles_title') }} </span>
                        <!-- <select class="header-drop form-select p-3 align-items-center d-flex mx-lg-2"
                            aria-label="Default select example">
                            <option selected=""> من الأعلى الى الأسفل</option>
                            <option value="1">من الأسفل الى الأعلى</option>
                        </select> -->
                        <div class="clearfix"></div>
                        <div class="row">
                            <productCard></productCard>
                            <productCard></productCard>
                            <productCard></productCard>
                            <productCard></productCard>
                            <productCard></productCard>
                            <productCard></productCard>
                            <productCard></productCard>
                            <productCard></productCard>
                            <productCard></productCard>
                            <productCard></productCard>
                            <productCard></productCard>
                            <productCard></productCard>
                          
                        </div>
                        <div class="row">
                            <div class="pag">
                                <p class="count">أظهر 1 من 5</p>
                                <ul class="pagination">
                                    <li><a href="#"><i class="fa-solid fa-arrow-right"></i></a></li>
                                    <li class="active"><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#"><i class="fa-solid fa-arrow-left"></i></a></li>
                                </ul>
                            </div>
                            

                        </div>
                        
                    </div>
                </div>

                <!-- end right side -->
            </div>
        </div>
    </section>


    <section class="slider-main ads-main">
            <div class="slider">
                <div class="card-slider">
                    <img src="/img/slider/s2.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-2">
                            <h1 class="card-title justify-content-start"> 
                                انطلق بقوة وأناقة مع سيارة الأحلام أصبحت في متناول يديك!
                            </h1>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class=" d-flex  flex-column">
                                <div class="d-flex align-items-center mb-3">
                                    <ul class="details">
                                        <li>
                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z" fill="#24DC26"/>
                                            </svg>
                                            المواصفات</li>
                                        <li>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.2197 6.96967L8.75 11.4393L6.78033 9.4697C6.48744 9.1768 6.01256 9.1768 5.71967 9.4697C5.42678 9.7626 5.42678 10.2374 5.71967 10.5303L8.2197 13.0303C8.5126 13.3232 8.9874 13.3232 9.2803 13.0303L14.2803 8.0303C14.5732 7.73744 14.5732 7.26256 14.2803 6.96967C13.9874 6.67678 13.5126 6.67678 13.2197 6.96967Z" fill="white"/>
                                            </svg>

                                            محرك v8 توربو بقوة مذهلة</li>
                                        <li>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.2197 6.96967L8.75 11.4393L6.78033 9.4697C6.48744 9.1768 6.01256 9.1768 5.71967 9.4697C5.42678 9.7626 5.42678 10.2374 5.71967 10.5303L8.2197 13.0303C8.5126 13.3232 8.9874 13.3232 9.2803 13.0303L14.2803 8.0303C14.5732 7.73744 14.5732 7.26256 14.2803 6.96967C13.9874 6.67678 13.5126 6.67678 13.2197 6.96967Z" fill="white"/>
                                            </svg>
                                            تسارع من 0 إلى 100 كم/س في عدد الثواني </li>
                                        <li>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.2197 6.96967L8.75 11.4393L6.78033 9.4697C6.48744 9.1768 6.01256 9.1768 5.71967 9.4697C5.42678 9.7626 5.42678 10.2374 5.71967 10.5303L8.2197 13.0303C8.5126 13.3232 8.9874 13.3232 9.2803 13.0303L14.2803 8.0303C14.5732 7.73744 14.5732 7.26256 14.2803 6.96967C13.9874 6.67678 13.5126 6.67678 13.2197 6.96967Z" fill="white"/>
                                            </svg>
                                            تصميم رياضي فاخر يعكس الإبداع الإيطالي</li>
                                        <li>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.2197 6.96967L8.75 11.4393L6.78033 9.4697C6.48744 9.1768 6.01256 9.1768 5.71967 9.4697C5.42678 9.7626 5.42678 10.2374 5.71967 10.5303L8.2197 13.0303C8.5126 13.3232 8.9874 13.3232 9.2803 13.0303L14.2803 8.0303C14.5732 7.73744 14.5732 7.26256 14.2803 6.96967C13.9874 6.67678 13.5126 6.67678 13.2197 6.96967Z" fill="white"/>
                                            </svg>
                                            
                                            أنظمة تكنولوجيا متقدمة لتجربة قيادة لا تنسى</li>

                                        <li>فقط<span>$4000</span></li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class=" d-flex  flex-column">
                                <div class="d-flex align-items-center mb-3">
                                    <a href=""> تواصل مع البائع</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-slider">
                    <img src="/img/slider/s1.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-2">
                            <h1 class="card-title justify-content-start">سيارتك المثالية بين يديك, ابدا رحلتك معنا!
                            </h1>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class=" d-flex  flex-column">
                                <div class="d-flex align-items-center mb-3">
                                    <h3>حقق أحلامك على الطريق مع أفضل السيارات للبيع والإيجار! اختر من بين مجموعة فاخرة
                                        ومميزة تلبي كل احتياجاتك بأسعار تنافسية وخدمات لا تضاهي. سواء كنت تبحث عن
                                        الفخامة أو الأداء أو الراحة، نحن هنا لنمنحك تحربة قيادة تفوق التوقعات!</h3>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class=" d-flex  flex-column">
                                <div class="d-flex align-items-center mb-3">
                                    <a href="">استكشف المزيد</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </section>


    <lowerAnnouncement></lowerAnnouncement>
    <pageFooter></pageFooter>
</template>
<style scoped></style>