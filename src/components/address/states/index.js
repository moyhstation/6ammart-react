export const initialState = {
  openModal: false,
  showCurrentLocation: true,
  predictions: [],
  placeId: "",
  placeDescription: null,
  zoneIdEnabled: true,
  geoLocationEnable: false,
  placeDetailsEnabled: false,
  searchKey: "",
  enabled: false,
  currentLocation: "",
  location: null,
  openLocation: false,
  rerenderMap: false,
  streetNumber: "",
  houseNumber: "",
  floor: "",
  note: "",
  addressType: "",
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "setOpenModal":
      return {
        ...state,
        openModal: action.payload,
      };
    case "setShowCurrentLocation":
      return {
        ...state,
        showCurrentLocation: action.payload,
      };
    case "setPredictions":
      return {
        ...state,
        predictions: action.payload,
      };
    case "setPlaceId":
      return {
        ...state,
        placeId: action.payload,
      };
    case "setPlaceDescription":
      return {
        ...state,
        placeDescription: action.payload,
      };
    case "setZoneIdEnabled":
      return {
        ...state,
        zoneIdEnabled: action.payload,
      };
    case "setGeoLocationEnable":
      return {
        ...state,
        geoLocationEnable: action.payload,
      };
    case "setPlaceDetailsEnabled":
      return {
        ...state,
        placeDetailsEnabled: action.payload,
      };
    case "setSearchKey":
      return {
        ...state,
        searchKey: action.payload,
      };
    case "setEnabled":
      return {
        ...state,
        enabled: action.payload,
      };
    case "setCurrentLocation":
      return {
        ...state,
        currentLocation: action.payload,
      };
    case "setLocation":

      return {
        ...state,
        location: action.payload,
      };
    case "setOpenLocation":
      return {
        ...state,
        openLocation: action.payload,
      };
    case "setRerenderMap":
      return {
        ...state,
        rerenderMap: !state.rerenderMap,
      };
    case "setStreetNumber":
      return {
        ...state,
        streetNumber: action.payload,
      };
    case "setHouseNumber":
      return {
        ...state,
        houseNumber: action.payload,
      };
    case "setFloor":
      return {
        ...state,
        floor: action.payload,
      };
    case "setAddressType":
      return {
        ...state,
        addressType: action.payload,
      };
    default:
      return state;
  }
};

export const ACTIONS = {
  setOpenModal: "setOpenModal",
  setShowCurrentLocation: "setShowCurrentLocation",
  setPredictions: "setPredictions",
  setPlaceId: "setPlaceId",
  setPlaceDescription: "setPlaceDescription",
  setZoneIdEnabled: "setZoneIdEnabled",
  setGeoLocationEnable: "setGeoLocationEnable",
  setPlaceDetailsEnabled: "setPlaceDetailsEnabled",
  setSearchKey: "setSearchKey",
  setEnabled: "setEnabled",
  setCurrentLocation: "setCurrentLocation",
  setLocation: "setLocation",
  setOpenLocation: "setOpenLocation",
  setRerenderMap: "setRerenderMap",
  setStreetNumber: "setStreetNumber",
  setHouseNumber: "setHouseNumber",
  setFloor: "setFloor",
  setAddressType: "setAddressType",
};
