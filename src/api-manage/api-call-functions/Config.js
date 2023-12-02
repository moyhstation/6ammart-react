import MainApi from "../MainApi";
import { config_api } from "../ApiRoutes";
export const ConfigApi = {
  config: () => MainApi.get(config_api),
};
