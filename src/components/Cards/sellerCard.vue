<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';

export default {
    data() {
        return {

        }
    },
    props: {
        seller: {
            type: Object,
            default() {
                return {
                    id: 0,
                    name: "",
                    email: "",
                    mobile : "",
                    addressStateId: 0,
                    addressCityId: 0,
                    AddressInfo: "",
                    slug: "",
                    image: "",

                }
            }
        },
    },

     mounted() {

        },
        components: {

        },

        emits: {

        },

        created() {
        },

        computed: {
            ...mapGetters("Code", ["getStatesData", "getCitiesData"]),
            userImage() {
                const imageUrl = this.seller && this.seller.image
                    ? this.seller.image
                    : "/img/profile-icon.png";
                return imageUrl;
            }
        },
        
        methods: {
            ...mapActions("Code", ["GetStates", "GetCities"]),

            stateNameFunc(id) {
            // console.log("this.getStatesData : ",id);
            if (!this.getStatesData || !Array.isArray(this.getStatesData)) {
                return "";
            }
            let res = this.getStatesData.find(x => x.id === id);
            if (res) return res.name;
            else return "";
        },

        cityNameFunc(id) {
            // console.log("this.getCitiesData : ", id);
            if (!this.getCitiesData || !Array.isArray(this.getCitiesData)) {
                return "";
            }
            let res = this.getCitiesData.find(x => x.id === id);
            if (res) return res.name;
            else return "";
        },
            toGallaryFunc(){
               this.$router.push({ name: "gallary", params: { slug: this.seller.slug } });
            }
        }

};
</script>
<template>
    <div class="col-12 col-lg-3 col-md-6 mt-4 text-center">
        <div class="card seller_card">
            <div class="img">
                <img loading="lazy" :src="userImage" class="" alt="...">
            </div>
            <div class="card-body ">
                <div class="d-flex justify-content-center align-items-baseline mb-2">
                    <h6 class="card-title justify-content-center">{{ seller.name }}</h6>
                </div>
                <div class="d-flex justify-content-center">
                    <div class=" d-flex  flex-column">
                        <div class="d-flex align-items-center mb-2">
                            <ul class="addresul">
                                <li>{{ cityNameFunc(seller.addressCityId) }} / {{ stateNameFunc(seller.addressStateId) }} </li>
                                <li>{{ seller.AddressInfo }} </li>
                            </ul>
                        </div>

                        <div class="card-show">
                            <div class=" d-flex justify-content-center">
                                <ul class="show-more-details text-center">
                                    <li>
                                        <svg width="15" height="15" viewBox="0 0 28 28" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z"
                                                fill="#24DC26">
                                            </path>
                                        </svg> للتواصل: {{ seller.mobile }}
                                    </li>
                                </ul>
                            </div>
                            <div class=" d-flex align-items-center ">
                                <a @click="toGallaryFunc()"
                                    class="btn btn-light p-3 contact-with-seller w-100">زيارة المعرض</a>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>

</template>
<style scoped></style>