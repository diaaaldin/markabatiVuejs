<script>
export default {
  props: {
    images: {
      type: Array,
      required: false,
      default: () => [
        '/img/details-car/dc1.png',
        '/img/details-car/Group-1.png',
        '/img/details-car/Group-2.png',
        '/img/details-car/Group-3.png',
        '/img/details-car/Group-4.png',
        '/img/details-car/Group-5.png',
      ]
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },

  computed: {
    // Display only the first 5 images
    displayedImages() {
      return this.images.slice(0, 5);
    }
  },
  methods: {
    setImage(index) {
      this.currentIndex = index;
    },
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },

  }
};
</script>
<template>
  <div class="slider-car">
    <div class="badge">جديد</div>
    <span class="arrow left" @click="prevImage">
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-arrow-left-short">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path fill-rule="evenodd"
            d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z">
          </path>
        </g>
      </svg> </span>
    <div class="image">
      <img :src="images[currentIndex]" class="main-image img-fluid" />
    </div>
    <span class="arrow right" @click="nextImage">
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-arrow-right-short">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path fill-rule="evenodd"
            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z">
          </path>
        </g>
      </svg>
    </span>

    <div class="thumbnails">
      <!-- Loop through the first 5 images -->
      <div v-for="(img, index) in displayedImages" :key="index" class="thumbnail-wrapper" @click="setImage(index)">
        <img :src="img" :class="['thumbnail', { active: index === currentIndex }]" />

        <!-- Only show overlay on the last image -->
        <!-- <div v-if="index === displayedImages.length - 1 && images.length > 5" class="thumbnail-overlay">
          +{{ images.length - 5 }}
        </div> -->
        <div v-if="index === displayedImages.length - 1 && images.length > 5" class="thumbnail-overlay" >
           <div id="gallery">
          <a v-for="(image, index) in images" :key="index" :href="image"
            :data-caption="'Image #' + (index + 1)" :class="{ 'Before_After_div': index === 0 }">
            <img :src="image" alt="" :class="index === 0
              ? 'img-fluid srv_img w-100 last-sec-img'
              : 'd-none'" />
          </a>
        </div>
        </div>
        
      </div>
    </div>


  </div>
</template>

<style scoped>
#gallery{
  width: 100%;
  height: 100%;
}
.Before_After_div{
  width: 100%;
  height: 100%;
}
.slider-car {
  position: relative;
  width: 100%;
  max-width: 100%;
  background: white;
  padding: 15px;
  border-radius: 10px;
  background-color: whitesmoke;
  margin: auto;
  box-sizing: border-box;
}

.image {
  width: 100%;
  height: 365px;
  aspect-ratio: 4 / 3;
  background-color: whitesmoke;
  overflow: hidden;
  border-radius: 10px;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
}

.thumbnails {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  gap: 30px;
  flex-wrap: wrap;
}

.thumbnail-wrapper {
  position: relative;
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  cursor: pointer;
}

.thumbnail-wrapper img.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #dddfe5;
  transition: border 0.3s;
}

.thumbnail.active {
  border: 2px solid #26d829;
}

.thumbnail-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}

.arrow {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  font-size: 20px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  padding: 5px 13px;
  z-index: 10;
  user-select: none;
  width: 40px;
  height: 40px;
}

.arrow.left {
  left: -15px;
}

.arrow.left svg {
  width: 28px;
  margin: -4px -7px 0 0;
}

.arrow.right {
  right: -15px;
}

.arrow.right svg {
  width: 28px;
  margin: -4px -7px 0 0;
}

.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: red;
  color: white;
  padding: 4px 8px;
  font-size: 0.8rem;
  font-weight: bold;
  transform: rotate(-15deg);
}

/* ------------------- Responsive Breakpoints ------------------- */

@media (max-width: 992px) {
  .thumbnail-wrapper {
    width: 60px;
    height: 60px;
  }

  .thumbnail-overlay {
    font-size: 18px;
  }

  .arrow {
    font-size: 18px;
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 768px) {
  .main-image {
    max-height: 250px;
  }

  .thumbnail-wrapper {
    width: 50px;
    height: 50px;
  }

  .thumbnail-overlay {
    font-size: 16px;
  }

  .arrow.left {
    left: -10px;
  }

  .arrow.right {
    right: -10px;
  }
}

@media (max-width: 480px) {
  .main-image {
    max-height: 200px;
  }

  .thumbnail-wrapper {
    width: 45px;
    height: 45px;
  }

  .thumbnail-overlay {
    font-size: 14px;
  }

  .arrow {
    font-size: 16px;
    width: 32px;
    height: 32px;
  }
}
</style>
