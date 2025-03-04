import Role from "@/apis/Roles";

export const GetAdminPermissions = ({ commit, dispatch }) => {
    return Role.GetAdminPermissions().then(function (response) {
        commit('SET_USER_PERMISSIONS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetCustomerPermissions = ({ commit, dispatch }) => {
    return Role.GetCustomerPermissions().then(function (response) {
        commit('SET_USER_PERMISSIONS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetCompanyPermissions = ({ commit, dispatch }) => {
    return Role.GetCompanyPermissions().then(function (response) {
        commit('SET_USER_PERMISSIONS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const UpdateUserPermission = ({ commit, dispatch } , data) => {
    return Role.UpdateUserPermission(data).then(function (response) {
        //commit('SET_STORE_PERMISSIONS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}
