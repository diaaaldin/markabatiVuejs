import Api from "./Api";

const END_POINT = 'Category';

export default{

    GetBrands(){
        return Api.get(`${END_POINT}/GetBrands`);
    },
    GetBrandModels(id){
        let config = {
            params: {
                brandId: id
            },
          };
          
        return Api.get(`${END_POINT}/GetBrandModels`, config );
    },
    GetPaintedStatus(){
        return Api.get(`${END_POINT}/GetPaintedStatus`);
    },
    GetSpecification(){
        return Api.get(`${END_POINT}/GetSpecification`);
    },
    GetOrderStatus(){
        return Api.get(`${END_POINT}/GetOrderStatus`);
    },
    GetVehicleStatus(){
        return Api.get(`${END_POINT}/GetVehicleStatus`);
    },
    GetBodyType(){
        return Api.get(`${END_POINT}/GetBodyType`);
    },
    GetColor(){
        return Api.get(`${END_POINT}/GetColor`);
    },
    GetPaintedType(){
        return Api.get(`${END_POINT}/GetPaintedType`);
    },
    GetGearType(){
        return Api.get(`${END_POINT}/GetGearType`);
    }, 
    GetOilType(){
        return Api.get(`${END_POINT}/GetOilType`);
    },
    GetCurrency(){
        return Api.get(`${END_POINT}/GetCurrency`);
    },
    GetUserType(){
        return Api.get(`${END_POINT}/GetUserType`);
    },
    GetUserStatus(){
        return Api.get(`${END_POINT}/GetUserStatus`);
    },
    GetSendMessageWays(){
        return Api.get(`${END_POINT}/GetSendMessageWays`);
    },
    GetAnnouncementTypes(){
        return Api.get(`${END_POINT}/GetAnnouncementTypes`);
    },
    GetConstants(){
        return Api.get(`${END_POINT}/GetConstants`);
    },

    GetStates(){
        return Api.get(`${END_POINT}/GetStates`);
    },
    GetStateCities(StateId){
        let config = {
            params: {
                StateId: StateId
            },
          };
        return Api.get(`${END_POINT}/GetStateCities`, config );
    },

    CreateCode(data){
        let token =  localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token, "Access-Control-Allow-Origin" : "*"  },
        };
        // let config = {
        //     headers: {
        //         'Authorization': token,
        //         'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //       },
        // };
           const responce = Api.post(`${END_POINT}/CreateCode`, data , config);
           return responce;
    },
    UpdateCode(data){
        
        let token =  localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token , "Access-Control-Allow-Origin" : "*" },
        };

           const responce = Api.put(`${END_POINT}/UpdateCode`, data , config);
           return responce;
    },
    DeleteCode(id){
        let token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token, "Access-Control-Allow-Origin" : "*"  },
            params : {
                id : id
            }
        };
        //let config = {
        //    headers: {
        //        'Authorization': token,
        //        'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //      },
        //};
        const responce = Api.delete(`${END_POINT}/DeleteCode`, config);
        return responce;
    },

    CreateBrand(data){
        let token =  localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token, "Access-Control-Allow-Origin" : "*"  },
        };
        // let config = {
        //     headers: {
        //         'Authorization': token,
        //         'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //       },
        // };
           const responce = Api.post(`${END_POINT}/CreateBrand`, data , config);
           return responce;
    },
    UpdateBrand(data){
        let token =  localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token , "Access-Control-Allow-Origin" : "*" },
        };

           const responce = Api.put(`${END_POINT}/UpdateBrand`, data , config);
           return responce;
    },
    DeleteBrand(brandId){
        let token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token, "Access-Control-Allow-Origin" : "*"  },
            params : {
                brandId : brandId
            }
        };
        //let config = {
        //    headers: {
        //        'Authorization': token,
        //        'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //      },
        //};
        const responce = Api.delete(`${END_POINT}/DeleteBrand`, config);
        return responce;
    },

    CreateBrandModel(data){
        let token =  localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token, "Access-Control-Allow-Origin" : "*"  },
        };
        // let config = {
        //     headers: {
        //         'Authorization': token,
        //         'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //       },
        // };
           const responce = Api.post(`${END_POINT}/CreateBrandModel`, data , config);
           return responce;
    },
    UpdateBrandModel(data){
        let token =  localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token, "Access-Control-Allow-Origin" : "*"  },
        };

           const responce = Api.put(`${END_POINT}/UpdateBrandModel`, data , config);
           return responce;
    },
    DeleteBrandModel(brandModelId){
        let token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token , "Access-Control-Allow-Origin" : "*" },
            params : {
                brandModelId : brandModelId
            }
        };
        //let config = {
        //    headers: {
        //        'Authorization': token,
        //        'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //      },
        //};
        const responce = Api.delete(`${END_POINT}/DeleteBrandModel`, config);
        return responce;
    },




}