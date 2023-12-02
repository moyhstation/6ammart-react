import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  jwtToken: { credential: "", clientId: "" },
};
export const fbCredentialSlice = createSlice({
  name: "fbCredential",
  initialState,
  reducers: {
    setUserInfoByDispatch: (state, action) => {
      state.userInfo = action.payload;
    },
    setJwtTokenByDispatch: (state, action) => {
      state.jwtToken = {
        credential: action.payload.accessToken,
        clientId: action?.payload?.userID || action?.payload?.id,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserInfoByDispatch, setJwtTokenByDispatch } =
  fbCredentialSlice.actions;
export default fbCredentialSlice.reducer;
