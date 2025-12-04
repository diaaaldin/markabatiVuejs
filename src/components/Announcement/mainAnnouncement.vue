<script>
import { mapState, mapGetters, mapActions } from "vuex";
// import { Urls } from '@/config';

export default {
    data() {
        return {

        }
    },
    mounted() {
        // try init if data already present
        this.initSliderIfReady();
    },
    beforeDestroy() {
        // cleanup slick if initialized
        if (typeof $ !== 'undefined' && $('.slider').hasClass('slick-initialized')) {
            $('.slider').slick('unslick');
        }
    },
    components: {

    },

    emits: {

    },

    created() {
        // Call the function from the store directly when the component is created
            //    this.GetMainAnnouncementActiveOrder();

    },

    computed: {
        ...mapGetters("Announcement", ["getMainAnnouncementData", "getHorizontalAnnouncementData"]),

    },
    watch: {
        // when data arrives, init slider after DOM update
        getMainAnnouncementData(newVal) {
            if (newVal && newVal.length) {
                this.$nextTick(() => {
                    this.initSliderIfReady();
                });
            }
        }
    },
    methods: {
        ...mapActions("Announcement", ["GetMainAnnouncementActiveOrder", "GetHorizontalAnnouncementActiveOrder"]),

        initSliderIfReady() {
            // ensure jquery/slick available and not already initialized
            if (typeof $ === 'undefined' || !$.fn.slick) return;
            const $sl = $('.slider');
            if ($sl.length && !$sl.hasClass('slick-initialized')) {
                this.mainSlider();
            }
        },

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
                    <img loading="lazy" :src="item.image" class="responsive" alt="...">
                </div>
            </div>
        </section>
</template>
<style scoped>
.imageTest{
    background-image:"C:/img\markabatiComponent\homeHeader.png";
}

.slick-slide {
  height: auto !important;
}

.slick-slide img {
  width: 100%;
  height: auto;
}

.slider-main .slider .card-slider {
  width: 100%;
  height: auto; 
}

.responsive {
  display: block;
  max-width: 100%;
  height: auto; 
  object-fit: cover; 
}

.slider-main {
  width: 100%;
}

.slider-main .slider {
  width: 100%;
}
/* @media (max-width: 992px) {

}
@media (max-width: 767px) {
   

} */
</style>