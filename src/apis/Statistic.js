import Api from "./Api";

const END_POINT = 'Statistics';

export default {
    HomeStatisticsInfo() {
        return Api.get(`${END_POINT}/HomeStatisticsInfo`);
    },
}