import Api from "./Api";
const END_POINT = 'Order';


export default {


    GetStarActiveVehicles() {
        return Api.get(`${END_POINT}/GetStarActiveVehicles`);
    },

    GetStarVehicleOrder(orderId) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;
        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                orderId: orderId,
            },
        };

        return Api.get(`${END_POINT}/GetStarVehicleOrder`, config);
    },

    GetAnnouncementOrder(orderId) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;
        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                orderId: orderId,
            },
        };
        return Api.get(`${END_POINT}/GetAnnouncementOrder`, config);
    },

    GetUserStarVehiclesOrders(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;
        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                vm: data.vm,
                page: data.page,
                pageSize: data.pageSize,
            },
        };
        return Api.get(`${END_POINT}/GetUserStarVehiclesOrders`, config);
    },
    GetUserAnnouncementOrders(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;
        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                ...data.vm,
                page: data.page,
                pageSize: data.pageSize,
            },
        };
        return Api.get(`${END_POINT}/GetUserAnnouncementOrders`, config);
    },


    GetStarVehicleOrderDate() {
        return Api.get(`${END_POINT}/GetStarVehicleOrderDate`);
    },
    GetAnnouncementOrderDate(announcementType) {
        let config = {
            params: {
                announcementType: announcementType,
            },
        };
        return Api.get(`${END_POINT}/GetAnnouncementOrderDate`, config);
    },

    GetStarVehicleOrderDailyPrice() {
        return Api.get(`${END_POINT}/GetStarVehicleOrderDailyPrice`);
    },
    GetAnnouncementOrderDailyPrice(announcementType) {
        let config = {
            params: {
                announcementType: announcementType,
            },
        };
        return Api.get(`${END_POINT}/GetAnnouncementOrderDailyPrice`, config);
    },


    CreateStarVehicleOrder(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        // let config = {
        //     headers: {
        //         'Authorization': token,
        //         'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //       },
        // };
        const responce = Api.post(`${END_POINT}/CreateStarVehicleOrder`, data, config);
        return responce;
    },
    UpdateStarVehicleOrder(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        // let config = {
        //     headers: {
        //         'Authorization': token,
        //         'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //       },
        // };
        const responce = Api.put(`${END_POINT}/UpdateStarVehicleOrder`, data, config);
        return responce;
    },
    DeleteStarVehicleOrder(orderId) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                orderId: orderId
            }
        };
        //let config = {
        //    headers: {
        //        'Authorization': token,
        //        'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //      },
        //};
        const responce = Api.delete(`${END_POINT}/DeleteStarVehicleOrder`, config);
        return responce;
    },
    UpdateStarVehicleOrderStatus(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        // let config = {
        //     headers: {
        //         'Authorization': token,
        //         'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //       },
        // };
        const responce = Api.put(`${END_POINT}/UpdateStarVehicleOrderStatus`, data, config);
        return responce;
    },

    CreateAnnouncementOrder(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        // let config = {
        //     headers: {
        //         'Authorization': token,
        //         'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //       },
        // };

        const responce = Api.post(`${END_POINT}/CreateAnnouncementOrder`, data, config);
        return responce;
    },
    UpdateAnnouncementOrder(data) {

        // console.log( "this.data :  " ,this.data);
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        // let config = {
        //     headers: {
        //         'Authorization': token,
        //         'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //       },
        // };
        const responce = Api.put(`${END_POINT}/UpdateAnnouncementOrder`, data, config);
        return responce;
    },

    DeleteAnnouncementOrder(orderId) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                orderId: orderId
            }
        };
        //let config = {
        //    headers: {
        //        'Authorization': token,
        //        'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //      },
        //};
        const responce = Api.delete(`${END_POINT}/DeleteAnnouncementOrder`, config);
        return responce;
    },

    UpdateAnnouncementOrderStatus(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        // let config = {
        //     headers: {
        //         'Authorization': token,
        //         'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //       },
        // };
        const responce = Api.put(`${END_POINT}/UpdateAnnouncementOrderStatus`, data, config);
        return responce;
    },

}