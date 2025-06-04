<script>
import { useHead } from '@vueuse/head'
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import axios from "axios";


import pageNav from '@/components/lightNavbar.vue';
import lowerAnnouncement from '@/components/Announcement/lowerAnnouncement.vue';
import pageFooter from '@/components/footer.vue';
// import toolCard from '@/components/MarketPlace/ToolCard.vue';
// import productCard from '@/components/MarketPlace/productCard.vue';

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
            title: 'Market | YallaParty',
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
                            <router-link to="/" :class="{ active: $route.path === '/' }"> الرئيسية </router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">الدورات</li>
                </ol>
            </div>
        </nav>
    </div>
    
    <section class="profile campany mt-5">
        <div class="container">
            <div class="row mt-5 h-100">
                <!--  start left side list  -->
                <div class="col-12 col-lg-3 h-100 left-side fillter">

                    <div class="accordion" id="accordionExample">
                        <div class="sec">
                            <div class="title-fill">
                                <img src="/img/icons/fillter.svg">
                                <span>الفلترة</span>
                            </div>
                        </div>
                        <div class="accordion-item customize-according">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <div class="title-fill">
                                        <img src="/img/icons/car.svg">
                                        <span>نوع السيارة</span>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show " aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body customize-acc-body">
                                    <form action="">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value=""
                                                id="flexCheckChecked" checked="">
                                            <label class="form-check-label" for="flexCheckChecked"> مرسيدس بنز</label>
                                            <span>(345)</span>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input " type="checkbox" value=""
                                                id="flexCheckChecked">
                                            <label class="form-check-label" for="flexCheckChecked">تويوتا كورلا</label>
                                            <span>(345)</span>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input " type="checkbox" value=""
                                                id="flexCheckChecked">
                                            <label class="form-check-label" for="flexCheckChecked"> هونداي
                                                النترا</label>
                                            <span>(345)</span>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input " type="checkbox" value=""
                                                id="flexCheckChecked">
                                            <label class="form-check-label" for="flexCheckChecked"> هونداي أكورد</label>
                                            <span>(345)</span>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input " type="checkbox" value=""
                                                id="flexCheckChecked" checked="">
                                            <label class="form-check-label" for="flexCheckChecked"> نيسان التيما</label>
                                            <span>(345)</span>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input " type="checkbox" value=""
                                                id="flexCheckChecked">
                                            <label class="form-check-label" for="flexCheckChecked"> كيا أوبتمام</label>
                                            <span>(345)</span>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div class="accordion-item customize-according mt-2">
                            <h2 class="accordion-header" id="heading2">
                                <button class="accordion-button  btn " type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapse2" aria-expanded="true" aria-controls="collapse2">
                                    <div class="title-fill">
                                        <img src="/img/icons/car.svg">
                                        <span>موديل السيارة</span>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapse2" class="accordion-collapse collapse show " aria-labelledby="heading2"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body customize-acc-body ">
                                    <form action="">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value=""
                                                id="flexCheckChecked" checked="">
                                            <label class="form-check-label" for="flexCheckChecked"> مرسيدس بنز</label>
                                            <span>(345)</span>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input " type="checkbox" value=""
                                                id="flexCheckChecked">
                                            <label class="form-check-label" for="flexCheckChecked">تويوتا كورلا</label>
                                            <span>(345)</span>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input " type="checkbox" value=""
                                                id="flexCheckChecked">
                                            <label class="form-check-label" for="flexCheckChecked"> هونداي
                                                النترا</label>
                                            <span>(345)</span>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input " type="checkbox" value=""
                                                id="flexCheckChecked">
                                            <label class="form-check-label" for="flexCheckChecked"> هونداي أكورد</label>
                                            <span>(345)</span>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input " type="checkbox" value=""
                                                id="flexCheckChecked" checked="">
                                            <label class="form-check-label" for="flexCheckChecked"> نيسان التيما</label>
                                            <span>(345)</span>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input " type="checkbox" value=""
                                                id="flexCheckChecked">
                                            <label class="form-check-label" for="flexCheckChecked"> كيا أوبتمام</label>
                                            <span>(345)</span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item customize-according mt-2">
                            <h2 class="accordion-header" id="">
                                <button class="btn py-3" type="">
                                    <div class="title-fill">
                                        <img src="/img/icons/date.svg">
                                        <span>السنة</span>
                                    </div>
                                </button>
                            </h2>
                            <div id="" class="show">
                                <div class="accordion-body customize-acc-body pt-0">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label class="label-form">من</label>
                                            <input name="price" id="price" type="text"
                                                class="form-control mt-2  text-start gray_text gray-inp"
                                                placeholder=" 0 " required="">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="label-form">الى</label>
                                            <input name="price" id="price" type="text"
                                                class="form-control mt-2  text-start gray_text gray-inp"
                                                placeholder=" 0 " required="">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="accordion-item customize-according mt-2">
                            <h2 class="accordion-header" id="">
                                <button class="btn py-3" type="">
                                    <div class="title-fill">
                                        <img src="/img/icons/money.svg">
                                        <span>السعر</span>
                                    </div>
                                </button>
                            </h2>
                            <div id="" class="show">
                                <div class="accordion-body customize-acc-body pt-0">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label class="label-form">من</label>
                                            <input name="price" id="price" type="text"
                                                class="form-control mt-2  text-start gray_text gray-inp"
                                                placeholder=" 0 " required="">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="label-form">الى</label>
                                            <input name="price" id="price" type="text"
                                                class="form-control mt-2  text-start gray_text gray-inp"
                                                placeholder=" 0 " required="">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="accordion-item customize-according mt-2">
                            <h2 class="accordion-header" id="">
                                <button class="btn py-3" type="">
                                    <div class="title-fill">
                                        <img src="/img/icons/speed.svg">
                                        <span>عدد الأميال</span>
                                    </div>
                                </button>
                            </h2>
                            <div id="" class="show">
                                <div class="accordion-body customize-acc-body pt-0">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label class="label-form">من</label>
                                            <input name="price" id="price" type="text"
                                                class="form-control mt-2  text-start gray_text gray-inp"
                                                placeholder=" 0 " required="">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="label-form">الى</label>
                                            <input name="price" id="price" type="text"
                                                class="form-control mt-2  text-start gray_text gray-inp"
                                                placeholder=" 0 " required="">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div class="accordion-item customize-according mt-2">
                            <h2 class="accordion-header" id="heading6">
                                <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                                    <div class="title-fill">
                                        <img src="/img/icons/color.svg">
                                        <span>الألوان</span>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapse6" class="accordion-collapse collapse " aria-labelledby="heading6"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body customize-acc-body pt-0">
                                    غالباً ما يحتاج العثور على المنتج الذي ترغب في شراءه مجهوداً كبيراً إذا قمت بالتسوق
                                    من
                                    المتاجر التقليدية الموجودة بمراكز التسوق، ولكن إذا قررت التسوق أون لاين فإن عملية
                                    البحث
                                    والعثور على المنتج ستكون أكثر سهولة من خلال تصفح بعض قنوات التسوق الإلكترونية للحصول
                                    على
                                    أفضل منتج.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item customize-according mt-2">
                            <h2 class="accordion-header" id="heading7">
                                <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                                    <div class="title-fill">
                                        <img src="/img/icons/spas.svg">
                                        <span>المواصفات</span>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapse7" class="accordion-collapse collapse " aria-labelledby="heading7"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body customize-acc-body pt-0">
                                    غالباً ما يحتاج العثور على المنتج الذي ترغب في شراءه مجهوداً كبيراً إذا قمت بالتسوق
                                    من
                                    المتاجر التقليدية الموجودة بمراكز التسوق، ولكن إذا قررت التسوق أون لاين فإن عملية
                                    البحث
                                    والعثور على المنتج ستكون أكثر سهولة من خلال تصفح بعض قنوات التسوق الإلكترونية للحصول
                                    على
                                    أفضل منتج.
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
                <!-- end left side list-->

                <!-- right side container -->
                <div class="col-12 col-lg-9 ">
                    <div class="container white_card mt-2 right-side">
                        <span class="header-title"> أحدث السيارات </span>
                        <select class="header-drop form-select p-3 align-items-center d-flex mx-lg-2"
                            aria-label="Default select example">
                            <option selected=""> من الأعلى الى الأسفل</option>
                            <option value="1">من الأسفل الى الأعلى</option>
                        </select>
                        <div class="clearfix"></div>
                        <div class="row">
                            <div class="col-12 col-lg-4 col-md-6 mt-4" data-aos="fade-up" data-aos-delay="100"
                                data-aos-duration="700">
                                <router-link to="/vehicle">
                                    <div class="card custom_card">
                                        <div class="img">
                                            <img src="/img/cars/c1.png" class="card-img-top index-img-card" alt="...">
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-baseline mb-2">
                                                <h6 class="card-title justify-content-start">فيراري</h6>
                                                <a href="javascript:void(0)" class="justify-content-end">
                                                    <!-- <img src="/img/icons/star2.svg"> -->
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M10.7878 3.10215C11.283 2.09877 12.7138 2.09876 13.209 3.10215L15.567 7.87987L20.8395 8.64601C21.9468 8.80691 22.3889 10.1677 21.5877 10.9487L17.7724 14.6676L18.6731 19.9189C18.8622 21.0217 17.7047 21.8627 16.7143 21.342L11.9984 18.8627L7.28252 21.342C6.29213 21.8627 5.13459 21.0217 5.32374 19.9189L6.2244 14.6676L2.40916 10.9487C1.60791 10.1677 2.05005 8.80691 3.15735 8.64601L8.42988 7.87987L10.7878 3.10215ZM11.9984 4.03854L9.74008 8.61443C9.54344 9.01288 9.16332 9.28904 8.72361 9.35294L3.67382 10.0867L7.32788 13.6486C7.64606 13.9587 7.79125 14.4055 7.71614 14.8435L6.85353 19.8729L11.3702 17.4983C11.7635 17.2915 12.2333 17.2915 12.6266 17.4983L17.1433 19.8729L16.2807 14.8435C16.2056 14.4055 16.3508 13.9587 16.6689 13.6486L20.323 10.0867L15.2732 9.35294C14.8335 9.28904 14.4534 9.01288 14.2568 8.61443L11.9984 4.03854Z"
                                                            fill="#999999" />
                                                    </svg>
                                                </a>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <div class=" d-flex  flex-column">
                                                    <div class="d-flex align-items-center mb-2">
                                                        <a href="hotel_details.html" class="name-details">
                                                            فيراري 488 جي تي بي
                                                        </a>
                                                    </div>
                                                    <div class=" d-flex align-items-center rate mb-2">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>

                                                        <span class="number">
                                                            (5)
                                                        </span>
                                                    </div>
                                                    <div class=" d-flex align-items-center">

                                                        <span class="price">
                                                            5000$
                                                        </span>
                                                        <span class="des">
                                                            34.75$
                                                        </span>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                            <div class="col-12 col-lg-4 col-md-6 mt-4" data-aos="fade-up" data-aos-delay="100"
                                data-aos-duration="700">
                                <a href="service_details.html" style="color:black;">
                                    <div class="card custom_card">
                                        <div class="img">
                                            <img src="/img/cars/c2.png" class="card-img-top index-img-card" alt="...">
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-baseline mb-2">
                                                <h6 class="card-title justify-content-start">فيراري</h6>
                                                <a href="javascript:void(0)" class="justify-content-end">
                                                    <!-- <img src="/img/icons/star2.svg"> -->
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M10.7878 3.10215C11.283 2.09877 12.7138 2.09876 13.209 3.10215L15.567 7.87987L20.8395 8.64601C21.9468 8.80691 22.3889 10.1677 21.5877 10.9487L17.7724 14.6676L18.6731 19.9189C18.8622 21.0217 17.7047 21.8627 16.7143 21.342L11.9984 18.8627L7.28252 21.342C6.29213 21.8627 5.13459 21.0217 5.32374 19.9189L6.2244 14.6676L2.40916 10.9487C1.60791 10.1677 2.05005 8.80691 3.15735 8.64601L8.42988 7.87987L10.7878 3.10215ZM11.9984 4.03854L9.74008 8.61443C9.54344 9.01288 9.16332 9.28904 8.72361 9.35294L3.67382 10.0867L7.32788 13.6486C7.64606 13.9587 7.79125 14.4055 7.71614 14.8435L6.85353 19.8729L11.3702 17.4983C11.7635 17.2915 12.2333 17.2915 12.6266 17.4983L17.1433 19.8729L16.2807 14.8435C16.2056 14.4055 16.3508 13.9587 16.6689 13.6486L20.323 10.0867L15.2732 9.35294C14.8335 9.28904 14.4534 9.01288 14.2568 8.61443L11.9984 4.03854Z"
                                                            fill="#999999" />
                                                    </svg>
                                                </a>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <div class=" d-flex  flex-column">
                                                    <div class="d-flex align-items-center mb-2">
                                                        <a href="hotel_details.html" class="name-details">
                                                            فيراري 488 جي تي بي
                                                        </a>
                                                    </div>
                                                    <div class=" d-flex align-items-center rate mb-2">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>

                                                        <span class="number">
                                                            (5)
                                                        </span>
                                                    </div>
                                                    <div class=" d-flex align-items-center">

                                                        <span class="price">
                                                            5000$
                                                        </span>
                                                        <span class="des">
                                                            34.75$
                                                        </span>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-12 col-lg-4 col-md-6 mt-4" data-aos="fade-up" data-aos-delay="100"
                                data-aos-duration="700">
                                <a href="service_details.html" style="color:black;">
                                    <div class="card custom_card">
                                        <div class="img">
                                            <img src="/img/cars/c3.png" class="card-img-top index-img-card" alt="...">
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-baseline mb-2">
                                                <h6 class="card-title justify-content-start">فيراري</h6>
                                                <a href="javascript:void(0)" class="justify-content-end">
                                                    <!-- <img src="/img/icons/star2.svg"> -->
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M10.7878 3.10215C11.283 2.09877 12.7138 2.09876 13.209 3.10215L15.567 7.87987L20.8395 8.64601C21.9468 8.80691 22.3889 10.1677 21.5877 10.9487L17.7724 14.6676L18.6731 19.9189C18.8622 21.0217 17.7047 21.8627 16.7143 21.342L11.9984 18.8627L7.28252 21.342C6.29213 21.8627 5.13459 21.0217 5.32374 19.9189L6.2244 14.6676L2.40916 10.9487C1.60791 10.1677 2.05005 8.80691 3.15735 8.64601L8.42988 7.87987L10.7878 3.10215ZM11.9984 4.03854L9.74008 8.61443C9.54344 9.01288 9.16332 9.28904 8.72361 9.35294L3.67382 10.0867L7.32788 13.6486C7.64606 13.9587 7.79125 14.4055 7.71614 14.8435L6.85353 19.8729L11.3702 17.4983C11.7635 17.2915 12.2333 17.2915 12.6266 17.4983L17.1433 19.8729L16.2807 14.8435C16.2056 14.4055 16.3508 13.9587 16.6689 13.6486L20.323 10.0867L15.2732 9.35294C14.8335 9.28904 14.4534 9.01288 14.2568 8.61443L11.9984 4.03854Z"
                                                            fill="#999999" />
                                                    </svg>
                                                </a>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <div class=" d-flex  flex-column">
                                                    <div class="d-flex align-items-center mb-2">
                                                        <a href="hotel_details.html" class="name-details">
                                                            فيراري 488 جي تي بي
                                                        </a>
                                                    </div>
                                                    <div class=" d-flex align-items-center rate mb-2">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>

                                                        <span class="number">
                                                            (5)
                                                        </span>
                                                    </div>
                                                    <div class=" d-flex align-items-center">

                                                        <span class="price">
                                                            5000$
                                                        </span>
                                                        <span class="des">
                                                            34.75$
                                                        </span>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-12 col-lg-4 col-md-6 mt-4" data-aos="fade-up" data-aos-delay="100"
                                data-aos-duration="700">
                                <a href="service_details.html" style="color:black;">
                                    <div class="card custom_card">
                                        <div class="img">
                                            <img src="/img/cars/c4.png" class="card-img-top index-img-card" alt="...">
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-baseline mb-2">
                                                <h6 class="card-title justify-content-start">فيراري</h6>
                                                <a href="javascript:void(0)" class="justify-content-end">
                                                    <!-- <img src="/img/icons/star2.svg"> -->
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M10.7878 3.10215C11.283 2.09877 12.7138 2.09876 13.209 3.10215L15.567 7.87987L20.8395 8.64601C21.9468 8.80691 22.3889 10.1677 21.5877 10.9487L17.7724 14.6676L18.6731 19.9189C18.8622 21.0217 17.7047 21.8627 16.7143 21.342L11.9984 18.8627L7.28252 21.342C6.29213 21.8627 5.13459 21.0217 5.32374 19.9189L6.2244 14.6676L2.40916 10.9487C1.60791 10.1677 2.05005 8.80691 3.15735 8.64601L8.42988 7.87987L10.7878 3.10215ZM11.9984 4.03854L9.74008 8.61443C9.54344 9.01288 9.16332 9.28904 8.72361 9.35294L3.67382 10.0867L7.32788 13.6486C7.64606 13.9587 7.79125 14.4055 7.71614 14.8435L6.85353 19.8729L11.3702 17.4983C11.7635 17.2915 12.2333 17.2915 12.6266 17.4983L17.1433 19.8729L16.2807 14.8435C16.2056 14.4055 16.3508 13.9587 16.6689 13.6486L20.323 10.0867L15.2732 9.35294C14.8335 9.28904 14.4534 9.01288 14.2568 8.61443L11.9984 4.03854Z"
                                                            fill="#999999" />
                                                    </svg>
                                                </a>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <div class=" d-flex  flex-column">
                                                    <div class="d-flex align-items-center mb-2">
                                                        <a href="hotel_details.html" class="name-details">
                                                            فيراري 488 جي تي بي
                                                        </a>
                                                    </div>
                                                    <div class=" d-flex align-items-center rate mb-2">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>

                                                        <span class="number">
                                                            (5)
                                                        </span>
                                                    </div>
                                                    <div class=" d-flex align-items-center">

                                                        <span class="price">
                                                            5000$
                                                        </span>
                                                        <span class="des">
                                                            34.75$
                                                        </span>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-12 col-lg-4 col-md-6 mt-4" data-aos="fade-up" data-aos-delay="100"
                                data-aos-duration="700">
                                <a href="service_details.html" style="color:black;">
                                    <div class="card custom_card">
                                        <div class="img">
                                            <img src="/img/cars/c5.png" class="card-img-top index-img-card" alt="...">
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-baseline mb-2">
                                                <h6 class="card-title justify-content-start">فيراري</h6>
                                                <a href="javascript:void(0)" class="justify-content-end">
                                                    <!-- <img src="/img/icons/star2.svg"> -->
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M10.7878 3.10215C11.283 2.09877 12.7138 2.09876 13.209 3.10215L15.567 7.87987L20.8395 8.64601C21.9468 8.80691 22.3889 10.1677 21.5877 10.9487L17.7724 14.6676L18.6731 19.9189C18.8622 21.0217 17.7047 21.8627 16.7143 21.342L11.9984 18.8627L7.28252 21.342C6.29213 21.8627 5.13459 21.0217 5.32374 19.9189L6.2244 14.6676L2.40916 10.9487C1.60791 10.1677 2.05005 8.80691 3.15735 8.64601L8.42988 7.87987L10.7878 3.10215ZM11.9984 4.03854L9.74008 8.61443C9.54344 9.01288 9.16332 9.28904 8.72361 9.35294L3.67382 10.0867L7.32788 13.6486C7.64606 13.9587 7.79125 14.4055 7.71614 14.8435L6.85353 19.8729L11.3702 17.4983C11.7635 17.2915 12.2333 17.2915 12.6266 17.4983L17.1433 19.8729L16.2807 14.8435C16.2056 14.4055 16.3508 13.9587 16.6689 13.6486L20.323 10.0867L15.2732 9.35294C14.8335 9.28904 14.4534 9.01288 14.2568 8.61443L11.9984 4.03854Z"
                                                            fill="#999999" />
                                                    </svg>
                                                </a>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <div class=" d-flex  flex-column">
                                                    <div class="d-flex align-items-center mb-2">
                                                        <a href="hotel_details.html" class="name-details">
                                                            فيراري 488 جي تي بي
                                                        </a>
                                                    </div>
                                                    <div class=" d-flex align-items-center rate mb-2">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>

                                                        <span class="number">
                                                            (5)
                                                        </span>
                                                    </div>
                                                    <div class=" d-flex align-items-center">

                                                        <span class="price">
                                                            5000$
                                                        </span>
                                                        <span class="des">
                                                            34.75$
                                                        </span>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-12 col-lg-4 col-md-6 mt-4" data-aos="fade-up" data-aos-delay="100"
                                data-aos-duration="700">
                                <a href="service_details.html" style="color:black;">
                                    <div class="card custom_card">
                                        <div class="img">
                                            <img src="/img/cars/c6.png" class="card-img-top index-img-card" alt="...">
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-baseline mb-2">
                                                <h6 class="card-title justify-content-start">فيراري</h6>
                                                <a href="javascript:void(0)" class="justify-content-end">
                                                    <!-- <img src="/img/icons/star2.svg"> -->
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M10.7878 3.10215C11.283 2.09877 12.7138 2.09876 13.209 3.10215L15.567 7.87987L20.8395 8.64601C21.9468 8.80691 22.3889 10.1677 21.5877 10.9487L17.7724 14.6676L18.6731 19.9189C18.8622 21.0217 17.7047 21.8627 16.7143 21.342L11.9984 18.8627L7.28252 21.342C6.29213 21.8627 5.13459 21.0217 5.32374 19.9189L6.2244 14.6676L2.40916 10.9487C1.60791 10.1677 2.05005 8.80691 3.15735 8.64601L8.42988 7.87987L10.7878 3.10215ZM11.9984 4.03854L9.74008 8.61443C9.54344 9.01288 9.16332 9.28904 8.72361 9.35294L3.67382 10.0867L7.32788 13.6486C7.64606 13.9587 7.79125 14.4055 7.71614 14.8435L6.85353 19.8729L11.3702 17.4983C11.7635 17.2915 12.2333 17.2915 12.6266 17.4983L17.1433 19.8729L16.2807 14.8435C16.2056 14.4055 16.3508 13.9587 16.6689 13.6486L20.323 10.0867L15.2732 9.35294C14.8335 9.28904 14.4534 9.01288 14.2568 8.61443L11.9984 4.03854Z"
                                                            fill="#999999" />
                                                    </svg>
                                                </a>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <div class=" d-flex  flex-column">
                                                    <div class="d-flex align-items-center mb-2">
                                                        <a href="hotel_details.html" class="name-details">
                                                            فيراري 488 جي تي بي
                                                        </a>
                                                    </div>
                                                    <div class=" d-flex align-items-center rate mb-2">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>

                                                        <span class="number">
                                                            (5)
                                                        </span>
                                                    </div>
                                                    <div class=" d-flex align-items-center">

                                                        <span class="price">
                                                            5000$
                                                        </span>
                                                        <span class="des">
                                                            34.75$
                                                        </span>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-12 col-lg-4 col-md-6 mt-4" data-aos="fade-up" data-aos-delay="100"
                                data-aos-duration="700">
                                <a href="service_details.html" style="color:black;">
                                    <div class="card custom_card">
                                        <div class="img">
                                            <img src="/img/cars/c1.png" class="card-img-top index-img-card" alt="...">
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-baseline mb-2">
                                                <h6 class="card-title justify-content-start">فيراري</h6>
                                                <a href="javascript:void(0)" class="justify-content-end">
                                                    <!-- <img src="/img/icons/star2.svg"> -->
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M10.7878 3.10215C11.283 2.09877 12.7138 2.09876 13.209 3.10215L15.567 7.87987L20.8395 8.64601C21.9468 8.80691 22.3889 10.1677 21.5877 10.9487L17.7724 14.6676L18.6731 19.9189C18.8622 21.0217 17.7047 21.8627 16.7143 21.342L11.9984 18.8627L7.28252 21.342C6.29213 21.8627 5.13459 21.0217 5.32374 19.9189L6.2244 14.6676L2.40916 10.9487C1.60791 10.1677 2.05005 8.80691 3.15735 8.64601L8.42988 7.87987L10.7878 3.10215ZM11.9984 4.03854L9.74008 8.61443C9.54344 9.01288 9.16332 9.28904 8.72361 9.35294L3.67382 10.0867L7.32788 13.6486C7.64606 13.9587 7.79125 14.4055 7.71614 14.8435L6.85353 19.8729L11.3702 17.4983C11.7635 17.2915 12.2333 17.2915 12.6266 17.4983L17.1433 19.8729L16.2807 14.8435C16.2056 14.4055 16.3508 13.9587 16.6689 13.6486L20.323 10.0867L15.2732 9.35294C14.8335 9.28904 14.4534 9.01288 14.2568 8.61443L11.9984 4.03854Z"
                                                            fill="#999999" />
                                                    </svg>
                                                </a>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <div class=" d-flex  flex-column">
                                                    <div class="d-flex align-items-center mb-2">
                                                        <a href="hotel_details.html" class="name-details">
                                                            فيراري 488 جي تي بي
                                                        </a>
                                                    </div>
                                                    <div class=" d-flex align-items-center rate mb-2">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>

                                                        <span class="number">
                                                            (5)
                                                        </span>
                                                    </div>
                                                    <div class=" d-flex align-items-center">

                                                        <span class="price">
                                                            5000$
                                                        </span>
                                                        <span class="des">
                                                            34.75$
                                                        </span>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-12 col-lg-4 col-md-6 mt-4" data-aos="fade-up" data-aos-delay="100"
                                data-aos-duration="700">
                                <a href="service_details.html" style="color:black;">
                                    <div class="card custom_card">
                                        <div class="img">
                                            <img src="/img/cars/c2.png" class="card-img-top index-img-card" alt="...">
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-baseline mb-2">
                                                <h6 class="card-title justify-content-start">فيراري</h6>
                                                <a href="javascript:void(0)" class="justify-content-end">
                                                    <!-- <img src="/img/icons/star2.svg"> -->
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M10.7878 3.10215C11.283 2.09877 12.7138 2.09876 13.209 3.10215L15.567 7.87987L20.8395 8.64601C21.9468 8.80691 22.3889 10.1677 21.5877 10.9487L17.7724 14.6676L18.6731 19.9189C18.8622 21.0217 17.7047 21.8627 16.7143 21.342L11.9984 18.8627L7.28252 21.342C6.29213 21.8627 5.13459 21.0217 5.32374 19.9189L6.2244 14.6676L2.40916 10.9487C1.60791 10.1677 2.05005 8.80691 3.15735 8.64601L8.42988 7.87987L10.7878 3.10215ZM11.9984 4.03854L9.74008 8.61443C9.54344 9.01288 9.16332 9.28904 8.72361 9.35294L3.67382 10.0867L7.32788 13.6486C7.64606 13.9587 7.79125 14.4055 7.71614 14.8435L6.85353 19.8729L11.3702 17.4983C11.7635 17.2915 12.2333 17.2915 12.6266 17.4983L17.1433 19.8729L16.2807 14.8435C16.2056 14.4055 16.3508 13.9587 16.6689 13.6486L20.323 10.0867L15.2732 9.35294C14.8335 9.28904 14.4534 9.01288 14.2568 8.61443L11.9984 4.03854Z"
                                                            fill="#999999" />
                                                    </svg>
                                                </a>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <div class=" d-flex  flex-column">
                                                    <div class="d-flex align-items-center mb-2">
                                                        <a href="hotel_details.html" class="name-details">
                                                            فيراري 488 جي تي بي
                                                        </a>
                                                    </div>
                                                    <div class=" d-flex align-items-center rate mb-2">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>

                                                        <span class="number">
                                                            (5)
                                                        </span>
                                                    </div>
                                                    <div class=" d-flex align-items-center">

                                                        <span class="price">
                                                            5000$
                                                        </span>
                                                        <span class="des">
                                                            34.75$
                                                        </span>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-12 col-lg-4 col-md-6 mt-4" data-aos="fade-up" data-aos-delay="100"
                                data-aos-duration="700">
                                <a href="service_details.html" style="color:black;">
                                    <div class="card custom_card">
                                        <div class="img">
                                            <img src="/img/cars/c3.png" class="card-img-top index-img-card" alt="...">
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-baseline mb-2">
                                                <h6 class="card-title justify-content-start">فيراري</h6>
                                                <a href="javascript:void(0)" class="justify-content-end">
                                                    <!-- <img src="/img/icons/star2.svg"> -->
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M10.7878 3.10215C11.283 2.09877 12.7138 2.09876 13.209 3.10215L15.567 7.87987L20.8395 8.64601C21.9468 8.80691 22.3889 10.1677 21.5877 10.9487L17.7724 14.6676L18.6731 19.9189C18.8622 21.0217 17.7047 21.8627 16.7143 21.342L11.9984 18.8627L7.28252 21.342C6.29213 21.8627 5.13459 21.0217 5.32374 19.9189L6.2244 14.6676L2.40916 10.9487C1.60791 10.1677 2.05005 8.80691 3.15735 8.64601L8.42988 7.87987L10.7878 3.10215ZM11.9984 4.03854L9.74008 8.61443C9.54344 9.01288 9.16332 9.28904 8.72361 9.35294L3.67382 10.0867L7.32788 13.6486C7.64606 13.9587 7.79125 14.4055 7.71614 14.8435L6.85353 19.8729L11.3702 17.4983C11.7635 17.2915 12.2333 17.2915 12.6266 17.4983L17.1433 19.8729L16.2807 14.8435C16.2056 14.4055 16.3508 13.9587 16.6689 13.6486L20.323 10.0867L15.2732 9.35294C14.8335 9.28904 14.4534 9.01288 14.2568 8.61443L11.9984 4.03854Z"
                                                            fill="#999999" />
                                                    </svg>
                                                </a>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <div class=" d-flex  flex-column">
                                                    <div class="d-flex align-items-center mb-2">
                                                        <a href="hotel_details.html" class="name-details">
                                                            فيراري 488 جي تي بي
                                                        </a>
                                                    </div>
                                                    <div class=" d-flex align-items-center rate mb-2">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>

                                                        <span class="number">
                                                            (5)
                                                        </span>
                                                    </div>
                                                    <div class=" d-flex align-items-center">

                                                        <span class="price">
                                                            5000$
                                                        </span>
                                                        <span class="des">
                                                            34.75$
                                                        </span>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-12 col-lg-4 col-md-6 mt-4" data-aos="fade-up" data-aos-delay="100"
                                data-aos-duration="700">
                                <a href="service_details.html" style="color:black;">
                                    <div class="card custom_card">
                                        <div class="img">
                                            <img src="/img/cars/c4.png" class="card-img-top index-img-card" alt="...">
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-baseline mb-2">
                                                <h6 class="card-title justify-content-start">فيراري</h6>
                                                <a href="javascript:void(0)" class="justify-content-end">
                                                    <!-- <img src="/img/icons/star2.svg"> -->
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M10.7878 3.10215C11.283 2.09877 12.7138 2.09876 13.209 3.10215L15.567 7.87987L20.8395 8.64601C21.9468 8.80691 22.3889 10.1677 21.5877 10.9487L17.7724 14.6676L18.6731 19.9189C18.8622 21.0217 17.7047 21.8627 16.7143 21.342L11.9984 18.8627L7.28252 21.342C6.29213 21.8627 5.13459 21.0217 5.32374 19.9189L6.2244 14.6676L2.40916 10.9487C1.60791 10.1677 2.05005 8.80691 3.15735 8.64601L8.42988 7.87987L10.7878 3.10215ZM11.9984 4.03854L9.74008 8.61443C9.54344 9.01288 9.16332 9.28904 8.72361 9.35294L3.67382 10.0867L7.32788 13.6486C7.64606 13.9587 7.79125 14.4055 7.71614 14.8435L6.85353 19.8729L11.3702 17.4983C11.7635 17.2915 12.2333 17.2915 12.6266 17.4983L17.1433 19.8729L16.2807 14.8435C16.2056 14.4055 16.3508 13.9587 16.6689 13.6486L20.323 10.0867L15.2732 9.35294C14.8335 9.28904 14.4534 9.01288 14.2568 8.61443L11.9984 4.03854Z"
                                                            fill="#999999" />
                                                    </svg>
                                                </a>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <div class=" d-flex  flex-column">
                                                    <div class="d-flex align-items-center mb-2">
                                                        <a href="hotel_details.html" class="name-details">
                                                            فيراري 488 جي تي بي
                                                        </a>
                                                    </div>
                                                    <div class=" d-flex align-items-center rate mb-2">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>

                                                        <span class="number">
                                                            (5)
                                                        </span>
                                                    </div>
                                                    <div class=" d-flex align-items-center">

                                                        <span class="price">
                                                            5000$
                                                        </span>
                                                        <span class="des">
                                                            34.75$
                                                        </span>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-12 col-lg-4 col-md-6 mt-4" data-aos="fade-up" data-aos-delay="100"
                                data-aos-duration="700">
                                <a href="service_details.html" style="color:black;">
                                    <div class="card custom_card">
                                        <div class="img">
                                            <img src="/img/cars/c5.png" class="card-img-top index-img-card" alt="...">
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-baseline mb-2">
                                                <h6 class="card-title justify-content-start">فيراري</h6>
                                                <a href="javascript:void(0)" class="justify-content-end">
                                                    <!-- <img src="/img/icons/star2.svg"> -->
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M10.7878 3.10215C11.283 2.09877 12.7138 2.09876 13.209 3.10215L15.567 7.87987L20.8395 8.64601C21.9468 8.80691 22.3889 10.1677 21.5877 10.9487L17.7724 14.6676L18.6731 19.9189C18.8622 21.0217 17.7047 21.8627 16.7143 21.342L11.9984 18.8627L7.28252 21.342C6.29213 21.8627 5.13459 21.0217 5.32374 19.9189L6.2244 14.6676L2.40916 10.9487C1.60791 10.1677 2.05005 8.80691 3.15735 8.64601L8.42988 7.87987L10.7878 3.10215ZM11.9984 4.03854L9.74008 8.61443C9.54344 9.01288 9.16332 9.28904 8.72361 9.35294L3.67382 10.0867L7.32788 13.6486C7.64606 13.9587 7.79125 14.4055 7.71614 14.8435L6.85353 19.8729L11.3702 17.4983C11.7635 17.2915 12.2333 17.2915 12.6266 17.4983L17.1433 19.8729L16.2807 14.8435C16.2056 14.4055 16.3508 13.9587 16.6689 13.6486L20.323 10.0867L15.2732 9.35294C14.8335 9.28904 14.4534 9.01288 14.2568 8.61443L11.9984 4.03854Z"
                                                            fill="#999999" />
                                                    </svg>
                                                </a>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <div class=" d-flex  flex-column">
                                                    <div class="d-flex align-items-center mb-2">
                                                        <a href="hotel_details.html" class="name-details">
                                                            فيراري 488 جي تي بي
                                                        </a>
                                                    </div>
                                                    <div class=" d-flex align-items-center rate mb-2">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>

                                                        <span class="number">
                                                            (5)
                                                        </span>
                                                    </div>
                                                    <div class=" d-flex align-items-center">

                                                        <span class="price">
                                                            5000$
                                                        </span>
                                                        <span class="des">
                                                            34.75$
                                                        </span>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-12 col-lg-4 col-md-6 mt-4" data-aos="fade-up" data-aos-delay="100"
                                data-aos-duration="700">
                                <a href="service_details.html" style="color:black;">
                                    <div class="card custom_card">
                                        <div class="img">
                                            <img src="/img/cars/c6.png" class="card-img-top index-img-card" alt="...">
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-baseline mb-2">
                                                <h6 class="card-title justify-content-start">فيراري</h6>
                                                <a href="javascript:void(0)" class="justify-content-end">
                                                    <!-- <img src="/img/icons/star2.svg"> -->
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M10.7878 3.10215C11.283 2.09877 12.7138 2.09876 13.209 3.10215L15.567 7.87987L20.8395 8.64601C21.9468 8.80691 22.3889 10.1677 21.5877 10.9487L17.7724 14.6676L18.6731 19.9189C18.8622 21.0217 17.7047 21.8627 16.7143 21.342L11.9984 18.8627L7.28252 21.342C6.29213 21.8627 5.13459 21.0217 5.32374 19.9189L6.2244 14.6676L2.40916 10.9487C1.60791 10.1677 2.05005 8.80691 3.15735 8.64601L8.42988 7.87987L10.7878 3.10215ZM11.9984 4.03854L9.74008 8.61443C9.54344 9.01288 9.16332 9.28904 8.72361 9.35294L3.67382 10.0867L7.32788 13.6486C7.64606 13.9587 7.79125 14.4055 7.71614 14.8435L6.85353 19.8729L11.3702 17.4983C11.7635 17.2915 12.2333 17.2915 12.6266 17.4983L17.1433 19.8729L16.2807 14.8435C16.2056 14.4055 16.3508 13.9587 16.6689 13.6486L20.323 10.0867L15.2732 9.35294C14.8335 9.28904 14.4534 9.01288 14.2568 8.61443L11.9984 4.03854Z"
                                                            fill="#999999" />
                                                    </svg>
                                                </a>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <div class=" d-flex  flex-column">
                                                    <div class="d-flex align-items-center mb-2">
                                                        <a href="hotel_details.html" class="name-details">
                                                            فيراري 488 جي تي بي
                                                        </a>
                                                    </div>
                                                    <div class=" d-flex align-items-center rate mb-2">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.19185 1.0681C6.52198 0.399179 7.47585 0.399172 7.80598 1.0681L9.37798 4.25325L12.893 4.76401C13.6312 4.87127 13.9259 5.77847 13.3918 6.29913L10.8482 8.7784L11.4487 12.2793C11.5748 13.0145 10.8031 13.5751 10.1428 13.228L6.99891 11.5751L3.85499 13.228C3.19473 13.5751 2.42304 13.0145 2.54914 12.2793L3.14958 8.7784L0.606087 6.29913C0.0719199 5.77847 0.36668 4.87127 1.10488 4.76401L4.6199 4.25325L6.19185 1.0681Z"
                                                                fill="#FFCE1F" />
                                                        </svg>

                                                        <span class="number">
                                                            (5)
                                                        </span>
                                                    </div>
                                                    <div class=" d-flex align-items-center">

                                                        <span class="price">
                                                            5000$
                                                        </span>
                                                        <span class="des">
                                                            34.75$
                                                        </span>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
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
                                    <a href="">تواصل مع البائع</a>
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