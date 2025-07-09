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
        return {

            dataSearch: {
                // exceptionIds: [],
                name: "",
                page: 1,
                pageSize: 3
            },

             pagination: {
                currentPage: 1,
                pageCount: 3,
                pageSize: 3,
                rowCount: 9,
            },
        }
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

    created() {
        this.initFunc();
    },

    computed: {
        ...mapGetters("Users", ["getUsersData"]),

        startItem() {
            return (this.pagination.currentPage - 1) * this.pagination.pageSize + 1;
        },
        endItem() {
            return Math.min(this.pagination.currentPage * this.pagination.pageSize, this.pagination.rowCount);
        }
    },
    methods: {
        ...mapActions("Users", ["GetSellers"]),

        initFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });

            this.GetSellers(this.dataSearch).then(Response => {
                this.pagination = this.getUsersData.users.pagination;
                // console.log("sellers : ", this.getUsersData);
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
          
            this.GetSellers(this.dataSearch).then(Response => {
                this.pagination = this.getUsersData.users.pagination;
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

         goToPage(page) {
            if (page < 1 || page > this.pagination.pageCount) return;
            this.dataSearch.page = page
            this.SearchChangeFunc();
        },

    }
};
</script>
<template>
    <pageNav></pageNav>

    <div class="sellers">
        <div class="header-title bg text-center ">
            <div class="container">
                <div class="text-center">
                    <h1>الـبـائـعـيـن</h1>
                </div>

                <div class="d-flex justify-content-between mt-5 search_input">
                    <div class="input-group">
                        <input @input="SearchChangeFunc" v-model="dataSearch.name" type="text" placeholder="ابحث عن بائع..."
                            class="form-control search_input-tab  p-3 search">
                        <button class="input-group-text search_icon-tab"><i class="fas fa-search"></i></button>
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
                                 <sellerCard v-for="item in this.getUsersData.users.data" :seller='item' ></sellerCard> 
                            </div>

                            <!-- <div class="row">
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
                            </div> -->
                             <div class="row">
                            <div class="pag" >
                                <p class="count">
                                    أظهر {{ startItem }} إلى {{ endItem }} من {{ pagination.rowCount }}
                                </p>
                                <ul class="pagination">
                                    <li :class="{ disabled: pagination.currentPage === 1 }">
                                        <a href="#" @click.prevent="goToPage(pagination.currentPage - 1)">
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </a>
                                    </li>
                                    <li v-for="page in pagination.pageCount" :key="page"
                                         :class="{ active: pagination.currentPage === page }">
                                        <a href="#" @click.prevent="goToPage(page)">
                                            {{ page }}
                                        </a>
                                    </li>
                                    <li :class="{ disabled: pagination.currentPage === pagination.pageCount }">
                                        <a href="#" @click.prevent="goToPage(pagination.currentPage + 1)">
                                            <i class="fa-solid fa-arrow-left"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        </div>
                    </div>

                    <!-- end right side -->
                </div>
            </div>
        </section>

    </div>


    <pageFooter></pageFooter>
</template>
<style scoped></style>