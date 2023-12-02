import MainApi from "../../../MainApi";
import { useQuery } from "react-query";
import { parcel_video_api } from "../../../ApiRoutes";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getParcelVideo = async () => {
  const { data } = await MainApi.get(parcel_video_api);
  return data;
};

export default function useParcelVideo() {
  return useQuery("video-content", getParcelVideo, {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}