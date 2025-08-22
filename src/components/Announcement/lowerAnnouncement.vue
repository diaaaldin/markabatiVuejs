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
    //    this.GetHorizontalAnnouncementActiveOrder();

    },

    computed: {
       ...mapGetters("Announcement", ["getVerticalAnnouncementData", "getHorizontalAnnouncementData"]),


    },
    methods: {
        // ...mapActions("Users", ["CustomerProfileInfo"]),
        ...mapActions("Announcement", ["GetVerticalAnnouncementActiveOrder", "GetHorizontalAnnouncementActiveOrder"]),
//    mainSlider() {
//             $('.slider').slick({
//                 dots: true,
//                 infinite: false,
//                 speed: 300,
//                 slidesToShow: 1,
//                 rtl: true,
//                 autoplay: true,
//                 autoplaySpeed: 2000,
//                 prevArrow: '<button class="slick-prev prev-arrow"> <i class="fa-solid fa-angle-right"></i></button>',
//                 nextArrow: '<button class="slick-next next-arrow"> <i class="fa-solid fa-angle-left"></i></button>',
//                 slidesToScroll: 1,
//                 responsive: [
//                     {
//                         breakpoint: 1200,
//                         settings: {
//                             slidesToShow: 1,
//                             slidesToScroll: 1,
//                         }
//                     },
//                     {
//                         breakpoint: 1008,
//                         settings: {
//                             slidesToShow: 1,
//                             slidesToScroll: 1,
//                         }
//                     },
//                     {
//                         breakpoint: 800,
//                         settings: {
//                             arrows: false,
//                             slidesToShow: 1,
//                             slidesToScroll: 1,
//                         },
//                     }
//                 ]
//             });
//         },


    }
};
</script>

<template>
    <div class="container">
<section class="slider-main ads-main">
            <div class="slider">
                <div v-for="item in getHorizontalAnnouncementData" class="card-slider">
                    <img loading="lazy" :src="item.image" class="card-img-top" alt="...">
                    <!-- <div class="card-body">
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
                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z"
                                                    fill="#24DC26" />
                                            </svg>
                                            المواصفات
                                        </li>
                                        <li>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.2197 6.96967L8.75 11.4393L6.78033 9.4697C6.48744 9.1768 6.01256 9.1768 5.71967 9.4697C5.42678 9.7626 5.42678 10.2374 5.71967 10.5303L8.2197 13.0303C8.5126 13.3232 8.9874 13.3232 9.2803 13.0303L14.2803 8.0303C14.5732 7.73744 14.5732 7.26256 14.2803 6.96967C13.9874 6.67678 13.5126 6.67678 13.2197 6.96967Z"
                                                    fill="white" />
                                            </svg>

                                            محرك v8 توربو بقوة مذهلة
                                        </li>
                                        <li>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.2197 6.96967L8.75 11.4393L6.78033 9.4697C6.48744 9.1768 6.01256 9.1768 5.71967 9.4697C5.42678 9.7626 5.42678 10.2374 5.71967 10.5303L8.2197 13.0303C8.5126 13.3232 8.9874 13.3232 9.2803 13.0303L14.2803 8.0303C14.5732 7.73744 14.5732 7.26256 14.2803 6.96967C13.9874 6.67678 13.5126 6.67678 13.2197 6.96967Z"
                                                    fill="white" />
                                            </svg>
                                            تسارع من 0 إلى 100 كم/س في عدد الثواني
                                        </li>
                                        <li>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.2197 6.96967L8.75 11.4393L6.78033 9.4697C6.48744 9.1768 6.01256 9.1768 5.71967 9.4697C5.42678 9.7626 5.42678 10.2374 5.71967 10.5303L8.2197 13.0303C8.5126 13.3232 8.9874 13.3232 9.2803 13.0303L14.2803 8.0303C14.5732 7.73744 14.5732 7.26256 14.2803 6.96967C13.9874 6.67678 13.5126 6.67678 13.2197 6.96967Z"
                                                    fill="white" />
                                            </svg>
                                            تصميم رياضي فاخر يعكس الإبداع الإيطالي
                                        </li>
                                        <li>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.2197 6.96967L8.75 11.4393L6.78033 9.4697C6.48744 9.1768 6.01256 9.1768 5.71967 9.4697C5.42678 9.7626 5.42678 10.2374 5.71967 10.5303L8.2197 13.0303C8.5126 13.3232 8.9874 13.3232 9.2803 13.0303L14.2803 8.0303C14.5732 7.73744 14.5732 7.26256 14.2803 6.96967C13.9874 6.67678 13.5126 6.67678 13.2197 6.96967Z"
                                                    fill="white" />
                                            </svg>

                                            أنظمة تكنولوجيا متقدمة لتجربة قيادة لا تنسى
                                        </li>

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
                    </div> -->
                </div>

            </div>
        </section>
    </div>
  
</template>

<style scoped>
.imageTest{
    background-image: "C:/img\markabatiComponent\bottomAnnouncement.png";
}
.slick-list {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px !important;
    border-radius: 20px;
}
/* .slider-main .slider .card-slider img{
    border-radius: 20px;
    width: 100%;
} */

.slider-main.ads-main .slider .card-slider {
  /* height: 500px; */
    width: 100%;
    height: auto;
  
}
.slider-main .slider .card-slider img {
  display: block;
  width: 100%;
  height: auto; /* Keeps aspect ratio */
  object-fit: cover; /* or "contain" if you want the whole image visible */
  border-radius: 20px;
}

.slick-slide {
  height: auto !important;
}

.slick-slide img {
  width: 100%;
  height: auto;
}
.slider-main.ads-main {
  margin-top: 50px;
  margin-bottom: 50px;
}


</style>