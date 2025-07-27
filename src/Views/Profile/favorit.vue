<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import favoritProduct from '@/components/Cards/favoritProduct.vue';

export default {
  data() {
    return {
    }
  },

  mounted() {

  },

  components: {
    favoritProduct,
  },

  emits: {

  },

  created() {
    // Call the function from the store directly when the component is created
    this.initFunc();
  },

  computed: {
    ...mapGetters("Vehicles", ["getFavoriteVehiclesData"]),
  },

  methods: {
    ...mapActions("Vehicles", ["GetVehiclesFavorite"]),

    initFunc() {
      const loading = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        text: "",
      });
      this.GetVehiclesFavorite().then(response => {
        //  console.log("getFavoriteVehiclesData : ", this.getFavoriteVehiclesData);
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

  }
};
</script>
<template>
  <!-- right side container -->
  <div class="col-12 col-lg-9  ">
    <div class="container white_card px-4 pt-3 pb-2 mt-3 mt-lg-0 right-side">
      <div class="tab-content px-0" id="myTabContent">
        <div class="favorite-product" id="">
          <!-- start card link -->
          <div v-if="!getFavoriteVehiclesData.vehicles.data || getFavoriteVehiclesData.vehicles.data.length === 0"
            class="alert alert-danger mt-3 d-flex justify-content-center">
            {{ $t('general_empty_table') }}
          </div>

          <favoritProduct v-else v-for="(item, index) in getFavoriteVehiclesData.vehicles.data" :product='item'>
          </favoritProduct>
          <!-- <favoritProduct></favoritProduct>
          <favoritProduct></favoritProduct>
          <favoritProduct></favoritProduct>
          <favoritProduct></favoritProduct> -->
          <!-- end card link -->

        </div>
      </div>

      <!-- <div  v-if="!getFavoritProductsData || getFavoritProductsData.length === 0" class="alert alert-danger mt-3">
        لا يوجد سيارات مفضلة لديك
      </div> -->

    </div>
  </div>
  <!-- end right side  -->
</template>
<style scoped></style>