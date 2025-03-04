import axios from "axios";
import { Urls } from '@/config/config.js'

const Api = axios.create({
    baseURL: `${Urls.cpSite}/api`,
    
});
export default Api;