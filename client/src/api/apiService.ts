const BASE_URL = import.meta.env.VITE_BET_BASE_URL || 'http://13.53.80.101:3001/api';

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const ApiService = {
  makeRequest: <T>(
    endpoint: string,
    method: HTTPMethod,
    data?: Record<string, string | number | boolean> | FormData,
    isFormData?: boolean,
    headers?: Record<string, string>
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      const isGet = method === HTTPMethod.GET;
      const url = isGet
        ? `${BASE_URL}${endpoint}${data ? `?${new URLSearchParams(data as Record<string, string>).toString()}` : ''}`
        : `${BASE_URL}${endpoint}`;

      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);

      if (!isFormData) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const json = JSON.parse(xhr.responseText);
            resolve(json);
          } catch (err) {
            console.log(err)
            resolve(xhr.responseText as unknown as T);
          }
        } else {
          reject(new Error(`HTTP error: ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error('Network error'));

      if (isGet) {
        xhr.send();
      } else {
        if (data instanceof FormData) {
          xhr.send(data);
        } else {
          xhr.send(JSON.stringify(data));
        }
      }
    });
  },
};