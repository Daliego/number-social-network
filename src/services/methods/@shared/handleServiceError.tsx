import { AxiosError } from "axios";
import { createNetworkError } from "../../../../utils/@shared/functions";

export function handleServiceError(error: AxiosError): Error {
  if (error.response) {
    return error;
  }
  if (error.request) {
    return createNetworkError();
  }
  return new Error(error.message || "Erro desconhecido");
}
