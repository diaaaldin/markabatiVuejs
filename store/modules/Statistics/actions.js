import Statistic from "@/apis/Statistic";

export const HomeStatisticsInfo = ({ commit, dispatch }) => {
    return Statistic.HomeStatisticsInfo().then(function (response) {
        //commit('SET_RECORD_VISIT', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
