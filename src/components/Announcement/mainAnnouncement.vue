<script>
import { mapState, mapGetters, mapActions } from "vuex";
// import { Urls } from '@/config';

export default {
    data() {
        return {

        }
    },
    mounted() {
        // this.mainSlider();

    },
    components: {

    },

    emits: {

    },

    created() {
        // Call the function from the store directly when the component is created
               this.GetMainAnnouncementActiveOrder();

    },

    computed: {
        ...mapGetters("Announcement", ["getMainAnnouncementData", "getHorizontalAnnouncementData"]),

    },
    methods: {
        ...mapActions("Announcement", ["GetMainAnnouncementActiveOrder", "GetHorizontalAnnouncementActiveOrder"]),

         mainSlider() {
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
    }
};
</script>
<template>
   <section class="slider-main">
            <div class="slider">
                <div v-for="item in getMainAnnouncementData" class="card-slider">
                    <img :src="item.image" class="card-img-top" alt="...">
                    <!-- <div class="card-body">
                        <div class="d-flex justify-content-between mb-2">
                            <h1 class="card-title justify-content-start">سيارتك المثالية بين يديك, ابدأ رحلتك معنا!
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
                                    <a href="">استكشف معنا</a>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
                <!-- <div class="card-slider">
                    <img src="/img/slider/s2.png" class="card-img-top" alt="...">
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
                </div> -->

            </div>
        </section>
</template>
<style scoped>
.imageTest{
    background-image:"C:/img\markabatiComponent\homeHeader.png";
}

@media (max-width: 992px) {
.slider-main .slider .card-slider{
    height: 500px;
}
}
@media (max-width: 767px) {
    .slider-main .slider .card-slider{
        height: 230px;
    }

}
</style>