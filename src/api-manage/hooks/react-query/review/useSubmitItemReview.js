import { useMutation } from "react-query";
import {
  delete_wish_list_api,
  submit_items_review_api,
} from "../../../ApiRoutes";
import MainApi from "../../../MainApi";

//import { onErrorResponse } from '../../../../components/api-response-messages/ApiResponseMessages'

const submitData = async (formData) => {
  const { data } = await MainApi.post(`${submit_items_review_api}`, formData);
  return data;
};
export const useSubmitItemReview = () => {
  return useMutation("submit-review", submitData);
};
