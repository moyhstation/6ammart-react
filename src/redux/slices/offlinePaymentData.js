import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    offlinePaymentInfo: null,
    offlineMethod: "",
    offlineInfoStep: 0,
    orderDetailsModal: false,
}
const offlinePaymentInfoSlice = createSlice({
    name: 'offline-payment',
    initialState,
    reducers: {
        setOfflinePaymentInfo: (state, action) => {
            state.offlinePaymentInfo = action.payload;
        },
        setOfflineMethod: (state, action) => {
            state.offlineMethod = action.payload;
        },
        setOfflineInfoStep: (state, action) => {
            state.offlineInfoStep = action.payload;
        },
        setOrderDetailsModal: (state, action) => {
            state.orderDetailsModal = action.payload;
        },
        clearOfflinePaymentInfo: (state) => {
            // Reset the state to its initial values
            state.offlinePaymentInfo = null;
            state.offlineMethod = "";
            state.offlineInfoStep = 0;
            // state.orderDetailsModal = false;
        }
    }
});

export const { setOfflinePaymentInfo, setOfflineMethod,setOrderDetailsModal, setOfflineInfoStep,clearOfflinePaymentInfo } = offlinePaymentInfoSlice.actions;
export default offlinePaymentInfoSlice.reducer;