import User from "@/apis/Users";
import { UserTypeEnum } from '@/config/config';


export const GetWebSiteComunicationInfo = ({ commit, dispatch }) => {
    return User.GetWebSiteComunicationInfo().then(function (response) {
        commit('SET_SITE_COMUNICATION_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const GetUsers = ({ commit, dispatch }, data) => {
    return User.GetUsers(data).then(function (response) {
        commit('SET_USERS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const GetAdminUsers = ({ commit, dispatch }, data) => {
    console.log(data);
    return User.GetAdminUsers(data).then(function (response) {
        commit('SET_USERS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const GetNormalUsers = ({ commit, dispatch }, data) => {
    return User.GetNormalUsers(data).then(function (response) {
        commit('SET_USERS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const GetCompanyUsers = ({ commit, dispatch }, data) => {
    return User.GetCompanyUsers(data).then(function (response) {
        commit('SET_USERS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}

export const GetSellers = ({ commit, dispatch }, data) => {
    return User.GetSellers(data).then(function (response) {
        commit('SET_USERS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}

export const CustomerProfileInfo = ({ commit, dispatch }, userId) => {
    return User.CustomerProfileInfo(userId).then(function (response) {
        commit('SET_USER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}

export const CompanyProfileInfo = ({ commit, dispatch }, userId) => {
    return User.CompanyProfileInfo(userId).then(function (response) {
        commit('SET_USER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}

export const UserLogin = ({ commit, dispatch }, data) => {
    return User.UserLogin(data).then(function (response) {
        if (response.data.data.id > 0) {
            // console.log("response : " , response);
            // commit('USER_LOGINNAME', response.data.data.name);
            localStorage.setItem("token", JSON.stringify(response.data.data.token));
            // localStorage.setItem("slug", response.data.data.slug);
            response.data.data.token = "";
            localStorage.setItem('userName', JSON.parse(JSON.stringify(response.data.data.name)));
            localStorage.setItem('userType', JSON.parse(JSON.stringify(response.data.data.userType)));
            localStorage.setItem('id', JSON.parse(JSON.stringify(response.data.data.id)));
        }
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}

export const AdminLogin = ({ commit, dispatch }, data) => {
    return User.AdminLogin(data).then(function (response) {
       
        if (response.data.data.id > 0) {
            commit('USER_LOGINNAME', response.data.data.fullName);
            
            localStorage.setItem("token", JSON.stringify(response.data.data.token));
            response.data.data.token = "";
            localStorage.setItem('userName', JSON.parse(JSON.stringify(response.data.data.name)));
            localStorage.setItem('id', JSON.parse(JSON.stringify(response.data.data.id)));
            localStorage.setItem('isAdmin', JSON.parse(JSON.stringify(true)));
            //localStorage.setItem('addressState',  JSON.parse(JSON.stringify(response.data.data.addressState)));
        }
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}


export const CustomerCreate = ({ commit, dispatch }, data) => {
    return User.CustomerCreate(data).then(function (response) {
        commit('SET_USER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const CustomerProfileUpdate = ({ commit, dispatch }, data) => {
    return User.CustomerProfileUpdate(data).then(function (response) {
        commit('SET_USER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const ChangeStatusCustomer = ({ commit, dispatch }, data) => {
    return User.ChangeStatusCustomer(data).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const DeleteCustomer = ({ commit, dispatch }, id) => {
    return User.DeleteCustomer(id).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}

export const CompanyCreate = ({ commit, dispatch }, data) => {
    return User.CompanyCreate(data).then(function (response) {
        commit('SET_USER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const CompanyProfileUpdate = ({ commit, dispatch }, data) => {
    return User.CompanyProfileUpdate(data).then(function (response) {
        commit('SET_USER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const ChangeStatusCompany = ({ commit, dispatch }, data) => {
    return User.ChangeStatusCompany(data).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const DeleteCompany = ({ commit, dispatch }, id) => {
    return User.DeleteCompany(id).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}

export const AdminCreate = ({ commit, dispatch }, data) => {
    return User.AdminCreate(data).then(function (response) {
        commit('SET_USER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const AdminUpdate = ({ commit, dispatch }, data) => {
    return User.AdminUpdate(data).then(function (response) {
        commit('SET_USER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const ChangeStatusAdmin = ({ commit, dispatch }, data) => {
    return User.ChangeStatusCustomer(data).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const DeleteAdmin = ({ commit, dispatch }, id) => {
    return User.DeleteAdmin(id).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}


export const UpdateCustomerImage = ({ commit, dispatch }, imagePath) => {
    return User.UpdateCustomerImage(imagePath).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const UpdateCompanyImage = ({ commit, dispatch }, imagePath) => {
    return User.UpdateCompanyImage(imagePath).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const UpdateAdminImage = ({ commit, dispatch }, imagePath) => {
    return User.UpdateAdminImage(imagePath).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}


export const SendUserNewPassword = ({ commit, dispatch }, data) => {
    return User.SendUserNewPassword(data).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const GetNewPassword = ({ commit, dispatch }, data) => {
    return User.GetNewPassword(data).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const ChangePassword = ({ commit, dispatch }, data) => {
    return User.ChangePassword(data).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}



