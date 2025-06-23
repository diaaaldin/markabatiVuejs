<script>
import { useHead } from '@vueuse/head'
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import axios from "axios";


import pageNav from '@/components/lightNavbar.vue';
import pageFooter from '@/components/footer.vue';
import sellerCard from '@/components/Cards/sellerCard.vue';


export default {
    data() {
        return {}
    },
    mounted() {
        useHead({
            title: 'Seller | Markabati',
            meta: [
                {
                    name: `description`,
                    content: 'Markabati is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties.',
                },
            ],
        });

        //document.addEventListener('click', this.closeDropdown);
    },
    components: {
        pageNav,
        pageFooter,
        sellerCard
    },

    emits: {

    },

    
    watch: {
       
    },

    computed: {
      
    },
    methods: {
       
    }
};
</script>
<template>
    <pageNav></pageNav>

    <div class="header-title text-center ">
        <div class="breadcrumb-outer campany">
            <div class="container">
                <div class="breadcrumb-content text-center">
                    <h1 class="mb-0 white">البائعين</h1>
                </div>

                <div class="d-flex justify-content-between mt-5 search_input">
                    <div class="input-group">
                        <input  type="text"
                            placeholder="ابحث عن بائع..." class="form-control search_input-tab  p-3 search">
                        <button class="input-group-text search_icon-tab"><i class="fas fa-search"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>

        <section class=" mt-5">
        <div class="container">
            <div class="row">
              
                <div class="col-12">
                    <div class="container white_card mt-2">
                        <div class="row">
                            <sellerCard></sellerCard>
                            <sellerCard></sellerCard>
                            <sellerCard></sellerCard>
                            <sellerCard></sellerCard>
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


    <pageFooter></pageFooter>
</template>
<style scoped></style>