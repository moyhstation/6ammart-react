import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    guestUserInfo: null
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
        }
    }
});

export const { setGuestUserInfo, clearGuestUserInfo } = guestUserSlice.actions;
export default guestUserSlice.reducer;

