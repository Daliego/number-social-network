import { Axios, AxiosRequestConfig } from "axios";
import { handleServiceError } from "./@shared/handleServiceError";

export async function get<T>(
  axiosInstance: Axios,
  path: string,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axiosInstance.get<T>(path, config);
    return response.data;
  } catch (error: any) {
    throw handleServiceError(error);
  }
}
