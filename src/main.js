import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from '../store/index';
import moshaToast from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
// Lazy load cropper CSS only when needed
// import 'cropperjs/dist/cropper.css';
// Optimize Element Plus - import only what's needed
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createHead } from '@vueuse/head';
import i18n from './i18n'

const head = createHead()
const app = createApp(App);

// Configure axios defaults
axios.defaults.withCredentials = true;

// Ensure all global axios requests send the current UI language
const selectedLanguage = localStorage.getItem('selectedLanguage') || 'ar';
axios.defaults.headers.common['X-Language'] = selectedLanguage;

// Add request timeout
axios.defaults.timeout = 10000; // 10 seconds

app.use(head);
app.use(router);
app.use(VueAxios, axios);
app.use(store);
app.use(moshaToast);
app.use(ElementPlus);
app.use(i18n);

// Performance optimization: Use production mode
if (import.meta.env.PROD) {
  app.config.performance = false; // Disable performance tracking in production
}

app.mount('#app');
