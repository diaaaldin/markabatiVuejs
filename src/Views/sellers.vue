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
            windowWidth: window.innerWidth,
        }
    },
    // mounted() {
    //     useHead({
    //         title: 'Seller | Markabati',
    //         meta: [
    //             {
    //                 name: `description`,
    //                 content: 'Markabati is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties.',
    //             },
    //         ],
    //     });
    //     //document.addEventListener('click', this.closeDropdown);
    // },

    mounted() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
        
        useHead({
            title: 'مركبتي | معارض البائعون ',

            meta: [
                {
                    name: 'description',
                    content: 'دليل معارض السيارات والموزعين المعتمدين في فلسطين. تصفح ملفات البائعون الموثوقين مع تفاصيل المركبات المعروضة للبيع وتقييمات العملاء.'
                },
                {
                    name: 'keywords',
                    content: 'معارض سيارات فلسطين, موزعي سيارات, بائعي سيارات موثوقين, معارض مركبات, دليل بائعين السيارات, تقييم بائعين السيارات, المعارض, البائعون, وكلاء سيارات في فلسطين , مركبتي فلسطين'
                },
                {
                    property: 'og:title',
                    content: 'البائعون | دليل معارض وموزعي السيارات في فلسطين | مركبتي'
                },
                {
                    property: 'og:description',
                    content: 'دليل معارض السيارات والموزعين المعتمدين في فلسطين. تصفح ملفات البائعون الموثوقين مع تفاصيل المركبات المعروضة للبيع وتقييمات العملاء.'
                },
                {
                    property: 'og:type',
                    content: 'website'
                },
                {
                    name: 'robots',
                    content: 'index, follow'
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
                        "@type": "WebPage",
                        "name": "دليل البائعون | مركبتي",
                        "description": "دليل معارض وموزعي السيارات المعتمدين في فلسطين",
                        "url": "https://markabatistore.com/sellers",
                        "breadcrumb": {
                            "@type": "BreadcrumbList",
                            "itemListElement": [{
                                "@type": "ListItem",
                                "position": 1,
                                "name": "الرئيسية",
                                "item": "https://markabatistore.com/"
                            }, {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "البائعون"
                            }]
                        }
                    })
                }
            ]
        });
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
        },
        visiblePages() {
            const total = this.pagination.pageCount;
            const current = this.pagination.currentPage;
            const pages = [];
            
            // For mobile: show max 3 pages, for desktop: show max 5 pages
            const maxVisible = this.windowWidth < 768 ? 3 : 5;
            
            if (total <= maxVisible) {
                // Show all pages if total is less than max visible
                for (let i = 1; i <= total; i++) {
                    pages.push(i);
                }
            } else {
                // Show pages around current page
                let start = Math.max(1, current - Math.floor(maxVisible / 2));
                let end = Math.min(total, start + maxVisible - 1);
                
                // Adjust start if we're near the end
                if (end - start < maxVisible - 1) {
                    start = Math.max(1, end - maxVisible + 1);
                }
                
                for (let i = start; i <= end; i++) {
                    pages.push(i);
                }
            }
            
            return pages;
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

        handleResize() {
            this.windowWidth = window.innerWidth;
        },

    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    }
};
</script>
<template>
    <pageNav></pageNav>

    <div class="sellers">
        <div class="header-title bg text-center ">
            <div class="container">
                <div class="text-center">
                    <h1>الـبـائـعـون</h1>
                </div>

                <div class="d-flex justify-content-between mt-5 search_input">
                    <div class="input-group">
                        <input @input="SearchChangeFunc" v-model="dataSearch.name" type="text"
                            placeholder="ابحث عن بائع..." class="form-control search_input-tab  p-3 search">
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
                                <sellerCard v-for="item in this.getUsersData.users.data" :key="item.id" :seller='item'></sellerCard>
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
                                <div class="pag">
                                    <p class="count">
                                        أظهر {{ startItem }} إلى {{ endItem }} من {{ pagination.rowCount }}
                                    </p>
                                    <ul class="pagination">
                                        <li :class="{ disabled: pagination.currentPage === 1 }">
                                            <a href="#" @click.prevent="goToPage(pagination.currentPage - 1)" class="pagination-link">
                                                <i class="fa-solid fa-arrow-right"></i>
                                            </a>
                                        </li>
                                        <li v-if="visiblePages[0] > 1" class="pagination-ellipsis">
                                            <span>...</span>
                                        </li>
                                        <li v-for="page in visiblePages" :key="page"
                                            :class="{ active: pagination.currentPage === page }">
                                            <a href="#" @click.prevent="goToPage(page)" class="pagination-link">
                                                {{ page }}
                                            </a>
                                        </li>
                                        <li v-if="visiblePages[visiblePages.length - 1] < pagination.pageCount" class="pagination-ellipsis">
                                            <span>...</span>
                                        </li>
                                        <li :class="{ disabled: pagination.currentPage === pagination.pageCount }">
                                            <a href="#" @click.prevent="goToPage(pagination.currentPage + 1)" class="pagination-link">
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
<style scoped>
.pag {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 20px 0;
}

.pag .count {
    margin: 0;
    font-size: 14px;
    color: #666;
    text-align: center;
}

.pag .pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 5px;
    list-style: none;
    padding: 0;
    margin: 0;
}

.pag .pagination li {
    min-width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 8px;
    border: 1px solid #ccced2;
    transition: all 0.4s ease-in-out;
    cursor: pointer;
}

.pag .pagination li.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}

.pag .pagination li.disabled a {
    pointer-events: none;
}

.pag .pagination li.pagination-ellipsis {
    border: none;
    background: transparent;
    cursor: default;
    min-width: auto;
    padding: 0 5px;
}

.pag .pagination li.pagination-ellipsis span {
    color: #666;
    font-size: 16px;
}

.pag .pagination li a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    text-decoration: none;
    padding: 0 8px;
    -webkit-tap-highlight-color: transparent;
}

.pag .pagination li.active {
    background-color: black;
    border-color: black;
}

.pag .pagination li.active a {
    color: white;
}

.pag .pagination li:not(.disabled):not(.pagination-ellipsis):hover {
    background-color: black;
    border-color: black;
}

.pag .pagination li:not(.disabled):not(.pagination-ellipsis):hover a {
    color: white;
}

/* Mobile responsive styles */
@media screen and (max-width: 768px) {
    .pag {
        padding: 15px 0;
    }

    .pag .count {
        font-size: 12px;
        margin-bottom: 10px;
    }

    .pag .pagination {
        gap: 3px;
        width: 100%;
        justify-content: center;
    }

    .pag .pagination li {
        min-width: 36px;
        height: 36px;
        margin: 0;
        font-size: 14px;
    }

    .pag .pagination li a {
        padding: 0 4px;
        font-size: 14px;
    }

    .pag .pagination li.pagination-ellipsis {
        min-width: 20px;
        padding: 0 2px;
    }

    .pag .pagination li.pagination-ellipsis span {
        font-size: 14px;
    }
}

@media screen and (max-width: 480px) {
    .pag .pagination li {
        min-width: 32px;
        height: 32px;
        font-size: 12px;
    }

    .pag .pagination li a {
        font-size: 12px;
        padding: 0 2px;
    }
}
</style>