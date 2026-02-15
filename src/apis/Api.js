import axios from "axios";
import { Urls } from '@/config/config.js'


const selectedLanguage = localStorage.getItem('selectedLanguage') || 'ar';


const Api = axios.create({
    baseURL: `${Urls.cpSite}/api`,
    
    headers: {
        'X-Language': selectedLanguage,
    },
});
export default Api;