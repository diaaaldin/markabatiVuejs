<script>
import { mapState, mapGetters, mapActions } from "vuex";
// import { Urls } from '@/config';

export default {
    data() {
        return {

        }
    },
    mounted() {
        // Wait a bit for DOM and data to be ready
        this.$nextTick(() => {
            setTimeout(() => {
                this.initSliderIfReady();
            }, 100);
        });
    },
    beforeDestroy() {
        // cleanup slick if initialized
        this.destroySlider();
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

        safeMainAnnouncementData() {
            if (!this.getMainAnnouncementData || !Array.isArray(this.getMainAnnouncementData)) {
                return [];
            }
            return this.getMainAnnouncementData;
        },
    },
    watch: {
        // when data arrives or changes, re-init slider after DOM update
        getMainAnnouncementData: {
            handler(newVal, oldVal) {
                // Destroy existing slider if it exists
                this.destroySlider();
                
                // Only initialize if we have data
                if (newVal && Array.isArray(newVal) && newVal.length > 0) {
                    this.$nextTick(() => {
                        this.initSliderIfReady();
                    });
                }
            },
            immediate: false,
            deep: true
        }
    },
    methods: {
        ...mapActions("Announcement", ["GetMainAnnouncementActiveOrder", "GetHorizontalAnnouncementActiveOrder"]),

        destroySlider() {
            // Destroy slick slider if initialized
            if (typeof $ !== 'undefined' && $.fn.slick) {
                const $sl = $(this.$el).find('.slider');
                if ($sl.length && $sl.hasClass('slick-initialized')) {
                    try {
                        $sl.slick('unslick');
                    } catch (e) {
                        console.warn('Error destroying slider:', e);
                    }
                }
            }
        },

        initSliderIfReady() {
            // ensure jquery/slick available
            if (typeof $ === 'undefined' || !$.fn.slick) {
                // Retry after a short delay if jQuery/slick not ready
                setTimeout(() => this.initSliderIfReady(), 100);
                return;
            }
            
            // Check if we have data
            if (!this.safeMainAnnouncementData || this.safeMainAnnouncementData.length === 0) {
                return;
            }

            // Use scoped selector to only target this component's slider
            const $sl = $(this.$el).find('.slider');
            if ($sl.length && !$sl.hasClass('slick-initialized')) {
                // Ensure DOM is ready
                this.$nextTick(() => {
                    if ($sl.children().length > 0) {
                        this.mainSlider();
                    }
                });
            }
        },

         mainSlider() {
            // Use scoped selector to only target this component's slider
            $(this.$el).find('.slider').slick({
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
   <section class="slider-main" v-if="safeMainAnnouncementData && safeMainAnnouncementData.length > 0">
            <div class="slider">
                <div v-for="(item, index) in safeMainAnnouncementData" :key="index" class="card-slider">
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