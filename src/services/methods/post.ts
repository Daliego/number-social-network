import { Axios } from "axios";
import { handleServiceError } from "./@shared/handleServiceError";

export async function post<T>(
  axiosInstance: Axios,
  url: string,
  payload?: unknown,
): Promise<T> {
  try {
    const response = await axiosInstance.post<T>(url, payload);
    return response.data;
  } catch (error: any) {
    throw handleServiceError(error);
  }
}
