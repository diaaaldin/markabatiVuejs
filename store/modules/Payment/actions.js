import Payment from "@/apis/Payment";

export const GetUserPaymentMovements = ({ commit, dispatch }) => {
    return Payment.GetUserPaymentMovements().then(function (response) {
        commit('SET_PAYMENT_MOVEMENTS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
