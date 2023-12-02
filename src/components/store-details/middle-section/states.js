export const initialState = {
  data: null,
  isSidebarOpen: false,
  categoryId: [],
  offSet: 1,
  searchKey: "",
  minMax: [0, 1],
  type: "all",
  sortBy: "high2Low",
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "setData":
      return {
        ...state,
        data: action.payload,
      };
    case "setIsSidebarOpen":
      return {
        ...state,
        isSidebarOpen: action.payload,
      };
    case "setCategoryId":
      return {
        ...state,
        categoryId: action.payload,
      };
    case "setOffSet":
      return {
        ...state,
        offSet: state.offSet + action.payload,
      };
    case "setSearchKey":
      return {
        ...state,
        searchKey: action.payload,
      };
    case "setType":
      return {
        ...state,
        type: action.payload,
      };
    case "setMinMax":
      return {
        ...state,
        minMax: action.payload,
      };
    case "setSortBy":
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
};
export const ACTION = {
  setData: "setData",
  setIsSidebarOpen: "setIsSidebarOpen",
  setCategoryId: "setCategoryId",
  setOffSet: "setOffSet",
  setSearchKey: "setSearchKey",
  setMinMax: "setMinMax",
  setType: "setType",
  setSortBy: "setSortBy",
};
