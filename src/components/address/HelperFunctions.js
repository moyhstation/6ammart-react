import { ACTIONS } from "./states";

export const handleClick = (dispatch) => {
  dispatch({ type: ACTIONS.setOpenModal, payload: true });
};
export const handleCloseModal = (dispatch) => {
  dispatch({ type: ACTIONS.setOpenModal, payload: false });
};
export const handleChange = (event, value, dispatch) => {
  if (value) {
    dispatch({ type: ACTIONS.setPlaceId, payload: value?.place_id });
    dispatch({
      type: ACTIONS.setPlaceDescription,
      payload: value?.description,
    });
    dispatch({
      type: ACTIONS.setZoneIdEnabled,
      payload: false,
    });
    dispatch({
      type: ACTIONS.setGeoLocationEnable,
      payload: true,
    });
  }
  dispatch({
    type: ACTIONS.setPlaceDetailsEnabled,
    payload: true,
  });
};

export const handleChangeForSearch = (event, dispatch) => {
  dispatch({
    type: ACTIONS.setSearchKey,
    payload: event.target.value,
  });
  if (event.target.value) {
    dispatch({
      type: ACTIONS.setCurrentLocation,
      payload: event.target.value,
    });
    dispatch({
      type: ACTIONS.setEnabled,
      payload: true,
    });
    dispatch({
      type: ACTIONS.setGeoLocationEnable,
      payload: true,
    });
  } else {
    dispatch({
      type: ACTIONS.setCurrentLocation,
      payload: "",
    });
    dispatch({
      type: ACTIONS.setEnabled,
      payload: false,
    });
  }
};

export const handleAgreeLocation = (coords, dispatch) => {
  if (coords) {
    dispatch({
      type: ACTIONS.setLocation,
      payload: { lat: coords?.latitude, lng: coords?.longitude },
    });
    dispatch({
      type: ACTIONS.setOpenLocation,
      payload: false,
    });
    dispatch({
      type: ACTIONS.setShowCurrentLocation,
      payload: true,
    });
    dispatch({
      type: ACTIONS.setGeoLocationEnable,
      payload: true,
    });
  } else {
    dispatch({
      type: ACTIONS.setOpenLocation,
      payload: true,
    });
  }
};
export const handleCloseLocation = (dispatch) => {
  dispatch({
    type: ACTIONS.setOpenLocation,
    payload: false,
  });
  dispatch({
    type: ACTIONS.setShowCurrentLocation,
    payload: false,
  });
  dispatch({
    type: ACTIONS.setGeoLocationEnable,
    payload: false,
  });
  dispatch({
    type: ACTIONS.setCurrentLocation,
    payload: "",
  });
};
