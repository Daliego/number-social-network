import axios, { AxiosError, AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import { patch } from "../patch";
import { handleServiceError } from "../../@shared/handleServiceError";

describe("patch function", () => {
  let mock: MockAdapter;
  let instance: AxiosInstance;

  beforeEach(() => {
    instance = axios.create();
    mock = new MockAdapter(instance);
  });

  it("should return data when the request is successful", async () => {
    const path = "/test-endpoint";
    const mockData = { message: "success" };
    const requestData = { id: 1, name: "Test" };

    mock.onPatch(path).reply(200, mockData);

    await expect(
      patch<typeof mockData>(instance, path, requestData),
    ).resolves.toEqual(mockData);
  });

  it("should throw an error when the server is down", async () => {
    const path = "/test-endpoint";
    const requestData = { id: 1, name: "Test" };

    const mockData = { detail: "teste throw error on the request fail" };
    const mockResponseData = {
      response: {
        status: 500,
        data: mockData,
      },
    };

    mock.onPatch(path).reply(500, mockData);

    await expect(patch(instance, path, requestData)).rejects.toMatchObject(
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
    const requestData = { id: 1, name: "Test" };

    mock.onPatch(path).networkError();

    await expect(patch(instance, path, requestData)).rejects.toThrow(
      "Network Error",
    );
  });

  it("should handle timeout errors", async () => {
    const path = "/timeout-error-endpoint";
    const requestData = { id: 1, name: "Test" };

    mock.onPatch(path).timeout();

    await expect(patch(instance, path, requestData)).rejects.toThrowError(
      "timeout",
    );
  });
});
