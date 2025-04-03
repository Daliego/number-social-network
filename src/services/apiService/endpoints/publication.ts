import { PUBLICATION_PATH } from "../../../constants/paths";
import { axiosConfig } from "../axiosConfig/client";
import { apiMethods } from "../../../../utils/services/apiInterfaces";

export const PUBLICATION = apiMethods(axiosConfig, PUBLICATION_PATH);
export const PUBLICATION_UNPROTECTED = apiMethods(
  axiosConfig,
  "/unprotected" + PUBLICATION_PATH
);
