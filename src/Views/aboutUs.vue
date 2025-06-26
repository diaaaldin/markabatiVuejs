<script>
//import { mapState, mapGetters, mapActions } from "vuex";
import { useHead } from '@vueuse/head'
import darkNavbar from '@/components/darkNavbar.vue';
import pageFooter from '@/components/footer.vue';


import pageNav from '@/components/lightNavbar.vue';


export default {
 
    data() {
        return {

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
        darkNavbar,
        pageFooter,
        pageNav,

    },

    emits: {

    },

    created() {
        // Call the function from the store directly when the component is created

    },

   computed: {
      
    },
    methods: {
        //...mapActions(),
        
        
    }
};
</script>
<template>
    <pageNav></pageNav>

    <div class="about-us">
        <div class="header-title bg text-center">
                <div class="container">
                    <div class="text-center">
                        <h1 class="mb-5 white">مـن نـحـن</h1>
                    </div>
                </div>
        </div>
        <section class="about-us mt-5">
            <div class="container"> 
                <div class="row">
                    <div class="col-12 col-lg-6">
                        <div class="me-3 mt-5">
                            <div class="">
                                <h2 class="title mb-0"> مرحباً بك في متجر مركبتي </h2>
                                <p class="item_about_us mt-5" >
                                    حقق أحلامك على الطريق مع أفضل السيارات للبيع والإيجار! اختر من بين مجموعة فاخرة ومميزة تلبي كل احتياجاتك بأسعار تنافسية وخدمات لا تُضاهى. سواء كنت تبحث عن الفخامة، الأداء، أو الراحة، نحن هنا لنمنحك تجربة قيادة تفوق التوقعات!
                                </p>
                            </div>
                            <ul class="ul_about mt-3 ">
                                <li class="item_about_us py-2"> هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص .</li>
                                <li class="item_about_us py-2"> هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص .</li>
                                <li class="item_about_us py-2"> هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص .</li>
                            </ul>
                            <ul class="ul_about_green">
                                <li class="item_about_us_green">
                                      <svg width="15" height="15" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                         <path d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z" fill="#24DC26">
                                         </path>
                                      </svg>   للتواصل: 0598266845 </li>
                                <li class="item_about_us_green">
                                      <svg width="15" height="15" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                         <path d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z" fill="#24DC26">
                                         </path>
                                      </svg>   للتواصل: 0598266845 </li>
                            </ul>
                                                                                           
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
<style scoped>
</style>