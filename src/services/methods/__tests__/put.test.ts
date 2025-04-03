import axios, { AxiosError, AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { put } from "../put";
import { handleServiceError } from "../../@shared/handleServiceError";
import { createNetworkError } from "@/utils/functions/@shared/createNetworkError";

describe("put function", () => {
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

    mock.onPut(path).reply(200, mockData);

    await expect(
      put<typeof mockData>(instance, path, requestData),
    ).resolves.toEqual(mockData);
  });

  it("should throw an error when the request fails", async () => {
    const path = "/test-endpoint";

    const mockData = { detail: "teste throw error on the request fail" };
    const mockResponseData = {
      response: {
        status: 500,
        data: mockData,
      },
    };

    mock.onPut(path).reply(500, mockData);

    await expect(put(instance, path, requestData)).rejects.toMatchObject(
      mockResponseData,
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

    mock.onPut(path).networkError(); // Simulando erro de rede

    await expect(put(instance, path, requestData)).rejects.toThrow(error.error);
  });

  it("deve retornar um erro com mensagem padrão se message não estiver definida", () => {
    const mockError = {} as AxiosError;

    const result = handleServiceError(mockError);
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe("Erro desconhecido");
  });

  it("should handle timeout errors", async () => {
    const path = "/timeout-error-endpoint";

    mock.onPut(path).timeout();

    await expect(put(instance, path, requestData)).rejects.toThrowError(
      "timeout",
    );
  });
});
