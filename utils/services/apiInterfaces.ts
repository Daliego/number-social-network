import { Axios, AxiosRequestConfig } from "axios";
import { post } from "../../src/services/methods/post";
import { del } from "../../src/services/methods/del";
import { get } from "../../src/services/methods/get";
import { put } from "../../src/services/methods/put";

export interface IApiMethods<T> {
  create: (data: T) => Promise<any>;
  deleteOne: (id: string) => Promise<any>;
  getList: (config?: AxiosRequestConfig) => Promise<any>;
  getOne: (id: string, config?: AxiosRequestConfig) => Promise<any>;
  update: (data: Partial<T>, id?: string) => Promise<any>;
}

export const apiMethods = <T>(axios: Axios, path: string): IApiMethods<T> => ({
  create: async (data: any): Promise<any> => {
    return await post(axios, path, data);
  },
  deleteOne: async (id: string) => {
    return await del(axios, `${path}/${id}`);
  },
  getList: async (config?: AxiosRequestConfig): Promise<any> => {
    return await get(axios, `${path}`, config);
  },
  getOne: async (id: string, config?: AxiosRequestConfig): Promise<any> => {
    return await get(axios, `${path}/${id}`, config);
  },
  update: async (data: Partial<T>, id?: string) => {
    if (!id) return await put(axios, path, data);
    return await put(axios, `${path}/${id}`, data);
  },
});
