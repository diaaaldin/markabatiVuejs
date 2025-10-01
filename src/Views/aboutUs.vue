<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import { useHead } from '@vueuse/head'
import pageNav from '@/components/lightNavbar.vue';
import pageFooter from '@/components/footer.vue';
import { InterfacesEnum , socialUrlData , Urls} from '@/config/config.js'



export default {
    data() {
        return {
            interfaceId: InterfacesEnum.aboutUs,
        }
    },
    mounted() {
        useHead({
            title: 'مركبتي | من نحن',
            meta: [
                {
                    name: 'description',
                    content: 'مركبتي هو المنصة المثالية لبيع وشراء السيارات والمركبات المستعملة والجديدة في فلسطين. اعرض مركبتك بسهولة أو ابحث عن أفضل العروض من البائعين مباشرة.',
                },
                {
                    name: 'keywords',
                    content: 'بيع سيارات, شراء سيارات, سوق السيارات, سوق المركبات, سيارات مستعملة, سيارات جديدة, معارض سيارات, أسعار السيارات في فلسطين, سيارات في فلسطين'

                },
                {
                    name: 'robots',
                    content: 'index, follow',
                },
                {
                    charset: 'UTF-8'
                },
                {
                    name: 'language',
                    content: 'ar'
                }
            ],

            htmlAttrs: {
                lang: 'ar',
                dir: 'rtl'
            },

            link: [
                {
                    rel: 'canonical',
                    href: window.location.href
                }
            ]
        });
        useHead({
    title: 'مركبتي | من نحن',
    meta: [
        {
            name: 'description',
            content: 'تعرف على منصة مركبتي، الرائدة في بيع وشراء السيارات المستعملة والجديدة في فلسطين. نقدم حلولًا آمنة وسهلة للبائعين والمشترين.'
        },
        {
            name: 'keywords',
            content: 'بيع سيارات, شراء سيارات, سوق السيارات فلسطين, سيارات مستعملة فلسطين, سيارات جديدة فلسطين, معارض سيارات فلسطين , مركبتي فلسطين'
        },
        {
            property: 'og:title',
            content: 'من نحن - مركبتي | سوق السيارات الأفضل في فلسطين'
        },
        {
            property: 'og:description',
            content: 'اكتشف منصة مركبتي لبيع وشراء السيارات بثقة وسهولة في فلسطين.'
        },
        {
            property: 'og:url',
            content: window.location.href
        },
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:image',
            content: 'رابط صورة لوجو الموقع'
        },
        {
            name: 'robots',
            content: 'index, follow'
        },
        {
            charset: 'UTF-8'
        },
        {
            name: 'language',
            content: 'ar'
        }
    ],
    htmlAttrs: {
        lang: 'ar',
        dir: 'rtl'
    },
    link: [
        {
            rel: 'canonical',
            href: window.location.href
        }
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "مركبتي",
                "url": `${Urls.site}`,
                "description": "منصة رائدة لبيع وشراء السيارات في فلسطين.",
                "founder": {
                    "@type": "Person",
                    "name": "ضياءالدين قوصه"
                },
                "foundingDate": "2025",
                "sameAs": [
                    `${socialUrlData.facebook}`,
                    `${socialUrlData.instagram}`
                ]
            })
        }
    ]
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
    },

    computed: {
        ...mapGetters("Interfaces", ["getInterfaceItemsData"]),
        ...mapGetters("Users", ["getSiteComunicationData"]),
        ...mapGetters("Code", ["getStatesData", "getCitiesData"]),


    },
    methods: {

        getTitleByCode(code) {
            // Find the object with the matching code
            const foundItem = this.getInterfaceItemsData.find(item => item.code === code);

            if (foundItem) {
                return foundItem.title;  // Set the title if found

            } else {
                return "Title not found";  // If no match is found
            }
        },

        ownerImageFunc(imgae) {
            const imageUrl = imgae
                ? imgae
                : "/img/seller/seller.png";

            return imageUrl;
        },
        stateNameFunc(id) {
            // console.log("this.getStatesData : ",id);
            let res = this.getStatesData.find(x => x.id === id);
            if (res) return res.name;
            else return "";
        },
        cityNameFunc(id) {
            // console.log("this.getCitiesData : ", id);
            let res = this.getCitiesData.find(x => x.id === id);
            if (res) return res.name;
            else return "";
        },

        whatsAppLinkFunc() {
            // const encodedMsg = encodeURIComponent(this.message);
            // return `https://wa.me/${this.phone}?text=${encodedMsg}`;

            let rawNumber = this.getSiteComunicationData.mobile;

            // Clean and normalize the number
            let cleanNumber = rawNumber
                .replace(/\D/g, '')         // remove all non-digit characters
                .replace(/^00/, '')         // remove leading 00 if exists
                .replace(/^0+/, '')         // remove local leading 0 if needed
                ;

            // Add country code manually if needed
            // if (!cleanNumber.startsWith('970')) {
            //     cleanNumber = '970' + cleanNumber;
            // } 
            // else if (!cleanNumber.startsWith('970')) {
            //     cleanNumber = '970' + cleanNumber;
            // }

            const link = `https://wa.me/${cleanNumber}`;
            console.log('Final WhatsApp link:', link);
            window.open(link, '_blank');
        },



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
                <div class="row mb-5">
                    <div class="col-12 col-lg-6 col-md-6">
                        <div class="me-3 mt-5">
                            <div class="">
                                <h2 class="title mb-0" v-html="getTitleByCode('about_us_data_title')"> </h2>
                                <p class="item_about_us mt-5" v-html="getTitleByCode('about_us_general_data')"></p>
                            </div>
                            <!--
                            <ul class="ul_about mt-3 ">
                                <li class="item_about_us py-2" v-html="getTitleByCode('about_us_sort1_data')"></li>
                                <li class="item_about_us py-2" v-html="getTitleByCode('about_us_sort2_data')"></li>
                                <li class="item_about_us py-2" v-html="getTitleByCode('about_us_sort3_data')"></li>
                            </ul>
                             -->
                            <ul class="ul_about_green">
                                <li class="item_about_us_green">
                                    <svg width="15" height="15" viewBox="0 0 28 28" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z"
                                            fill="#24DC26">
                                        </path>
                                    </svg> {{ $t('aboutUs_for_comunication') }}
                                    <span v-html="getTitleByCode('about_us_mobile1_data')"></span>
                                </li>
                                <li class="item_about_us_green">
                                    <svg width="15" height="15" viewBox="0 0 28 28" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z"
                                            fill="#24DC26">
                                        </path>
                                    </svg> {{ $t('aboutUs_for_comunication') }}
                                    <span v-html="getTitleByCode('about_us_mobile2_data')"></span>
                                </li>
                            </ul>

                        </div>
                        <div class="mt-5 mb-3">
                            <button data-bs-toggle="modal"
                                :data-bs-target="'#contact_with_seller_' + getSiteComunicationData.id"
                                class="btn-contact">تواصل معنا</button>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 col-md-6 img-about-us">
                        <div class="row">
                            <div class=" col-12">
                                <div class="d-flex flex-column mt-lg-5 ">
                                    <img loading="lazy" class="img-fluid my-2" src="/img/aboutus1.jpg" alt="">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <div class="modal fade" :id="'contact_with_seller_' + getSiteComunicationData.id" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> تواصل معنا </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card seller_card">
                        <div class="img">
                            <img loading="lazy" v-on:click="toSellerGallaryFunc()" :src="ownerImageFunc(getSiteComunicationData.image)"
                                class="" alt="...">
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-center align-items-baseline mb-2">
                                <h6 class="card-title justify-content-center">{{ getSiteComunicationData.name }} </h6>
                            </div>
                            <div class="d-flex justify-content-center">
                                <div class="d-flex flex-column">
                                    <div class="d-flex align-items-center mb-2">
                                        <ul class="addresul text-center">
                                            <li>{{ cityNameFunc(getSiteComunicationData.addressCityId) }} / {{
                                                stateNameFunc(getSiteComunicationData.addressStateId) }} </li>
                                            <li>{{ getSiteComunicationData.addressInfo }}</li>
                                        </ul>
                                    </div>
                                    <div class="card-show">
                                        <div class="d-flex justify-content-center">
                                            <ul class="show-more-details text-center">
                                                <li><svg width="15" height="15" viewBox="0 0 28 28" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z"
                                                            fill="#24DC26"></path>
                                                    </svg> للتواصل: {{ getSiteComunicationData.mobile }} </li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button v-on:click="whatsAppLinkFunc()" type="button" class="btn btn-primary">
                        راسلنا
                        <svg viewBox="0 0 24 24" width="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M17.4145 14.3822C17.1173 14.2334 15.6564 13.5147 15.384 13.4153C15.1117 13.3162 14.9136 13.2667 14.7154 13.5641C14.5173 13.8615 13.9478 14.5309 13.7745 14.7293C13.6012 14.9275 13.4278 14.9524 13.1307 14.8036C12.8335 14.6549 11.876 14.3411 10.7411 13.3287C9.85769 12.5407 9.26129 11.5677 9.08799 11.2702C8.91461 10.9727 9.06943 10.8119 9.21822 10.6637C9.35195 10.5306 9.51546 10.3166 9.66399 10.1431C9.81257 9.96961 9.86209 9.84558 9.96114 9.6474C10.0602 9.44899 10.0107 9.27553 9.93634 9.12682C9.86209 8.97808 9.26779 7.51537 9.02016 6.92034C8.77895 6.34096 8.53397 6.41944 8.35157 6.41024C8.17844 6.40165 7.98013 6.39981 7.78207 6.39981C7.58397 6.39981 7.26201 6.47418 6.98958 6.77159C6.71727 7.06908 5.94959 7.78806 5.94959 9.25059C5.94959 10.7133 7.01434 12.1263 7.16296 12.3246C7.31158 12.523 9.25829 15.5244 12.2393 16.8116C12.9482 17.1178 13.5017 17.3006 13.9333 17.4375C14.6451 17.6637 15.2929 17.6318 15.805 17.5552C16.3759 17.47 17.5631 16.8364 17.8107 16.1424C18.0583 15.4481 18.0583 14.8532 17.984 14.7293C17.9097 14.6053 17.7116 14.5309 17.4145 14.3822ZM11.9925 21.7853H11.9886C10.2148 21.7846 8.47517 21.3081 6.9575 20.4075L6.59654 20.1932L2.85541 21.1746L3.85395 17.527L3.61899 17.153C2.62951 15.5792 2.10688 13.7603 2.10765 11.8925C2.10983 6.44257 6.54415 2.0086 11.9965 2.0086C14.6367 2.00954 17.1185 3.03905 18.9849 4.9075C20.8511 6.77582 21.8782 9.25932 21.8772 11.9005C21.875 17.3509 17.4408 21.7853 11.9925 21.7853ZM20.4052 3.48773C18.1599 1.2398 15.1739 0.00128304 11.9925 0C5.43736 0 0.102301 5.33471 0.0996495 11.8918C0.0987941 13.9879 0.646396 16.0337 1.68711 17.8373L0 24L6.30443 22.3462C8.04154 23.2937 9.99728 23.7931 11.9877 23.7937H11.9926C18.547 23.7937 23.8825 18.4585 23.8852 11.9013C23.8864 8.72361 22.6505 5.73566 20.4052 3.48777"
                                    fill="#000000"></path>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>


    <pageFooter></pageFooter>
</template>
<style scoped></style>