<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';

import pageNav from '@/components/lightNavbar.vue';
import pageFooter from '@/components/footer.vue';
export default {
  data() {
    return {
      activeTab: 'waiting',
    }
  },
  props: {

  },
  mounted() {

  },
  components: {
    pageNav,
    pageFooter,

  },

  emits: {

  },

  created() {

  },

  computed: {

  },
  methods: {

  }
};
</script>
<template>
  <pageNav></pageNav>
  <div class="container">
    <div class="row">
      <ul class=" nav d-flex flex-row flex-nowrap justify-content-between align-items-center radius_all p-2" id="myTab"
        role="tablist">
        <li class="nav-item">
          <button class="nav-link btn-order px-md-5 py-md-2" :class="{ active: activeTab === 'waiting' }"
            @click="activeTab = 'waiting'">

            <svg height="20" width="20" version="1.2" baseProfile="tiny" id="inventory"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 230"
              xml:space="preserve">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M245.2,133.4l-62,62c-7.2,7.5-18,12.8-29.4,12.8h-46.6c-5.9,0-11.2,2.3-15.1,6.2L76.6,229H6l67.9-68.8l-0.1-0.1 c7.2-7.2,17.3-11.7,28.4-11.8h67c7.1,0,12.8,5.7,12.8,12.8c0,7.1-5.7,12.8-12.8,12.8h-54c-2.3-0.2-4.2,1.7-4.2,4.2s1.9,4.3,4.3,4.3 h53.7c5.7,0.2,11.1-2.2,15.1-6.2c4-4,6.2-9.5,6.2-15.1c0.2-2.6-0.5-5.4-1.4-7.8l38.1-38.1c5.1-5.1,13.1-5.1,18.1-0.2 C250.3,120.1,250.2,128.4,245.2,133.4z M69,69c0-37.2,29.8-67.4,67-67.4c37.2,0,67.2,30,67.2,67.2S173.1,136,136.1,136 C99.1,136,69,106,69,69z M144.9,84.5c0,4.6-3.8,8-11.5,8c-7.2,0-13.9-2.5-18.2-4.6l-3.4,13.6c3.9,2.2,12,4.3,20,4.3V116h9.3v-10.5 c13.6-3,20-11.1,20-21.6s-5.9-17-18.6-21.6C133.3,58.5,129,56.7,129,52c0-3.4,3.7-6.8,10.5-6.8c6.8,0,11.8,2.1,14.9,3.4l3.8-13.3 c-4.1-2.2-9.7-3.8-17.4-3.8V21.1h-9.3v11.1c-12.4,2.5-19.2,10.5-19.2,20.8c0,11.1,7.7,17.3,20,21.6C141.2,78,144.9,79.9,144.9,84.5z ">
                </path>
              </g>
            </svg>
            طرق الدفع
          </button>
        </li>
        <li class="nav-item" >
          <button class="nav-link btn-order px-md-5 py-md-2" :class="{ active: activeTab === 'on-progress' }"
            @click="activeTab = 'on-progress'">
            <svg height="20" width="20" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" xml:space="preserve">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M252,128c0,68.4-55.6,124-124,124S4,196.4,4,128S59.6,4,128,4S252,59.6,252,128z M174.3,155.6c0-26-27.8-33.4-39.8-36.8 c-22.7-6.3-24.6-14.5-24.3-18.7c0.8-10.2,12-12.7,22.4-10.5c8.2,1.8,16.6,6.6,21.3,10.3l14.9-17.4c-7.3-5-16.7-11.5-30.4-14.1V51.5 h-21.7v16.3c-21,1.6-35,14.8-35,32.9c0,17.7,12.8,26,25.6,32.2c10.7,5.1,40.5,10.4,38.8,23.9c-0.9,7.3-8.7,12.7-21.6,11.1 c-11.2-1.4-23.2-10.8-23.2-10.8l-16.4,16.3c9.9,8,20.4,13,31.8,15.3v15.9h21.7v-15.1C159.1,187.2,174.3,173.1,174.3,155.6z">
                </path>
              </g>
            </svg>
            تأكيد عملية الدفع
          </button>
        </li>


      </ul>
      <div class="col-6">

        <div class="tab-content px-0" id="myTabContent">
          <div v-show="activeTab === 'waiting'" class="tab-pane fade show active ">
            <div class="radio-container text-center">
              <div class="label-title">طرق الدفع</div>
              <div class="radio-group">
                <label>
                  <input type="radio" name="type" value="normal" checked>
                  <div class="radio-label">
                    <p>بنك فلسطين</p>
                    <img src="/img/payBrand/bank.png" width="50" height="50" alt="">
                  </div>
                </label>
                <label>
                  <input type="radio" name="type" value="outline">
                  <div class="radio-label">
                    <p>PalPay</p>
                    <img src="/img/payBrand/palpay.jpg" width="50" height="50" alt="">

                  </div>
                </label>
                <label>
                  <input type="radio" name="type" value="outline">
                  <div class="radio-label">
                    <p>Jawwal Pay</p>
                    <img src="/img/payBrand/jawwalpay.png" width="50" height="50" alt="">

                  </div>
                </label>
                <label>
                  <input type="radio" name="type" value="outline">
                  <div class="radio-label">
                    <p>بطاقة ائتمان</p>
                    <img src="/img/payBrand/visa.jpg" width="50" height="50" alt="">
                  </div>
                </label>
                <label>
                  <input type="radio" name="type" value="outline">
                  <div class="radio-label">
                    <p>USDT</p>
                    <img src="/img/payBrand/TetherUSDT.png" width="50" height="50" alt="">
                  </div>
                </label>

              </div>
            </div>
            <ul class=" nav d-flex flex-row flex-nowrap justify-content-between align-items-center next" id="myTab"
              role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link btn-order nextbtn" @click="activeTab = 'on-progress'">
                  التالي
                </button>
              </li>
            </ul>
          </div>
          <div v-show="activeTab === 'on-progress'" class="tab-pane fade show active">

            <form class="mt-4">
              <label class="text">  الاسم كامل</label>
              <br>
              <input name="name" id="name" type="text" class="form-control my-3 py-3 text-start gray_text gray-inp"
                placeholder="الاسم" required="">

              <label class="text"> البريد الالكتروني</label>
              <br>
              <input name="name" id="name" type="text" class="form-control my-3 py-3 text-start gray_text gray-inp"
                placeholder="البريد الالكتروني" required="">

              <label class="text">  رقم الجوال</label>
              <br>
              <input name="name" id="name" type="text" class="form-control my-3 py-3 text-start gray_text gray-inp"
                placeholder="05xx-xxxxxx" required="">

            </form>

            <ul class=" nav d-flex flex-row flex-nowrap justify-content-between align-items-center next mt-5" id="myTab"
              role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link btn-order nextbtn" @click="activeTab = 'waiting'">
                  السابق
                </button>
              </li>
            </ul>
          </div>
        </div>

      </div>
      <div class="col-6">
        <div class="card custom_cardd">
          <div class="img">
            <img src="/img/aboutus1.jpg" class="card-img-top index-img-card" alt="...">
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-baseline mb-2">
              <h6 class="card-title justify-content-start">هونداي</h6>
            </div>
            <div class="d-flex justify-content-between">
              <div class=" d-flex  flex-column">
                <div class="d-flex align-items-center mb-2">
                  <a href="hotel_details.html" class="name-details">
                    اكسنت
                  </a>
                </div>

                <div class=" d-flex align-items-center model-car">
                  <p>
                    سنة الإصدار: <span>2001</span>
                  </p>
                </div>

                <div class=" d-flex align-items-center">
                  <span class="price">
                    5000$
                  </span>
                </div>
                <div class=" d-flex align-items-center">
                  <ul class="show-more-details">
                    <li>
                      <svg width="15" height="15" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z"
                          fill="#24DC26">
                        </path>
                      </svg> عدد الايام : 5
                    </li>
                    <li>
                      <svg width="15" height="15" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z"
                          fill="#24DC26">
                        </path>
                      </svg> السعر اليومي : 20
                    </li>
                    <li>
                      <svg width="15" height="15" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z"
                          fill="#24DC26">
                        </path>
                      </svg> السعر الاجمالي : 100
                    </li>
                  </ul>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>


  <pageFooter></pageFooter>

</template>
<style scoped>
.next .nextbtn {
  padding: 15px 60px;
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  font-size: 14px;
  font-weight: 400;

}

.next .nextbtn:hover {
  background-color: #26d829;
  color: #fff;

}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.radio-label {
  border: 2px solid #ccc;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  display: flex;
  justify-content: space-between;
}

.radio-label p {
  margin: 0;
  padding: 13px;
}

.radio-label img {
  border-radius: 8px;
  margin-left: 15px;
}

input[type="radio"] {
  display: none;
  transition: all 0.4s ease-in-out;
}

input[type="radio"]:checked+.radio-label {
  border-color: #26d829;
  /* Green border */
  color: #fff;
  font-weight: bold;
  background-color: #26d829;
}

.radio-container {
  display: flex;
  flex-direction: column;
  /* max-width: 200px; */
  margin: 80px auto;
}

.label-title {
  font-weight: bold;
  background: #000;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
}

.custom_cardd {
  padding: 15px;
  margin: 77px 100px 77px 0;
}

.custom_cardd .img {
  height: 340px;
}

.custom_cardd .img img {
  height: 100%;
}

.index-img-card:hover {
  -webkit-transform: none !important;
  transform: none !important;
}

.radius_all>li .btn-order path {
  stroke: #26d829;
  fill: #26d829;
}

.radius_all>li:nth-child(1) .btn-order.active path {
  stroke: #fff;
  fill: #fff;
}

.radius_all>li:nth-child(2) .btn-order.active path {
  stroke: white;
  fill: white;
}

.btn-order {
  color: #000;
}

.btn-order:hover {
  color: #26d829;
}

.btn-order.active {
  color: #fff;
}
</style>