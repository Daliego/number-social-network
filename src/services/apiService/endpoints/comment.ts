import { COMMENT_PATH } from "../../../constants/paths";
import { axiosConfig } from "../axiosConfig/client";
import { apiMethods } from "../../../../utils/services/apiInterfaces";

export const COMMENT = apiMethods(axiosConfig, COMMENT_PATH);
export const COMMENT_UNPROTECTED = apiMethods(
  axiosConfig,
  "/unprotected" + COMMENT_PATH
);
