<template>
  <div class="slider">
    <div class="badge">جديد</div>
    <span class="arrow left" @click="prevImage">&#8592;</span>
    <img :src="images[currentIndex]" class="main-image" />
    <span class="arrow right" @click="nextImage">&#8594;</span>

    <div class="thumbnails">
      <img
        v-for="(img, index) in images"
        :key="index"
        :src="img"
        :class="['thumbnail', { active: index === currentIndex }]"
        @click="setImage(index)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const images = ref([
  '/img/details-car/dc1.png',
  '/img/details-car/Group-1.png',
  '/img/details-car/Group-2.png',
  '/img/details-car/Group-3.png',
  '/img/details-car/Group-4.png',
  '/img/details-car/Group-5.png',
])

const currentIndex = ref(0)

const setImage = (index) => {
  currentIndex.value = index
}

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
}

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}
</script>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin: auto;
}

.main-image {
  width: 100%;
  height: auto;
  max-height: 350px;
  object-fit: cover;
  border-radius: 10px;
}

.thumbnails {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  gap: 10px;
  flex-wrap: wrap;
}

.thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 2px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid #dddfe5;
}

.thumbnail.active {
  border-color: #26d829;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  padding: 7px 15px;
  z-index: 10;
  user-select: none;
  width: 50px;
  height: 50px;
}

.arrow.left {
  left: -20px;
}

.arrow.right {
  right: -20px;
}

.badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: red;
  color: white;
  padding: 4px 8px;
  font-size: 0.9rem;
  font-weight: bold;
  transform: rotate(-15deg);
}

/* Responsive styles */
@media (max-width: 768px) {
  .main-image {
    max-height: 250px;
  }

  .arrow {
    font-size: 20px;
    padding: 8px;
  }

  .thumbnail {
    width: 60px;
    height: 45px;
  }
}

@media (max-width: 480px) {
  .main-image {
    max-height: 200px;
  }

  .arrow.left {
    left: -10px;
  }

  .arrow.right {
    right: -10px;
  }

  .thumbnail {
    width: 50px;
    height: 40px;
  }
}
</style>
