import axios, { AxiosError, AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import { post } from "../post"; // Corrija o caminho conforme necessário
import { handleServiceError } from "../../@shared/handleServiceError";
import { createNetworkError } from "@/utils/functions/@shared/createNetworkError";

describe("post function", () => {
  let mock: MockAdapter;
  let instance: AxiosInstance;

  beforeEach(() => {
    instance = axios.create();
    mock = new MockAdapter(instance);
  });

  const requestData = { id: 1, name: "Test" };

  it("should return data when the request is successful", async () => {
    const path = "/test-endpoint";
    const mockData = { message: "success" };

    mock.onPost(path).reply(200, mockData);

    await expect(
      post<typeof mockData>(instance, path, requestData),
    ).resolves.toEqual(mockData);
  });

  it("should throw an error when the request fails", async () => {
    const path = "/test-endpoint";

    const mockData = { detail: "teste throw error on the request fail" };
    const axiosResponseData = {
      response: {
        status: 500,
        data: mockData,
      },
    };

    mock.onPost(path).reply(500, mockData);

    await expect(post(instance, path, requestData)).rejects.toMatchObject(
      axiosResponseData,
    );
  });

  it("should throw an error if a code error happens before the request", () => {
    const unexpectedError = new AxiosError("Generic error simulation");

    const handledError = handleServiceError(unexpectedError);

    expect(handledError).toBeInstanceOf(Error);
    expect(handledError.message).toBe("Generic error simulation");
  });

  it("should handle network errors", async () => {
    const path = "/network-error-endpoint";
    const error = createNetworkError();

    mock.onPost(path).networkError(); // Simulando erro de rede

    await expect(post(instance, path, requestData)).rejects.toThrow(
      error.error,
    );
  });

  it("deve retornar um erro com mensagem padrão se message não estiver definida", () => {
    const mockError = {} as AxiosError;

    const result = handleServiceError(mockError);
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe("Erro desconhecido");
  });

  it("should handle timeout errors", async () => {
    const path = "/timeout-error-endpoint";
    const requestData = { id: 1, name: "Test" };

    mock.onPost(path).timeout(); // Simulando timeout

    await expect(post(instance, path, requestData)).rejects.toThrow("timeout");
  });
});
