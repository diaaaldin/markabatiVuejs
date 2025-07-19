<script>
import { RouterView } from 'vue-router';
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import FsLightbox from "fslightbox-vue/v3";
import Vehicle360View from "@/components/Image360/Vehicle360View.vue";
import axios from "axios";
import { VehicleStatusEnum, CurrenceEnum } from '@/config/config.js';


export default {
  data() {
    return {
      data: {
        statusId: 0,
      },

      dataimg360: {
        id: 0,
        imagePath: ""
      },
      img360: "",

      vehicleStatus: VehicleStatusEnum,

      selectedVehicle: {
        id: 0,
        image: "",
        image360: "",
        images: null,
      },

      dataStar: {
        id: 0,
        message: "",
        image : "",
        vehicleId: 0,
        durationDay: 0,
        dailyPrice: 0,
        totalPrice: 0,
        payBilImage: "",
        paymentMethod: 0,
      },

      orderDate: "",
    }
  },

  mounted() {

  },
  beforeUnmount() {

  },

  components: {
    FsLightbox,
    Vehicle360View,
  },

  emits: {

  },

  created() {
    this.initFunc();
  },

  computed: {
    ...mapGetters("Vehicles", ["getMyVehiclesData"]),
    ...mapGetters("Orders", ["getOrderDateTime", "getOrderDailyPrice"]),


  },

  methods: {
    ...mapActions("Vehicles", ["GetMyVehicles", "GetVehicelForUpdate", "UpdateVehicleImage360", "DeleteVehicle"]),
    ...mapActions("Orders", ["CreateStarVehicleOrder"]),
    ...mapActions("Orders", ["CreateAnnouncementOrder", "GetStarVehicleOrderDate", "GetStarVehicleOrderDailyPrice" , "SaveOrderDataToState"]),


    initFunc() {
      const loading = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        text: "",
      });
      this.GetMyVehicles(this.data.statusId).then(Response => {
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
      this.GetMyVehicles().then(Response => {
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

    deleteFunc() {
      if (this.checkDeleteValidation()) {

        const loading = ElLoading.service({
          lock: true,
          background: 'rgba(0, 0, 0, 0.7)',
          text: "",
        });

        this.DeleteVehicle(this.data.id).then(Response => {
          //console.log(Response);
          this.$moshaToast('تمت عملية حذف المركبة', {
            hideProgressBar: 'false',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'success',
            timeout: 3000,
          });
          loading.close();
          this.GetData();
          $('#delete_vehicle').modal('hide');
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
      }
    },

    checkDeleteValidation() {
      if (this.data.id == 0) {
        this.$moshaToast('error in item select', {
          hideProgressBar: 'false',
          position: 'top-center',
          showIcon: 'true',
          swipeClose: 'true',
          type: 'warning',
          timeout: 3000,
        });
        return false;
      }
      return true;
    },

    starToPaymentFunc() {
      if (this.checkStarValidation()) {
        this.SaveOrderDataToState(this.dataStar).then((Response) => {
          $('#vehicle_star_modal').modal('hide');
          this.$router.push({ name: "payment" });
        });
      }
    },

    checkStarValidation() {
      if (this.dataStar.vehicleId == 0) {
        this.$moshaToast('هنالك خطأ في تحديد المركبة', {
          hideProgressBar: 'false',
          position: 'top-center',
          showIcon: 'true',
          swipeClose: 'true',
          type: 'warning',
          timeout: 3000,
        });
        return false;
      } else if (this.dataStar.durationDay == 0) {
        this.$moshaToast('حددالطلب بالأيام ', {
          hideProgressBar: 'false',
          position: 'top-center',
          showIcon: 'true',
          swipeClose: 'true',
          type: 'warning',
          timeout: 3000,
        });
        return false;
      }
      return true;
    },

    Changeimg360Func() {
      if (this.checkChangeimg360Validation()) {
        const loading = ElLoading.service({
          lock: true,
          background: 'rgba(0, 0, 0, 0.7)',
          text: "",
        });
        this.UpdateVehicleImage360(this.dataimg360).then(Response => {
          this.$moshaToast('تمت عملية التعديل بنجاح', {
            hideProgressBar: 'false',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'success',
            timeout: 3000,
          });
          loading.close();
          this.GetData();
          this.clearData();
          $('#update_360_modal').modal('hide');
        }).catch(error => {
          if (error.response && error.response.status === 401) {
            this.$moshaToast(this.$t('general_user_not_allow_error_message'), {
              hideProgressBar: 'false',
              position: 'top-center',
              showIcon: 'true',
              swipeClose: 'true',
              type: 'warning',
              timeout: 3000,
            });
          } else {
            // Handle other errors with the provided message from the response
            this.$moshaToast(error.response?.data?.message || 'An error occurred', {
              hideProgressBar: 'false',
              position: 'top-center',
              showIcon: 'true',
              swipeClose: 'true',
              type: 'warning',  // Default type is 'warning'
              timeout: 3000,
            });
          }
          loading.close();
        });
      }
    },

    checkChangeimg360Validation() {
      if (this.dataimg360.id === 0) {
        this.$moshaToast('هنالك خطأ في تحديد المركبة', {
          hideProgressBar: 'false',
          position: 'top-center',
          showIcon: 'true',
          swipeClose: 'true',
          type: 'warning',
          timeout: 3000,
        });
        return false;
      } else if (this.dataimg360.imagePath === "") {
        this.$moshaToast('قم بإضافة صورة أولاً', {
          hideProgressBar: 'false',
          position: 'top-center',
          showIcon: 'true',
          swipeClose: 'true',
          type: 'warning',
          timeout: 3000,
        });
        return false;
      }
      return true;
    },

    selectItemForUpdate(id) {
      const loading = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        text: "",
      });

      this.GetVehicelForUpdate(id).then(Response => {
        this.$router.push({ name: "profile_update_vehicle" });
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

    selectItem(id) {
      const selectedVehicle = this.getMyVehiclesData.find(x => x.id === id);

      if (selectedVehicle) {
        this.data.id = selectedVehicle.id;
        this.data.vehicleId = selectedVehicle.id;
        this.dataimg360.id = selectedVehicle.id;
        this.dataStar.vehicleId = selectedVehicle.id;
      }
    },

    selectItemForStar(id) {
      const selectedVehicle = this.getMyVehiclesData.find(x => x.id === id);

      if (selectedVehicle) {
        this.dataStar.vehicleId = selectedVehicle.id;
        this.dataStar.image = selectedVehicle.image;
        this.orderDate = "";
        this.GetStarVehicleOrderDate().then((Response) => {
          let stringDate = this.formatDate(Response);
          this.orderDate = stringDate;
        });
        this.GetStarVehicleOrderDailyPrice().then((Response) => {
          this.dataStar.dailyPrice = Response;
        });
      }

    },

    clearData() {
      this.data.vehicleId = 0;
      this.selectedVehicle.id = 0;
      this.selectedVehicle.image = "";
      this.selectedVehicle.image360 = "";
      this.selectedVehicle.images = [];

    },

    formatDate(dateString) {
      const date = new Date(dateString);
      if (isNaN(date)) return '';
      return date.getFullYear() + '-' +
        String(date.getMonth() + 1).padStart(2, '0') + '-' +
        String(date.getDate()).padStart(2, '0');
    },

    formatCurrency(value, currency) {
      let currencyCode = "";

      switch (currency) {
        case CurrenceEnum.NIS:
          currencyCode = "ILS";
          break;
        case CurrenceEnum.JOD:
          currencyCode = "JOD";
          break;
        default:
          currencyCode = "USD";
      }

      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        // Allows up to 1 decimal digit
        maximumFractionDigits: 1
      }).format(value);
    },
    
    formatCurrencyStarOrder(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: "ILS",
        // Allows up to 1 decimal digit
        maximumFractionDigits: 0
      }).format(value);
    },

    OpenFullScreenFunc(id) {
      this.selectedVehicle.images = null;
      this.selectedVehicle.id = id;
      const foundVehicle = this.getMyVehiclesData.find(element => element.id === this.selectedVehicle.id);
      if (foundVehicle) {
        this.selectedVehicle.images = foundVehicle.images
      }
      this.toggler = !this.toggler;
    },

    image360ShowFunc(id) {
      const foundItem = this.getMyVehiclesData.find(element => element.id === id);
      if (foundItem) {
        this.selectedVehicle.image360 = foundItem.image360;
        $('#image360_modal').modal('show');
      }
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          this.dataimg360.imagePath = e.target.result;
          this.img360 = e.target.result; // Update with the file's data URL
        };
        reader.onerror = () => {
          console.error("Failed to read the file.");
        };
        reader.readAsDataURL(file);
      }
    },

    countTotalPriceFunc() {
      this.dataStar.totalPrice = this.dataStar.dailyPrice * this.dataStar.durationDay;
    },

  }
};
</script>
<template>

  <!-- right side container -->
  <div class="col-12 col-lg-9 myvehicles">
    <div class="ads">
      <div class="add">
        <router-link :to="{ name: 'profile_add_vehicle' }" class="option">{{
          $t('profile_btn_addVehicel') }}
          <svg viewBox="0 0 24 24" width="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path opacity="0.4"
                d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z"
                fill="#292D32"></path>
              <path
                d="M16 11.25H12.75V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V11.25H8C7.59 11.25 7.25 11.59 7.25 12C7.25 12.41 7.59 12.75 8 12.75H11.25V16C11.25 16.41 11.59 16.75 12 16.75C12.41 16.75 12.75 16.41 12.75 16V12.75H16C16.41 12.75 16.75 12.41 16.75 12C16.75 11.59 16.41 11.25 16 11.25Z"
                fill="#292D32"></path>
            </g>
          </svg>
        </router-link>

      </div>
    </div>
    <div class="container white_card px-4 pt-4 pb-0 mt-3 mt-lg-0 right-side">
      <div class="table-responsive">
        <table class="table text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">نوع المركبة</th>
              <th scope="col">موديل المركبة</th>
              <th scope="col">المسافة المقطوعة / كم</th>
              <th scope="col">سعر المركبة</th>
              <th scope="col">صورة المركبة </th>
              <th scope="col">حالة المركبة</th>
              <th scope="col">معاينة المركبة</th>
              <th scope="col">معاينة صورة 360</th>
              <th scope="col">مشاهدات</th>
              <th scope="col">خيارات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in getMyVehiclesData">
              <td class="id">{{ index + 1 }}</td>
              <td>{{ item.brandName }} </td>
              <td>{{ item.modelName }}</td>
              <td>{{ item.meals }}</td>
              <td>{{ formatCurrency(item.price, item.currency) }}</td>
              <td>
                <img :src="item.image" class="img-responsive table-img" alt="product image" height="80">
              </td>
              <td>
                <span v-if="item.statusId == vehicleStatus.accepted" class="availabe">{{ item.statusName }}</span>
                <span v-else-if="item.statusId == vehicleStatus.pending" class="warning">{{ item.statusName }}</span>
                <span v-else class="not-availabe">{{ item.statusName }}</span>
              </td>
              <td>
                <svg v-on:click="OpenFullScreenFunc(item.id)" viewBox="0 0 24 24" width="24" height="24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <g opacity="0.5">
                      <path
                        d="M14 2.75C15.9068 2.75 17.2615 2.75159 18.2892 2.88976C19.2952 3.02503 19.8749 3.27869 20.2981 3.7019C20.7852 4.18904 20.9973 4.56666 21.1147 5.23984C21.2471 5.9986 21.25 7.08092 21.25 9C21.25 9.41422 21.5858 9.75 22 9.75C22.4142 9.75 22.75 9.41422 22.75 9L22.75 8.90369C22.7501 7.1045 22.7501 5.88571 22.5924 4.98199C22.417 3.97665 22.0432 3.32568 21.3588 2.64124C20.6104 1.89288 19.6615 1.56076 18.489 1.40314C17.3498 1.24997 15.8942 1.24998 14.0564 1.25H14C13.5858 1.25 13.25 1.58579 13.25 2C13.25 2.41421 13.5858 2.75 14 2.75Z"
                        fill="#26d829"></path>
                      <path
                        d="M2.00001 14.25C2.41422 14.25 2.75001 14.5858 2.75001 15C2.75001 16.9191 2.75289 18.0014 2.88529 18.7602C3.00275 19.4333 3.21477 19.811 3.70191 20.2981C4.12512 20.7213 4.70476 20.975 5.71085 21.1102C6.73852 21.2484 8.09318 21.25 10 21.25C10.4142 21.25 10.75 21.5858 10.75 22C10.75 22.4142 10.4142 22.75 10 22.75H9.94359C8.10583 22.75 6.6502 22.75 5.51098 22.5969C4.33856 22.4392 3.38961 22.1071 2.64125 21.3588C1.95681 20.6743 1.58304 20.0233 1.40762 19.018C1.24992 18.1143 1.24995 16.8955 1.25 15.0964L1.25001 15C1.25001 14.5858 1.58579 14.25 2.00001 14.25Z"
                        fill="#26d829"></path>
                      <path
                        d="M22 14.25C22.4142 14.25 22.75 14.5858 22.75 15L22.75 15.0963C22.7501 16.8955 22.7501 18.1143 22.5924 19.018C22.417 20.0233 22.0432 20.6743 21.3588 21.3588C20.6104 22.1071 19.6615 22.4392 18.489 22.5969C17.3498 22.75 15.8942 22.75 14.0564 22.75H14C13.5858 22.75 13.25 22.4142 13.25 22C13.25 21.5858 13.5858 21.25 14 21.25C15.9068 21.25 17.2615 21.2484 18.2892 21.1102C19.2952 20.975 19.8749 20.7213 20.2981 20.2981C20.7852 19.811 20.9973 19.4333 21.1147 18.7602C21.2471 18.0014 21.25 16.9191 21.25 15C21.25 14.5858 21.5858 14.25 22 14.25Z"
                        fill="#26d829"></path>
                      <path
                        d="M9.94359 1.25H10C10.4142 1.25 10.75 1.58579 10.75 2C10.75 2.41421 10.4142 2.75 10 2.75C8.09319 2.75 6.73852 2.75159 5.71085 2.88976C4.70476 3.02503 4.12512 3.27869 3.70191 3.7019C3.21477 4.18904 3.00275 4.56666 2.88529 5.23984C2.75289 5.9986 2.75001 7.08092 2.75001 9C2.75001 9.41422 2.41422 9.75 2.00001 9.75C1.58579 9.75 1.25001 9.41422 1.25001 9L1.25 8.90369C1.24995 7.10453 1.24992 5.8857 1.40762 4.98199C1.58304 3.97665 1.95681 3.32568 2.64125 2.64124C3.38961 1.89288 4.33856 1.56076 5.51098 1.40314C6.65019 1.24997 8.10584 1.24998 9.94359 1.25Z"
                        fill="#26d829"></path>
                    </g>
                    <path
                      d="M12 10.75C11.3096 10.75 10.75 11.3096 10.75 12C10.75 12.6904 11.3096 13.25 12 13.25C12.6904 13.25 13.25 12.6904 13.25 12C13.25 11.3096 12.6904 10.75 12 10.75Z"
                      fill="#26d829"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M5.89243 14.0598C5.29747 13.3697 5 13.0246 5 12C5 10.9754 5.29748 10.6303 5.89242 9.94021C7.08037 8.56222 9.07268 7 12 7C14.9273 7 16.9196 8.56222 18.1076 9.94021C18.7025 10.6303 19 10.9754 19 12C19 13.0246 18.7025 13.3697 18.1076 14.0598C16.9196 15.4378 14.9273 17 12 17C9.07268 17 7.08038 15.4378 5.89243 14.0598ZM9.25 12C9.25 10.4812 10.4812 9.25 12 9.25C13.5188 9.25 14.75 10.4812 14.75 12C14.75 13.5188 13.5188 14.75 12 14.75C10.4812 14.75 9.25 13.5188 9.25 12Z"
                      fill="#26d829"></path>
                  </g>
                </svg>

              </td>
              <td>
                <svg v-on:click="image360ShowFunc(item.id)" viewBox="0 0 24 24" width="24" height="24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <g opacity="0.5">
                      <path
                        d="M14 2.75C15.9068 2.75 17.2615 2.75159 18.2892 2.88976C19.2952 3.02503 19.8749 3.27869 20.2981 3.7019C20.7852 4.18904 20.9973 4.56666 21.1147 5.23984C21.2471 5.9986 21.25 7.08092 21.25 9C21.25 9.41422 21.5858 9.75 22 9.75C22.4142 9.75 22.75 9.41422 22.75 9L22.75 8.90369C22.7501 7.1045 22.7501 5.88571 22.5924 4.98199C22.417 3.97665 22.0432 3.32568 21.3588 2.64124C20.6104 1.89288 19.6615 1.56076 18.489 1.40314C17.3498 1.24997 15.8942 1.24998 14.0564 1.25H14C13.5858 1.25 13.25 1.58579 13.25 2C13.25 2.41421 13.5858 2.75 14 2.75Z"
                        fill="#26d829"></path>
                      <path
                        d="M2.00001 14.25C2.41422 14.25 2.75001 14.5858 2.75001 15C2.75001 16.9191 2.75289 18.0014 2.88529 18.7602C3.00275 19.4333 3.21477 19.811 3.70191 20.2981C4.12512 20.7213 4.70476 20.975 5.71085 21.1102C6.73852 21.2484 8.09318 21.25 10 21.25C10.4142 21.25 10.75 21.5858 10.75 22C10.75 22.4142 10.4142 22.75 10 22.75H9.94359C8.10583 22.75 6.6502 22.75 5.51098 22.5969C4.33856 22.4392 3.38961 22.1071 2.64125 21.3588C1.95681 20.6743 1.58304 20.0233 1.40762 19.018C1.24992 18.1143 1.24995 16.8955 1.25 15.0964L1.25001 15C1.25001 14.5858 1.58579 14.25 2.00001 14.25Z"
                        fill="#26d829"></path>
                      <path
                        d="M22 14.25C22.4142 14.25 22.75 14.5858 22.75 15L22.75 15.0963C22.7501 16.8955 22.7501 18.1143 22.5924 19.018C22.417 20.0233 22.0432 20.6743 21.3588 21.3588C20.6104 22.1071 19.6615 22.4392 18.489 22.5969C17.3498 22.75 15.8942 22.75 14.0564 22.75H14C13.5858 22.75 13.25 22.4142 13.25 22C13.25 21.5858 13.5858 21.25 14 21.25C15.9068 21.25 17.2615 21.2484 18.2892 21.1102C19.2952 20.975 19.8749 20.7213 20.2981 20.2981C20.7852 19.811 20.9973 19.4333 21.1147 18.7602C21.2471 18.0014 21.25 16.9191 21.25 15C21.25 14.5858 21.5858 14.25 22 14.25Z"
                        fill="#26d829"></path>
                      <path
                        d="M9.94359 1.25H10C10.4142 1.25 10.75 1.58579 10.75 2C10.75 2.41421 10.4142 2.75 10 2.75C8.09319 2.75 6.73852 2.75159 5.71085 2.88976C4.70476 3.02503 4.12512 3.27869 3.70191 3.7019C3.21477 4.18904 3.00275 4.56666 2.88529 5.23984C2.75289 5.9986 2.75001 7.08092 2.75001 9C2.75001 9.41422 2.41422 9.75 2.00001 9.75C1.58579 9.75 1.25001 9.41422 1.25001 9L1.25 8.90369C1.24995 7.10453 1.24992 5.8857 1.40762 4.98199C1.58304 3.97665 1.95681 3.32568 2.64125 2.64124C3.38961 1.89288 4.33856 1.56076 5.51098 1.40314C6.65019 1.24997 8.10584 1.24998 9.94359 1.25Z"
                        fill="#26d829"></path>
                    </g>
                    <path
                      d="M12 10.75C11.3096 10.75 10.75 11.3096 10.75 12C10.75 12.6904 11.3096 13.25 12 13.25C12.6904 13.25 13.25 12.6904 13.25 12C13.25 11.3096 12.6904 10.75 12 10.75Z"
                      fill="#26d829"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M5.89243 14.0598C5.29747 13.3697 5 13.0246 5 12C5 10.9754 5.29748 10.6303 5.89242 9.94021C7.08037 8.56222 9.07268 7 12 7C14.9273 7 16.9196 8.56222 18.1076 9.94021C18.7025 10.6303 19 10.9754 19 12C19 13.0246 18.7025 13.3697 18.1076 14.0598C16.9196 15.4378 14.9273 17 12 17C9.07268 17 7.08038 15.4378 5.89243 14.0598ZM9.25 12C9.25 10.4812 10.4812 9.25 12 9.25C13.5188 9.25 14.75 10.4812 14.75 12C14.75 13.5188 13.5188 14.75 12 14.75C10.4812 14.75 9.25 13.5188 9.25 12Z"
                      fill="#26d829"></path>
                  </g>
                </svg>
              </td>
              <td>{{ item.totalVisits }}</td>
              <td>
                <a v-on:click="selectItemForUpdate(item.id)" class="option">تعديل</a>
                <a class="option" data-bs-toggle="modal" data-bs-target="#vehicle_star_modal"
                  v-on:click="selectItemForStar(item.id)">تمييز المركبة</a>
                <a class="option" data-bs-toggle="modal" data-bs-target="#update_360_modal"
                  v-on:click="selectItem(item.id)">تعديل صورة 360</a>
                <a v-on:click="selectItem(item.id)" class="option del" data-bs-toggle="modal"
                  data-bs-target="#delete_vehicle">حذف</a>
              </td>

            </tr>


          </tbody>
        </table>

      </div>

      <!-- <div v-if="!getCustomerBuyProductsOrdersData || getCustomerBuyProductsOrdersData.length === 0" class="alert alert-danger mt-3">
         الجدول فارغ، حاول أن تضيف فيه بعض البيانات.      </div>
    </div> -->
    </div>
  </div>
  <!-- end right side  -->

  <div class="modal fade" id="delete_vehicle" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">حذف المركبة</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          تنبـيــه سيتم حذف المركبة
        </div>
        <div class="modal-footer">
          <button type="button" v-on:click="deleteFunc()" class="btn btn-primary">حـذف</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="image360_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel"> صورة 360 درجة </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body" v-if="selectedVehicle.image360 != ''">
          <Vehicle360View :panorama="selectedVehicle.image360"></Vehicle360View>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">
            اغلاق
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- vehicle star -->
  <div class="modal fade" id="vehicle_star_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">طلب تمييز المركبة</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row form-row">
            <div class="col-12 col-sm-12">
              <div class="form-group">
                <label>رسالة</label>
                <textarea v-model="dataStar.message" type="text" class="form-control" maxlength="255"></textarea>

              </div>

            </div>
            <div class="col-12 col-sm-12">
              <div class="form-group">
                <label>مدة الطلب بالأيام</label>
                <input @input="countTotalPriceFunc" v-model="dataStar.durationDay" type="number" class="form-control">
              </div>
            </div>
          </div>

          <div class="col-12 mt-3 mb-3">
            <!-- <h5 class="page-title">ملاحظات</h5> -->
            <p class="warning">
              <svg width="22px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 279.682 279.682" xml:space="preserve"
                fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <path style="fill:#e7c409;"
                      d="M143.25,55.486c-41.06,0-74.465,33.405-74.465,74.465c0,16.824,5.511,32.711,15.938,45.939 c1.998,2.536,4.15,5.033,6.23,7.448c6.212,7.208,12.078,14.017,14.166,21.675c0.045,0.165,0.438,1.773,0.38,7.247l-0.01,0.791 c-0.063,4.444-0.147,10.528,4.352,15.091c3.081,3.125,7.399,4.645,13.204,4.645h40.272c6.268,0,10.774-1.534,13.776-4.689 c4.061-4.267,3.789-9.779,3.608-13.427c-0.032-0.645-0.066-1.296-0.074-1.944c-0.065-5.48,0.345-7.025,0.362-7.09 c2.121-7.657,8.993-15.732,15.057-22.855c2.023-2.377,3.934-4.622,5.714-6.879c10.431-13.23,15.944-29.12,15.944-45.951 C217.705,88.892,184.305,55.486,143.25,55.486z M189.982,166.614c-1.607,2.036-3.429,4.178-5.358,6.445 c-7.07,8.307-15.084,17.722-18.089,28.572c-0.429,1.546-0.988,4.395-0.905,11.273c0.01,0.835,0.049,1.675,0.091,2.507 c0.032,0.657,0.075,1.523,0.071,2.209c-0.528,0.086-1.325,0.166-2.475,0.166h-40.272c-1.276,0-2.022-0.135-2.405-0.237 c-0.198-0.977-0.17-3.007-0.152-4.287l0.012-0.844c0.072-6.919-0.483-9.789-0.907-11.348c-2.98-10.936-10.575-19.749-17.275-27.524 c-2.066-2.398-4.019-4.664-5.813-6.942c-8.32-10.557-12.718-23.232-12.718-36.654c0-32.789,26.676-59.465,59.465-59.465 c32.783,0,59.455,26.676,59.455,59.465C202.705,143.379,198.306,156.058,189.982,166.614z">
                    </path>
                    <path style="fill:#e7c409;"
                      d="M161.766,239.564h-37.041c-7.995,0-14.5,6.505-14.5,14.5v11.117c0,7.995,6.505,14.5,14.5,14.5 h37.041c7.995,0,14.5-6.505,14.5-14.5v-11.117C176.266,246.069,169.761,239.564,161.766,239.564z M161.266,264.682h-36.041v-10.117 h36.041V264.682z">
                    </path>
                    <path style="fill:#e7c409;"
                      d="M143.245,45.779c4.143,0,7.5-3.357,7.5-7.5V7.5c0-4.143-3.357-7.5-7.5-7.5 c-4.143,0-7.5,3.357-7.5,7.5v30.779C135.745,42.422,139.103,45.779,143.245,45.779z">
                    </path>
                    <path style="fill:#e7c409;"
                      d="M241.917,34.598c-2.858-2.995-7.606-3.106-10.604-0.248l-22.77,21.73 c-2.997,2.859-3.107,7.607-0.248,10.604c1.474,1.544,3.448,2.322,5.427,2.322c1.86,0,3.725-0.688,5.177-2.074l22.77-21.731 C244.666,42.342,244.776,37.594,241.917,34.598z">
                    </path>
                    <path style="fill:#e7c409;"
                      d="M264.273,109.599c-0.004,0-0.008,0-0.012,0l-29.311,0.047c-4.143,0.007-7.495,3.37-7.488,7.512 c0.007,4.139,3.363,7.488,7.5,7.488c0.004,0,0.008,0,0.012,0l29.311-0.047c4.143-0.007,7.495-3.37,7.488-7.512 C271.767,112.948,268.41,109.599,264.273,109.599z">
                    </path>
                    <path style="fill:#e7c409;"
                      d="M74.386,64.684c2.859-2.996,2.749-7.743-0.248-10.604l-22.77-21.73 c-2.994-2.858-7.742-2.749-10.604,0.248c-2.859,2.996-2.749,7.743,0.248,10.604l22.77,21.731c1.452,1.386,3.315,2.074,5.177,2.074 C70.937,67.006,72.912,66.228,74.386,64.684z">
                    </path>
                    <path style="fill:#e7c409;"
                      d="M44.729,109.646l-29.31-0.047c-0.004,0-0.008,0-0.012,0c-4.137,0-7.493,3.351-7.5,7.488 c-0.007,4.142,3.346,7.505,7.488,7.512l29.31,0.047c0.004,0,0.008,0,0.012,0c4.137,0,7.493-3.351,7.5-7.488 C52.225,113.016,48.872,109.652,44.729,109.646z">
                    </path>
                  </g>
                </g>
              </svg>
              تكلفة تمييز المركبة لليوم {{ formatCurrencyStarOrder(this.dataStar.dailyPrice) }} والتكلفة الإجمالية {{
                formatCurrencyStarOrder(this.dataStar.totalPrice) }}
            </p>
            <p class="warning">
              <svg width="22px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 279.682 279.682" xml:space="preserve"
                fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <path style="fill:#e7c409;"
                      d="M143.25,55.486c-41.06,0-74.465,33.405-74.465,74.465c0,16.824,5.511,32.711,15.938,45.939 c1.998,2.536,4.15,5.033,6.23,7.448c6.212,7.208,12.078,14.017,14.166,21.675c0.045,0.165,0.438,1.773,0.38,7.247l-0.01,0.791 c-0.063,4.444-0.147,10.528,4.352,15.091c3.081,3.125,7.399,4.645,13.204,4.645h40.272c6.268,0,10.774-1.534,13.776-4.689 c4.061-4.267,3.789-9.779,3.608-13.427c-0.032-0.645-0.066-1.296-0.074-1.944c-0.065-5.48,0.345-7.025,0.362-7.09 c2.121-7.657,8.993-15.732,15.057-22.855c2.023-2.377,3.934-4.622,5.714-6.879c10.431-13.23,15.944-29.12,15.944-45.951 C217.705,88.892,184.305,55.486,143.25,55.486z M189.982,166.614c-1.607,2.036-3.429,4.178-5.358,6.445 c-7.07,8.307-15.084,17.722-18.089,28.572c-0.429,1.546-0.988,4.395-0.905,11.273c0.01,0.835,0.049,1.675,0.091,2.507 c0.032,0.657,0.075,1.523,0.071,2.209c-0.528,0.086-1.325,0.166-2.475,0.166h-40.272c-1.276,0-2.022-0.135-2.405-0.237 c-0.198-0.977-0.17-3.007-0.152-4.287l0.012-0.844c0.072-6.919-0.483-9.789-0.907-11.348c-2.98-10.936-10.575-19.749-17.275-27.524 c-2.066-2.398-4.019-4.664-5.813-6.942c-8.32-10.557-12.718-23.232-12.718-36.654c0-32.789,26.676-59.465,59.465-59.465 c32.783,0,59.455,26.676,59.455,59.465C202.705,143.379,198.306,156.058,189.982,166.614z">
                    </path>
                    <path style="fill:#e7c409;"
                      d="M161.766,239.564h-37.041c-7.995,0-14.5,6.505-14.5,14.5v11.117c0,7.995,6.505,14.5,14.5,14.5 h37.041c7.995,0,14.5-6.505,14.5-14.5v-11.117C176.266,246.069,169.761,239.564,161.766,239.564z M161.266,264.682h-36.041v-10.117 h36.041V264.682z">
                    </path>
                    <path style="fill:#e7c409;"
                      d="M143.245,45.779c4.143,0,7.5-3.357,7.5-7.5V7.5c0-4.143-3.357-7.5-7.5-7.5 c-4.143,0-7.5,3.357-7.5,7.5v30.779C135.745,42.422,139.103,45.779,143.245,45.779z">
                    </path>
                    <path style="fill:#e7c409;"
                      d="M241.917,34.598c-2.858-2.995-7.606-3.106-10.604-0.248l-22.77,21.73 c-2.997,2.859-3.107,7.607-0.248,10.604c1.474,1.544,3.448,2.322,5.427,2.322c1.86,0,3.725-0.688,5.177-2.074l22.77-21.731 C244.666,42.342,244.776,37.594,241.917,34.598z">
                    </path>
                    <path style="fill:#e7c409;"
                      d="M264.273,109.599c-0.004,0-0.008,0-0.012,0l-29.311,0.047c-4.143,0.007-7.495,3.37-7.488,7.512 c0.007,4.139,3.363,7.488,7.5,7.488c0.004,0,0.008,0,0.012,0l29.311-0.047c4.143-0.007,7.495-3.37,7.488-7.512 C271.767,112.948,268.41,109.599,264.273,109.599z">
                    </path>
                    <path style="fill:#e7c409;"
                      d="M74.386,64.684c2.859-2.996,2.749-7.743-0.248-10.604l-22.77-21.73 c-2.994-2.858-7.742-2.749-10.604,0.248c-2.859,2.996-2.749,7.743,0.248,10.604l22.77,21.731c1.452,1.386,3.315,2.074,5.177,2.074 C70.937,67.006,72.912,66.228,74.386,64.684z">
                    </path>
                    <path style="fill:#e7c409;"
                      d="M44.729,109.646l-29.31-0.047c-0.004,0-0.008,0-0.012,0c-4.137,0-7.493,3.351-7.5,7.488 c-0.007,4.142,3.346,7.505,7.488,7.512l29.31,0.047c0.004,0,0.008,0,0.012,0c4.137,0,7.493-3.351,7.5-7.488 C52.225,113.016,48.872,109.652,44.729,109.646z">
                    </path>
                  </g>
                </g>
              </svg>
              التاريخ المرجح أن تعرض به المركبة في حال تمت الموافقة {{ this.orderDate }}
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" v-on:click="starToPaymentFunc()" class="btn btn-primary">إكمال عملية الدفع لتأكيد الطلب</button>
        </div>
      </div>
    </div>
  </div>
  <!-- /vehicle star  -->
  <!-- update 360 modal -->

  <div class="modal fade" id="update_360_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">تعديل صورة 360</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row form-row">
            <div class="box py-2 px-3 mb-3 rounded-3">
              <!-- Label for the file input -->
              <label class="w-100 h-100">
                <input type="file" accept="image/*" @change="handleImageUpload" class="d-none" ref="fileInput" />
                <div class="icon"></div>
                <h5 class="text-center">أضف صورة 360</h5>
                <img src="/images/plus-icon.svg" alt="" class="d-block mx-auto rounded-circle p-2" />
                <p class="mb-0 text-center">الصورة</p>
              </label>
            </div>
            <div v-if="img360" class="imageCropper">
              <img :src="img360" alt="imageCropper" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" v-on:click="Changeimg360Func()" class="btn btn-primary">حفظ</button>
        </div>
      </div>
    </div>
  </div>
  <!-- /update 360 modal -->

  <FsLightbox :toggler="toggler" :sources="selectedVehicle.images" type="image" />

</template>
<style scoped>
.modal-footer .btn-primary {
  border-radius: 30px;
  padding: 8px 30px;
  margin: 0 auto;
}

.profile .ads {
  margin-bottom: 77px;
}
</style>