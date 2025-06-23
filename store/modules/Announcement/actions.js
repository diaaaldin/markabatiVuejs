import Announcement from "@/apis/Announcement";

export const GetMainAnnouncementActiveOrder = ({ commit, dispatch }) => {
   return Announcement.GetMainAnnouncementActiveOrder().then(function (response) {
       commit('SET_MAIN_ANNOUNCEMENT_DATA', response.data.data);
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}
export const GetVerticalAnnouncementActiveOrder = ({ commit, dispatch }) => {
   return Announcement.GetVerticalAnnouncementActiveOrder().then(function (response) {
       commit('SET_VERTICAL_ANNOUNCEMENT_DATA', response.data.data);
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}
export const GetHorizontalAnnouncementActiveOrder = ({ commit, dispatch }) => {
   return Announcement.GetHorizontalAnnouncementActiveOrder().then(function (response) {
       commit('SET_HORIZONTAL_ANNOUNCEMENT_DATA', response.data.data);
       return response.data.data; 
   }).catch(function (error) {
           throw error;
   });
}