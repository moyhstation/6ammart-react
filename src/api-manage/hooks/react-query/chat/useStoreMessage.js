import { useMutation } from "react-query";
import { store_message_api } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";

const storeData = async (cData) => {
  const { id, text, receiver_type, receiverId, file } = cData;

  let formData = new FormData();
  formData.append(
    receiverId ? "receiver_id" : "conversation_id",
    id === "admin" ? 0 : id
  );
  if (text === "") {
    file.forEach((file) => {
      formData.append("image[]", file);
    });
  } else {
    formData.append("message", text);
    file.forEach((file) => {
      formData.append("image[]", file);
    });
  }

  formData.append("receiver_type", receiver_type);
  const { data } = await MainApi.post(`${store_message_api}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
export const useStoreMessage = () => {
  return useMutation("store_message", storeData);
};
