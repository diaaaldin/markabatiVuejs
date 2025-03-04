import Api from "./Api";

const END_POINT = 'User';



export default {
    GetUsers(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                userType: data.userType,
                state: data.state,
                name: data.name,
            },
        };
        return Api.get(`${END_POINT}/GetUsers`, config);
    },

    GetAdminUsers(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                name: data.name,
                state: data.state,
                page: data.page,
                pageSize: data.pageSize,
            },
        };
        return Api.get(`${END_POINT}/GetAdminUsers`, config);
    },
    GetNormalUsers(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                name: data.name,
                state: data.state,
                page: data.page,
                pageSize: data.pageSize,
            },
        };
        return Api.get(`${END_POINT}/GetNormalUsers`, config);
    },
    GetCompanyUsers(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                name: data.name,
                state: data.state,
                page: data.page,
                pageSize: data.pageSize,
            },
        };
        return Api.get(`${END_POINT}/GetCompanyUsers`, config);
    },


    CustomerProfileInfo(id) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                userId: id
            },
        };
        return Api.get(`${END_POINT}/CustomerProfileInfo`, config);
    },
    CompanyProfileInfo(id) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                userId: id
            },
        };
        return Api.get(`${END_POINT}/CompanyProfileInfo`, config);
    },
    AdminProfileInfo(id) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                userId: id
            },
        };
        return Api.get(`${END_POINT}/AdminProfileInfo`, config);
    },


    UserLogin(data) {
        return Api.post(`${END_POINT}/UserLogin`, data);
    },
    AdminLogin(data) {
        return Api.post(`${END_POINT}/AdminLogin`, data);
    },


    CustomerCreate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        return Api.post(`${END_POINT}/CustomerCreate`, data, config);
    },
    CustomerUpdate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        return Api.put(`${END_POINT}/CustomerUpdate`, data, config);
    },
    ChangeStatusCustomer(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        return Api.put(`${END_POINT}/ChangeStatusCustomer`, data, config);
    },
    DeleteCustomer(Id) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                Id: Id
            }
        };
        //let config = {
        //    headers: {
        //        'Authorization': token,
        //        'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //      },
        //};
        const responce = Api.delete(`${END_POINT}/DeleteCustomer`, config);
        return responce;
    },


    CompanyCreate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        return Api.post(`${END_POINT}/CompanyCreate`, data, config);
    },
    CompanyUpdate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        return Api.put(`${END_POINT}/CompanyUpdate`, data, config);
    },
    ChangeStatusCompany(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        return Api.put(`${END_POINT}/ChangeStatusCompany`, data, config);
    },
    DeleteCompany(Id) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                Id: Id
            }
        };
        //let config = {
        //    headers: {
        //        'Authorization': token,
        //        'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //      },
        //};
        const responce = Api.delete(`${END_POINT}/DeleteCompany`, config);
        return responce;
    },


    AdminCreate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        return Api.post(`${END_POINT}/AdminCreate`, data, config);
    },
    AdminUpdate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        return Api.put(`${END_POINT}/AdminUpdate`, data, config);
    },
    ChangeStatusAdmin(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        return Api.put(`${END_POINT}/ChangeStatusAdmin`, data, config);
    },
    DeleteAdmin(Id) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                Id: Id
            }
        };
        //let config = {
        //    headers: {
        //        'Authorization': token,
        //        'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //      },
        //};
        const responce = Api.delete(`${END_POINT}/DeleteAdmin`, config);
        return responce;
    },


    UpdateCustomerImage(imagePath) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

            let config = {
                // headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
                headers: { 'Authorization': token, 'Content-Type': 'application/json', },
            };

        return Api.put(`${END_POINT}/UpdateCustomerImage`, imagePath, config);
    },
    UpdateCompanyImage(imagePath) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            // headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            headers: { 'Authorization': token, 'Content-Type': 'application/json', },
        };

        return Api.put(`${END_POINT}/UpdateCompanyImage`, imagePath, config);
    },
    UpdateAdminImage(imagePath) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            // headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            headers: { 'Authorization': token, 'Content-Type': 'application/json', },
        };
        return Api.put(`${END_POINT}/UpdateAdminImage`,imagePath, config);
    },

    SendUserNewPassword(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };

        const responce = Api.put(`${END_POINT}/SendUserNewPassword`, data, config);
        return responce;
    },
    GetNewPassword(data) {
        const responce = Api.put(`${END_POINT}/GetNewPassword`, data);
        return responce;
    },
    ChangePassword(data) {
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

        const responce = Api.put(`${END_POINT}/ChangePassword`, data, config);
        return responce;
    },

}