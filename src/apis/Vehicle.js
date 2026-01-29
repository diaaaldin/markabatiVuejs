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
        // Build params object for ASP.NET Core [FromQuery] SearchViewModel binding
        // API signature: GetVehiclesRandomly([FromQuery] SearchViewModel vm, int page = 1, int pageSize = 5)
        const params = {
            // SearchViewModel properties - only include if they have meaningful values (not 0)
            // ASP.NET Core treats missing params as null for nullable int?/double? types
            ...(data.searchData?.ownerId && data.searchData.ownerId !== 0 && { ownerId: data.searchData.ownerId }),
            ...(data.searchData?.stateId && data.searchData.stateId !== 0 && { stateId: data.searchData.stateId }),
            ...(data.searchData?.vehicleBrandId && data.searchData.vehicleBrandId !== 0 && { vehicleBrandId: data.searchData.vehicleBrandId }),
            ...(data.searchData?.vehicleModelId && data.searchData.vehicleModelId !== 0 && { vehicleModelId: data.searchData.vehicleModelId }),
            ...(data.searchData?.yearFrom && data.searchData.yearFrom !== 0 && { yearFrom: data.searchData.yearFrom }),
            ...(data.searchData?.yearTo && data.searchData.yearTo !== 0 && { yearTo: data.searchData.yearTo }),
            ...(data.searchData?.priceFrom && data.searchData.priceFrom !== 0 && { priceFrom: data.searchData.priceFrom }),
            ...(data.searchData?.priceTo && data.searchData.priceTo !== 0 && { priceTo: data.searchData.priceTo }),
            ...(data.searchData?.mealsFrom && data.searchData.mealsFrom !== 0 && { mealsFrom: data.searchData.mealsFrom }),
            ...(data.searchData?.mealsTo && data.searchData.mealsTo !== 0 && { mealsTo: data.searchData.mealsTo }),
            ...(data.searchData?.color && data.searchData.color !== 0 && { color: data.searchData.color }),
            ...(data.searchData?.bodyType && data.searchData.bodyType !== 0 && { bodyType: data.searchData.bodyType }),
            ...(data.searchData?.specification && data.searchData.specification !== 0 && { specification: data.searchData.specification }),
            ...(data.searchData?.paintedType && data.searchData.paintedType !== 0 && { paintedType: data.searchData.paintedType }),
            ...(data.searchData?.paintedStatus && data.searchData.paintedStatus !== 0 && { paintedStatus: data.searchData.paintedStatus }),
            ...(data.searchData?.gearType && data.searchData.gearType !== 0 && { gearType: data.searchData.gearType }),
            ...(data.searchData?.oilType && data.searchData.oilType !== 0 && { oilType: data.searchData.oilType }),
    
            // Method parameters (always included)
            page: data.page ?? 1,
            pageSize: data.pageSize ?? 5
        };

        return Api.get(`${END_POINT}/GetVehiclesRandomly`, { params });
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

    GetVehiclesFavorite() {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: {
                'Authorization': token,
                'Access-Control-Allow-Origin': '*'
            },
        };
        return Api.get(`${END_POINT}/GetVehiclesFavorite`, config);
    },

     GetVehiclesFavoriteId() {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: {
                'Authorization': token,
                'Access-Control-Allow-Origin': '*'
            },
          
        };
        return Api.get(`${END_POINT}/GetVehiclesFavoriteId`, config);
    },
    
    ToggleVehicleFavorite(id) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: {
                'Authorization': token,
                'Access-Control-Allow-Origin': '*'
            },
             params: {
                vehicleId: id,
            },
        };
        return Api.get(`${END_POINT}/ToggleVehicleFavorite`, config);
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