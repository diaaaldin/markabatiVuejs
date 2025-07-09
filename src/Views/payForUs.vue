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

      <div class="col-md-6 col-sm-12">
        <ul class=" nav d-flex flex-row flex-nowrap justify-content-between align-items-center radius_all p-2"
          id="myTab" role="tablist">
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
          <li class="nav-item">
            <button class="nav-link btn-order px-md-5 py-md-2" :class="{ active: activeTab === 'on-progress' }"
              @click="activeTab = 'on-progress'">
              <svg height="20" width="20" version="1.2" baseProfile="tiny" id="Layer_1"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256"
                xml:space="preserve">
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
              <label class="text"> الاسم كامل</label>
              <br>
              <input name="name" id="name" type="text" class="form-control my-3 py-3 text-start gray_text gray-inp"
                placeholder="الاسم" required="">

              <label class="text"> البريد الالكتروني</label>
              <br>
              <input name="name" id="name" type="text" class="form-control my-3 py-3 text-start gray_text gray-inp"
                placeholder="البريد الالكتروني" required="">

              <label class="text"> رقم الجوال</label>
              <br>
              <input name="name" id="name" type="text" class="form-control my-3 py-3 text-start gray_text gray-inp"
                placeholder="05xx-xxxxxx" required="">


              <div class="header">
                <label for="fileInput-c" class="custom-file-upload-c">
                  <!-- SVG Icon -->
                  <svg viewBox="0 0 24 24" width="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path opacity="0.4"
                        d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z"
                        fill="#24d627"></path>
                      <path
                        d="M16 11.25H12.75V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V11.25H8C7.59 11.25 7.25 11.59 7.25 12C7.25 12.41 7.59 12.75 8 12.75H11.25V16C11.25 16.41 11.59 16.75 12 16.75C12.41 16.75 12.75 16.41 12.75 16V12.75H16C16.41 12.75 16.75 12.41 16.75 12C16.75 11.59 16.41 11.25 16 11.25Z"
                        fill="#24d627"></path>
                    </g>
                  </svg>
                  تحميل الصور
                </label>

                <input type="file" v-on:change="fileChanged" id="fileInput-c" ref="imageInput" accept="image/*">

              </div>
              <div class="uploudedImageContaner">
                <img id="uploadedImage" ref="img" :src="imageSrc" alt="الصور المحملة ">
              </div>
            </form>

            <ul class=" nav d-flex flex-row flex-nowrap justify-content-between align-items-center next mt-5" id="myTab"
              role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link btn-order nextbtn" @click="activeTab = 'waiting'">
                  السابق
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link btn-order confirmbtn" >
                  <svg width="20" height="20" class="me-1" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.477 4.477 0 10 0C11.595 0 13.105 0.374 14.445 1.04C14.5636 1.09784 14.6696 1.17858 14.7568 1.27756C14.8441 1.37654 14.9109 1.49181 14.9533 1.61673C14.9958 1.74164 15.0132 1.87373 15.0044 2.00538C14.9956 2.13703 14.9609 2.26565 14.9022 2.38381C14.8434 2.50196 14.7619 2.60734 14.6623 2.69385C14.5627 2.78036 14.4469 2.8463 14.3217 2.88787C14.1965 2.92944 14.0642 2.94581 13.9327 2.93605C13.8011 2.92629 13.6727 2.89059 13.555 2.831C11.9626 2.04121 10.1525 1.80425 8.41039 2.15755C6.66833 2.51084 5.09354 3.43425 3.93461 4.78202C2.77568 6.12979 2.09862 7.82515 2.01031 9.60048C1.922 11.3758 2.42746 13.13 3.44692 14.5861C4.46637 16.0423 5.94175 17.1174 7.64015 17.6418C9.33855 18.1663 11.1632 18.1101 12.8262 17.4823C14.4891 16.8544 15.8956 15.6906 16.8236 14.1745C17.7516 12.6585 18.1483 10.8765 17.951 9.11C17.9366 8.97947 17.948 8.84737 17.9846 8.72124C18.0212 8.59511 18.0823 8.47743 18.1644 8.37492C18.3301 8.16788 18.5714 8.03517 18.835 8.006C19.0986 7.97683 19.363 8.05357 19.5701 8.21935C19.6726 8.30144 19.7579 8.40292 19.8212 8.51799C19.8845 8.63306 19.9246 8.75947 19.939 8.89C19.979 9.255 20 9.625 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10ZM19.707 2.293C19.8945 2.48053 19.9998 2.73484 19.9998 3C19.9998 3.26516 19.8945 3.51947 19.707 3.707L10.707 12.707C10.5195 12.8945 10.2652 12.9998 10 12.9998C9.73484 12.9998 9.48053 12.8945 9.293 12.707L6.293 9.707C6.19749 9.61475 6.12131 9.50441 6.0689 9.38241C6.01649 9.2604 5.9889 9.12918 5.98775 8.9964C5.9866 8.86362 6.0119 8.73194 6.06218 8.60905C6.11246 8.48615 6.18671 8.3745 6.28061 8.28061C6.3745 8.18671 6.48615 8.11246 6.60905 8.06218C6.73194 8.0119 6.86362 7.9866 6.9964 7.98775C7.12918 7.9889 7.2604 8.01649 7.38241 8.0689C7.50441 8.12131 7.61475 8.19749 7.707 8.293L10 10.586L18.293 2.293C18.4805 2.10553 18.7348 2.00021 19 2.00021C19.2652 2.00021 19.5195 2.10553 19.707 2.293Z" fill="#0B3D74"></path>
                  </svg>
                  تأكيد العملية
                </button>
              </li>
            </ul>
          </div>
        </div>

      </div>
      <div class="col-md-6 col-sm-12">
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
.header {
  text-align: center;
  padding: 20px;
  background-color: #4CAF50;
  color: white;
  border-radius: 8px;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
  font-size: 1.8em;
}

.header input[type="file"] {
  display: inline-block;
  margin: 15px 0;
  padding: 10px;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ddd;
}

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
.next .confirmbtn {
  padding: 15px 30px;
  background-color: #26d829;
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
.next .confirmbtn:hover {
  background-color: #000;
  color: #fff;

}
.next .confirmbtn svg path{
  fill: #fff;
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
  margin: 132px 100px 77px 0;
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

@media (max-width: 767px) {
  .custom_cardd {
    padding: 15px;
    margin: 77px 0 77px 0;
  }
}
</style>