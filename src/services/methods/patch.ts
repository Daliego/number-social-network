import { Axios } from "axios";
import { handleServiceError } from "./@shared/handleServiceError";

export async function patch<T>(
  axiosInstance: Axios,
  path: string,
  payload?: unknown
): Promise<T> {
  try {
    const response = await axiosInstance.patch<T>(path, payload);
    return response.data;
  } catch (error: any) {
    throw handleServiceError(error);
  }
}
