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

    <!-- end header second -->
    <div class="header-title bg text-center">
        <div class="breadcrumb-outer events">
            <div class="container">
                <div class="breadcrumb-content text-center">
                    <h1 class="mb-5 white">من نحن</h1>
                </div>
            </div>
        </div>
    </div>
    <section class="about-us mt-5">
        <div class="container"> 
            <div class="row">
                <div class="col-12 col-lg-6">
                    <div class="me-3 mt-5">
                        <div class="ms-4">
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

    
    <pageFooter></pageFooter>
</template>
<style scoped>
</style>