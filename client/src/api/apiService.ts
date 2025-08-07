// apiService.ts
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BET_BASE_URL;

export enum HTTPMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export const ApiService = {
  makeRequest: async <T>(
    endpoint: string,
    method: HTTPMethod,
    data?: Record<string, string | number | boolean> | FormData,
    isFormData?: boolean,
    headers?: Record<string, string>
  ): Promise<T> => {
    const isGet = method === HTTPMethod.GET;
    const url = isGet
      ? `${BASE_URL}${endpoint}${data ? `?${new URLSearchParams(data as Record<string, string>).toString()}` : ''}`
      : `${BASE_URL}${endpoint}`;

    const config = {
      method,
      url,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
      },
      ...(isGet ? {} : { data }),
    };

    const response = await axios(config);
    return response.data as T;
  },
};