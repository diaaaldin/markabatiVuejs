<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      showPopup: false,
      popupShownOnce: false,
      currentIndex: 0,
    };
  },
  created() {
    this.GetVerticalAnnouncementActiveOrder().then(() => {
      if (this.getVerticalAnnouncementData.length && this.isMobileOrTablet) {
        this.showPopup = true;
        this.popupShownOnce = true;
      }
    });
  },
  computed: {
    ...mapGetters("Announcement", ["getVerticalAnnouncementData"]),
    currentImage() {
      return this.getVerticalAnnouncementData[this.currentIndex];
    },
    isMobileOrTablet() {
      return window.innerWidth <= 1024; // ✅ covers mobile + iPad
    },
  },
  methods: {
    ...mapActions("Announcement", ["GetVerticalAnnouncementActiveOrder"]),
    closePopup() {
      this.showPopup = false;
    },
    nextImage() {
      if (this.currentIndex < this.getVerticalAnnouncementData.length - 1) {
        this.currentIndex++;
      }
    },
    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
  },
};
</script>




<template>
  <div class="col-md-3 ads-card">
    <!-- Normal list only for desktop OR if popup never shown -->
    <div class="row" v-if="!isMobileOrTablet || !popupShownOnce">
      <div
        v-for="item in getVerticalAnnouncementData"
        :key="item.id"
        class="col-12 col-lg-12 col-md-6 mt-4"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="700"
      >
        <a href="service_details.html" style="color:black;">
          <div class="sideads">
            <div class="image">
              <img :src="item.image" alt="..." />
            </div>
          </div>
        </a>
      </div>
    </div>

    <!-- Fullscreen popup for mobile + tablets -->
    <div v-if="showPopup" class="popup-overlay">
         <div class="btn-x">
<button class="close-btn" @click="closePopup">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="#ff0000"></path></g></svg>
</button>

        </div>
      <div class="popup-content">
       
        
        <div class="slider-controls">
          <button class="arrow-btn" @click="prevImage" :disabled="currentIndex === 0">
            <svg viewBox="0 0 16 16" width="30" xmlns="http://www.w3.org/2000/svg" fill="#27da2a" class="bi bi-arrow-right-short" data-v-0bddd305=""><g id="SVGRepo_bgCarrier" stroke-width="0" data-v-0bddd305=""></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" data-v-0bddd305=""></g><g id="SVGRepo_iconCarrier" data-v-0bddd305=""><path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" data-v-0bddd305=""></path></g></svg>
          </button>
          <div class="image">
            <img :src="currentImage.image" alt="Ad" />
          </div>
          <button class="arrow-btn" @click="nextImage" :disabled="currentIndex === getVerticalAnnouncementData.length - 1">
                        <svg viewBox="0 0 16 16" width="30" xmlns="http://www.w3.org/2000/svg" fill="#27da2a" class="bi bi-arrow-left-short" data-v-0bddd305=""><g id="SVGRepo_bgCarrier" stroke-width="0" data-v-0bddd305=""></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" data-v-0bddd305=""></g><g id="SVGRepo_iconCarrier" data-v-0bddd305=""><path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" data-v-0bddd305=""></path></g></svg>

          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.sideads img {
  width: 100%;
  border-radius: 10px;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #868686ba;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.popup-content {
  position: relative;
  width: 100%;
  max-width: 90%;
  max-height: 90%;
  text-align: center;
}

.popup-content img {
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
}
.btn-x{
    position: relative;
}
.close-btn {
  position: absolute;
  top: -350px;
  right: 15px;
  font-size: 32px;
  background: none;
  border: none;
  color: #000;
  cursor: pointer;
  width: 37px;
  background-color: #000;
  height: 37px;
  border-radius: 50%;
  line-height: 0;
  padding: 7px;
}
.arrow-btn svg{
    background-color: black;
  border-radius: 21px;
}
.slider-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.arrow-btn {
  background: none;
  border: none;
  font-size: 36px;
  cursor: pointer;
  padding: 0 10px;
}

.arrow-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
