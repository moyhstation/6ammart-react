export const initialState = {
  userType: "vendor",
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "setUserType":
      return {
        userType: action.payload,
      };
    default:
      return state;
  }
};
export const ACTION = {
  setUserType: "setUserType",
};
