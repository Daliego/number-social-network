import { Axios } from "axios";
import { handleServiceError } from "./@shared/handleServiceError";


export async function del<T>(axiosInstance: Axios, path: string): Promise<T> {
  try {
    const response = await axiosInstance.delete<T>(path);
    return response.data;
  } catch (error: any) {
    throw handleServiceError(error);
  }
}
