import MainApi from "../../../MainApi";
import { useQuery } from "react-query";
import { parcel_category_api, testimonial_api } from "../../../ApiRoutes";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getTestimonial = async () => {
  const { data } = await MainApi.get(testimonial_api);
  return data;
};

export default function useGetTestimonial() {
  return useQuery("testimonial", getTestimonial, {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
