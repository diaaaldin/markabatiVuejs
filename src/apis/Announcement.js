import Api from "./Api";
const END_POINT = 'Order';


export default {
    GetMainAnnouncementActiveOrder() {
        return Api.get(`${END_POINT}/GetMainAnnouncementActiveOrder`);
    },
    GetVerticalAnnouncementActiveOrder() {
        return Api.get(`${END_POINT}/GetVerticalAnnouncementActiveOrder`);
    },
    GetHorizontalAnnouncementActiveOrder() {
        return Api.get(`${END_POINT}/GetHorizontalAnnouncementActiveOrder`);
    },
}