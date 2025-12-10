import Vehicle from "@/apis/Vehicle";

export const GetVehicle = ({ commit, dispatch },id) => {
    return Vehicle.GetVehicle(id).then(function (response) {
        commit('SET_VEHICEL_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetVehiclesRandomly = ({ commit, dispatch }, data) => {
    return Vehicle.GetVehiclesRandomly(data).then(function (response) {
        commit('SET_VEHICELS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetVehiclesFavorite = ({ commit, dispatch }) => {
    return Vehicle.GetVehiclesFavorite().then(function (response) {
        commit('SET_FAVORITE_VEHICELS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetVehiclesFavoriteId = ({ commit, dispatch }) => {
    return Vehicle.GetVehiclesFavoriteId().then(function (response) {
        commit('SET_FAVORITE_VEHICELS_ID_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const ToggleVehicleFavorite = ({ commit, dispatch },id) => {
    return Vehicle.ToggleVehicleFavorite(id).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetUserVehicles = ({ commit, dispatch },data) => {
    return Vehicle.GetUserVehicles(data).then(function (response) {
        commit('SET_USER_VEHICELS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetVehicelForUpdate = ({ commit, dispatch },id) => {
    // console.log("action run ");
    return Vehicle.GetVehicelForUpdate(id).then(function (response) {
        commit('SET_CREATE_UPDATE_VEHICEL_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetMyVehicles = ({ commit, dispatch },statusId) => {
    return Vehicle.GetMyVehicles(statusId).then(function (response) {
        commit('SET_MY_VEHICLES_DATA', response.data.data);
        return response.data.data; 
    }).catch(function (error) {
            throw error;
    });
}

export const GetVehicleUpdateInfo = ({ commit, dispatch },VehicleId) => {
    return Vehicle.GetVehicleUpdateInfo(VehicleId).then(function (response) {
        commit('GET_UPDATE_VEHICELS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const UpdateVehicle = ({ commit, dispatch },data) => {
    return Vehicle.UpdateVehicle(data).then(function (response) {
        // commit('SET_CREATE_UPDATE_VEHICEL_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const CreateVehicle = ({ commit, dispatch },data) => {
     return Vehicle.CreateVehicle(data).then(function (response) {
        //  commit('SET_CREATE_UPDATE_VEHICEL_DATA', response.data.data);
         return response.data.data; 
     }).catch(function (error) {
             throw error;
     });
}

export const DeleteVehicle = ({ commit, dispatch },VehicleId) => {
    return Vehicle.DeleteVehicle(VehicleId).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const UpdateVehicleStatus = ({ commit, dispatch },data) => {
    return Vehicle.UpdateVehicleStatus(data).then(function (response) {
        commit('SET_CREATE_UPDATE_VEHICEL_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const UpdateVehicleImage360 = ({ commit, dispatch },data) => {
    return Vehicle.UpdateVehicleImage360(data).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}
