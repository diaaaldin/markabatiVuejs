import Api from "./Api";

const END_POINT = 'Payment';

export default {
    GetUserPaymentMovements() {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };

        return Api.get(`${END_POINT}/GetUserPaymentMovements`, config);
    },

    CreatePaymentMovements(data) {
        return Api.get(`${END_POINT}/CreatePaymentMovements`, data);
    },

}