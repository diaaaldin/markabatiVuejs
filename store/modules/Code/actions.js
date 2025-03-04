import Category from "@/apis/Category";
import router from "@/router/index";
import cities from "@/config/cities.json";
import states from "@/config/states.json";

export const GetBrands = ({ commit, dispatch }) => {
    return Category.GetBrands().then(function (response) {
        commit('SET_BRANDS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        if (error) {
            // Error with response
            if (error.status == 401) {
                console.log("Unauthorized");
            } else {
                console.log(error.message);
            }
        } else {
            // Network failure or unexpected error
            console.log("An error occurred. Please try again later.");
        }
    });
}
export const GetBrandModels = ({ commit, dispatch },id) => {
    return Category.GetBrandModels(id).then(function (response) {
        commit('SET_BRAND_MODELS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        if (error) {
            // Error with response
            if (error.status == 401) {
                console.log("Unauthorized");
            } else {
                console.log(error.message);
            }
        } else {
            // Network failure or unexpected error
            console.log("An error occurred. Please try again later.");
        }
    });
}

export const GetPaintedStatus = ({ commit, dispatch }) => {
    return Category.GetPaintedStatus().then(function (response) {
        commit('SET_PAINTED_STATUS_DATA', response.data.data);
        return response.data.data;

    }).catch(function (error) {
        if (error) {
            // Error with response
            if (error.status == 401) {
                console.log("Unauthorized");
            } else {
                console.log(error.message);
            }
        } else {
            // Network failure or unexpected error
            console.log("An error occurred. Please try again later.");
        }
    });
}
export const GetSpecification = ({ commit, dispatch }) => {
    return Category.GetSpecification().then(function (response) {
        commit('SET_SPECIFICATIONS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        if (error) {
            // Error with response
            if (error.status == 401) {
                console.log("Unauthorized");
            } else {
                console.log(error.message);
            }
        } else {
            // Network failure or unexpected error
            console.log("An error occurred. Please try again later.");
        }
    });
}
export const GetOrderStatus = ({ commit, dispatch }) => {
    return Category.GetOrderStatus().then(function (response) {
        commit('SET_ORDER_STATUS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        if (error) {
            // Error with response
            if (error.status == 401) {
                console.log("Unauthorized");
            } else {
                console.log(error.message);
            }
        } else {
            // Network failure or unexpected error
            console.log("An error occurred. Please try again later.");
        }
    });
}
export const GetVehicleStatus = ({ commit, dispatch }) => {
    return Category.GetVehicleStatus().then(function (response) {
        commit('SET_VEHICLE_STATUS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        if (error) {
            // Error with response
            if (error.status == 401) {
                console.log("Unauthorized");
            } else {
                console.log(error.message);
            }
        } else {
            // Network failure or unexpected error
            console.log("An error occurred. Please try again later.");
        }
    });
}
export const GetBodyType = ({ commit, dispatch }) => {
    return Category.GetBodyType().then(function (response) {
        commit('SET_BODY_TYPES_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        if (error) {
            // Error with response
            if (error.status == 401) {
                console.log("Unauthorized");
            } else {
                console.log(error.message);
            }
        } else {
            // Network failure or unexpected error
            console.log("An error occurred. Please try again later.");
        }
    });
}
export const GetColor = ({ commit, dispatch }) => {
    return Category.GetColor().then(function (response) {
        commit('SET_COLORS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        if (error) {
            // Error with response
            if (error.status == 401) {
                console.log("Unauthorized");
            } else {
                console.log(error.message);
            }
        } else {
            // Network failure or unexpected error
            console.log("An error occurred. Please try again later.");
        }
    });
}
export const GetPaintedType = ({ commit, dispatch }) => {
     Category.GetPaintedType().then(function (response) {
        commit('SET_PAINTED_TYPES_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        if (error) {
            // Error with response
            if (error.status == 401) {
                console.log("Unauthorized");
            } else {
                console.log(error.message);
            }
        } else {
            // Network failure or unexpected error
            console.log("An error occurred. Please try again later.");
        }
    });
}
export const GetGearType = ({ commit, dispatch }) => {
    Category.GetGearType().then(function (response) {
        commit('SET_GEAR_TYPES_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        if (error) {
            // Error with response
            if (error.status == 401) {
                console.log("Unauthorized");
            } else {
                console.log(error.message);
            }
        } else {
            // Network failure or unexpected error
            console.log("An error occurred. Please try again later.");
        }
    });
}
export const GetOilType = ({ commit, dispatch }) => {
    Category.GetOilType().then(function (response) {
        commit('SET_OIL_TYPES_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        if (error) {
            // Error with response
            if (error.status == 401) {
                console.log("Unauthorized");
            } else {
                console.log(error.message);
            }
        } else {
            // Network failure or unexpected error
            console.log("An error occurred. Please try again later.");
        }
    });
}
export const GetCurrency = ({ commit, dispatch }) => {
    Category.GetCurrency().then(function (response) {
        commit('SET_CURRENCY_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        if (error) {
            // Error with response
            if (error.status == 401) {
                console.log("Unauthorized");
            } else {
                console.log(error.message);
            }
        } else {
            // Network failure or unexpected error
            console.log("An error occurred. Please try again later.");
        }
    });
}
export const GetUserType = ({ commit, dispatch }) => {
    Category.GetUserType().then(function (response) {
        commit('SET_USER_TYPES_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        if (error) {
            // Error with response
            if (error.status == 401) {
                console.log("Unauthorized");
            } else {
                console.log(error.message);
            }
        } else {
            // Network failure or unexpected error
            console.log("An error occurred. Please try again later.");
        }
    });
}
export const GetUserStatus = ({ commit, dispatch }) => {
    Category.GetUserStatus().then(function (response) {
        commit('SET_USER_STATUS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        if (error) {
            // Error with response
            if (error.status == 401) {
                console.log("Unauthorized");
            } else {
                console.log(error.message);
            }
        } else {
            // Network failure or unexpected error
            console.log("An error occurred. Please try again later.");
        }
    });
}
export const GetSendMessageWays = ({ commit, dispatch }) => {
    Category.GetSendMessageWays().then(function (response) {
        commit('SET_SEND_MESSAGE_WAYS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        if (error) {
            // Error with response
            if (error.status == 401) {
                console.log("Unauthorized");
            } else {
                console.log(error.message);
            }
        } else {
            // Network failure or unexpected error
            console.log("An error occurred. Please try again later.");
        }
    });
}
export const GetAnnouncementTypes = ({ commit, dispatch }) => {
    Category.GetAnnouncementTypes().then(function (response) {
        commit('SET_ANNOUNCEMENT_TYPE_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        if (error) {
            // Error with response
            if (error.status == 401) {
                console.log("Unauthorized");
            } else {
                console.log(error.message);
            }
        } else {
            // Network failure or unexpected error
            console.log("An error occurred. Please try again later.");
        }
    });
}
export const GetConstants = ({ commit, dispatch }) => {
    Category.GetConstants().then(function (response) {
        console.log("response.data.data : " , response.data.data);
        commit('SET_CONSTANTS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        if (error) {
            // Error with response
            if (error.status == 401) {
                console.log("Unauthorized");
            } else {
                console.log(error.message);
            }
        } else {
            // Network failure or unexpected error
            console.log("An error occurred. Please try again later.");
        }
    });
}

export const GetStates = ({ commit, dispatch }) => {
        commit('SET_STATES_DATA', states);
        return states;
}
export const GetCities = ({ commit, dispatch }) => {
        commit('SET_CITIES_DATA', cities);
        return cities;
}


export const CreateCode = ({ commit, dispatch }, data) => {
    return Category.CreateCode(data).then(function (response) {
        commit('SET_CODE_CREATE_UPDATE_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const UpdateCode = ({ commit, dispatch }, data) => {
    return Category.UpdateCode(data).then(function (response) {
        commit('SET_CODE_CREATE_UPDATE_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const DeleteCode = ({ commit, dispatch }, id) => {
    return Category.DeleteCode(id).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}


export const CreateBrand = ({ commit, dispatch }, data) => {
    return Category.CreateBrand(data).then(function (response) {
        commit('SET_CREATE_BRAND', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const UpdateBrand = ({ commit, dispatch }, data) => {
    return Category.UpdateBrand(data).then(function (response) {
        commit('SET_UPDATED_BRAND', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const DeleteBrand = ({ commit, dispatch }, brandId) => {
    return Category.DeleteBrand(brandId).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}


export const CreateBrandModel = ({ commit, dispatch }, data) => {
    return Category.CreateBrandModel(data).then(function (response) {
        commit('SET_CREATE_BRAND_MODEL', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const UpdateBrandModel = ({ commit, dispatch }, data) => {
    return Category.UpdateBrandModel(data).then(function (response) {
        commit('SET_UPDATED_BRAND_MODEL', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}



export const DeleteBrandModel = ({ commit, dispatch }, brandModelId) => {
    return Category.DeleteBrandModel(brandModelId).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
