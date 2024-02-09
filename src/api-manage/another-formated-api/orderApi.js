import MainApi from "../MainApi";

export const OrderApi = {
  placeOrder: (formData) => {
    return MainApi.post("/api/v1/customer/order/place", formData);
  },
  prescriptionPlaceOrder: (orderData) => {

    const {
      store_id,
      distance,
      address,
      longitude,
      latitude,
      prescriptionImages,
      order_note,
      guest_id,
      contact_person_name,
      contact_person_number,
      dm_tips,
    } = orderData;
    let formData = new FormData();
    formData.append("store_id", store_id);
    formData.append("distance", distance);
    formData.append("address", address);
    formData.append("longitude", longitude);
    formData.append("latitude", latitude);
    prescriptionImages.forEach((prescriptionImages) => {
      formData.append("order_attachment[]", prescriptionImages);
    });
    formData.append("order_note", order_note);
    formData.append("guest_id",guest_id)
    formData.append("contact_person_number",contact_person_number)
    formData.append("contact_person_name",contact_person_name)
    formData.append("dm_tips",dm_tips)

    return MainApi.post("/api/v1/customer/order/prescription/place", formData);
  },
  orderHistory: (orderType, limit, offset) => {
    return MainApi.get(
      `/api/v1/customer/order/${orderType}?limit=${limit}&offset=${offset}`
    );
  },
  orderDetails: (order_id) => {
    return MainApi.get(`/api/v1/customer/order/details?order_id=${order_id}`);
  },
  orderTracking: (order_id) => {
    return MainApi.get(`/api/v1/customer/order/track?order_id=${order_id}`);
  },
  CancelOrder: (formData) => {
    return MainApi.post("/api/v1/customer/order/cancel", formData);
  },
  FailedPaymentMethodUpdate: (formData) => {
    return MainApi.post("/api/v1/customer/order/payment-method", formData);
  },
  FailedPaymentMethodCancel: (formData) => {
    return MainApi.post("/api/v1/customer/order/cancel", formData);
  },
};
