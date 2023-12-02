import MainApi from "../MainApi";
import {getToken} from "../../helper-functions/getToken";

export const ProfileApi = {
  profileInfo: () => {
    const token=getToken()
    return (
        token && MainApi.get("/api/v1/customer/info")
    )
  },
  profileUpdate: (profileData) =>
    MainApi.post("/api/v1/customer/update-profile", profileData),
};
