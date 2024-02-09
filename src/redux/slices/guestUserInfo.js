import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    guestUserInfo: null,
    guestUserOrderId: null,
}
const guestUserSlice = createSlice({
    name: 'guest-user',
    initialState,
    reducers: {
        setGuestUserInfo: (state, action) => {
            state.guestUserInfo = action.payload;
        },
        clearGuestUserInfo: (state) => {
            state.guestUserInfo = null;
        },
        setGuestUserOrderId: (state, action) => {
            state.guestUserOrderId = action.payload;
        },
    }
});

export const { setGuestUserInfo, clearGuestUserInfo, setGuestUserOrderId, setTrackContactNumber } = guestUserSlice.actions;
export default guestUserSlice.reducer;

