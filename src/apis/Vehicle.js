import Api from "./Api";

const END_POINT = 'Vehicle';


export default {

    GetVehicle(id) {

        let config = {
            params: {
                id: id,
            },
        };
        const responce = Api.get(`${END_POINT}/GetVehicle`, config);
        return responce;
    },

    GetVehiclesRandomly(data) {
        const queryString = new URLSearchParams({
            ownerId: data.ownerId,
            vehicleBrandId: data.vehicleBrandId,
            vehicleModelId: data.vehicleModelId,
            yearFrom: data.yearFrom,
            yearTo: data.yearTo,
            priceFrom: data.priceFrom,
            priceTo: data.priceTo,
            mealsFrom: data.mealsFrom,
            mealsTo: data.mealsTo,
            color: data.color,
            bodyType: data.bodyType,
            specification: data.specification,
            paintedType: data.paintedType,
            paintedStatus: data.paintedStatus,
            gearType: data.gearType,
            oilType: data.oilType,

            page: data.page,
            pageSize: data.pageSize
        });
        // data.exceptionIds.forEach(id => queryString.append('exceptionIds', id));

        let config = {
            params: queryString,
        };
        return Api.get(`${END_POINT}/GetVehiclesRandomly`, config);
    },

    GetUserVehicles(data) {
        let config = {
            params: {
                userId: data.userId,
                page: data.page,
                pageSize: data.pageSize,
            },

        };
        return Api.get(`${END_POINT}/GetUserVehicles`, config);
    },



    GetVehicelForUpdate(id) {

        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                id: id,
            },
        };

        const responce = Api.get(`${END_POINT}/GetVehicelForUpdate`, config);
        return responce;
    },

    GetMyVehicles(statusId) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: {
                'Authorization': token,
                'Access-Control-Allow-Origin': '*'
            },
            params: {
                statusId: statusId,
            }
        };

        const response = Api.get(`${END_POINT}/GetMyVehicles`, config);
        return response;
    },

    GetVehicleUpdateInfo(vehicleId) {

        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                vehicleId: vehicleId,
            },
        };

        // let config = {
        //     headers: {
        //         'Authorization': token,
        //         'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //       },
        // };

        const responce = Api.get(`${END_POINT}/GetVehicleUpdateInfo`, config);
        return responce;
    },

    CreateVehicle(data) {
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
        const responce = Api.post(`${END_POINT}/CreateVehicle`, data, config);
        return responce;
    },

    UpdateVehicle(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };

        console.log("this.data : ", data);
        const responce = Api.put(`${END_POINT}/UpdateVehicle`, data, config);
        return responce;
    },

    DeleteVehicle(VehicleId) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                Id: VehicleId
            }
        };
        //let config = {
        //    headers: {
        //        'Authorization': token,
        //        'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //      },
        //};
        const responce = Api.delete(`${END_POINT}/DeleteVehicle`, config);
        return responce;
    },

    UpdateVehicleStatus(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };

        const responce = Api.put(`${END_POINT}/UpdateVehicleStatus`, data, config);
        return responce;
    },

    UpdateVehicleImage360(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };

        const responce = Api.put(`${END_POINT}/UpdateVehicleImage360`, data, config);
        return responce;
    },

}