import Order from "@/apis/Order";

export const GetStarActiveVehicles = ({ commit, dispatch }) => {
   return Order.GetStarActiveVehicles().then(function (response) {
       commit('SET_STAR_ACTIVE_VEHICLE_DATA', response.data.data);
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}

export const GetStarVehicleOrder = ({ commit, dispatch },orderId) => {
   return Order.GetStarVehicleOrder(orderId).then(function (response) {
       commit('SET_ORDER_DATA', response.data.data);
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}
export const GetUserStarVehiclesOrders = ({ commit, dispatch },data) => {
   return Order.GetUserStarVehiclesOrders(data).then(function (response) {
       commit('SET_ORDERS_DATA', response.data.data);
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}

export const GetAnnouncementOrder = ({ commit, dispatch },orderId) => {
   return Order.GetAnnouncementOrder(orderId).then(function (response) {
       commit('SET_ORDER_DATA', response.data.data);
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}
export const GetUserAnnouncementOrders = ({ commit, dispatch },data) => {
   return Order.GetUserAnnouncementOrders(data).then(function (response) {
       commit('SET_ORDERS_DATA', response.data.data);
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}

export const GetStarVehicleOrderDate = ({ commit, dispatch }) => {
   return Order.GetStarVehicleOrderDate().then(function (response) {
       commit('SET_ORDER_DATE', response.data.data);
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}
export const GetAnnouncementOrderDate = ({ commit, dispatch },announcementType) => {
   return Order.GetAnnouncementOrderDate(announcementType).then(function (response) {
       commit('SET_ORDER_DATE', response.data.data);
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}

export const GetStarVehicleOrderDailyPrice = ({ commit, dispatch }) => {
   return Order.GetStarVehicleOrderDailyPrice().then(function (response) {
       commit('SET_ORDER_DAILY_PRICE', response.data.data);
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}
export const GetAnnouncementOrderDailyPrice = ({ commit, dispatch },announcementType) => {
   return Order.GetAnnouncementOrderDailyPrice(announcementType).then(function (response) {
       commit('SET_ORDER_DAILY_PRICE', response.data.data);
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}

export const CreateStarVehicleOrder = ({ commit, dispatch },data) => {
   return Order.CreateStarVehicleOrder(data).then(function (response) {
    //    commit('SET_ORDER_CREATE_UPDATE_DATA', response.data.data);
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}
export const UpdateStarVehicleOrder = ({ commit, dispatch },data) => {
   return Order.UpdateStarVehicleOrder(data).then(function (response) {
    //    commit('SET_ORDER_CREATE_UPDATE_DATA', response.data.data);
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}
export const DeleteStarVehicleOrder = ({ commit, dispatch },orderId) => {
   return Order.DeleteStarVehicleOrder(orderId).then(function (response) {
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}
export const UpdateStarVehicleOrderStatus = ({ commit, dispatch },data) => {
   return Order.UpdateStarVehicleOrderStatus(data).then(function (response) {
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}



export const CreateAnnouncementOrder = ({ commit, dispatch },data) => {
   return Order.CreateAnnouncementOrder(data).then(function (response) {
    //    commit('SET_ORDER_CREATE_UPDATE_DATA', response.data.data);
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}
export const UpdateAnnouncementOrder = ({ commit, dispatch },data) => {
   return Order.UpdateAnnouncementOrder(data).then(function (response) {
    //    commit('SET_ORDER_CREATE_UPDATE_DATA', response.data.data);
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}
export const DeleteAnnouncementOrder = ({ commit, dispatch },orderId) => {
   return Order.DeleteAnnouncementOrder(orderId).then(function (response) {
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}
export const UpdateAnnouncementOrderStatus = ({ commit, dispatch },data) => {
   return Order.UpdateAnnouncementOrderStatus(data).then(function (response) {
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}

export const SaveOrderDataToState = ({ commit, dispatch },data) => {
     commit('SET_ORDER_DATA', data);
     return data; 
}



