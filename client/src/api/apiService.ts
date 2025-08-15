const BASE_URL = import.meta.env.VITE_BET_BASE_URL || 'http://35.158.119.106:3001/api';

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface User {
  id: number;
  username: string;
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
          if (!xhr.responseText) {
            resolve('' as unknown as T);
            return;
          }
          
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

  // User API methods
  createUser: (username: string): Promise<User> => {
    return ApiService.makeRequest<User>('/users', HTTPMethod.POST, { username });
  },

  getUsers: (): Promise<User[]> => {
    return ApiService.makeRequest<User[]>('/users', HTTPMethod.GET);
  },

  getUserById: (id: number): Promise<User> => {
    return ApiService.makeRequest<User>(`/users/${id}`, HTTPMethod.GET);
  },

  // Favorites API methods
  addFavorite: (movieData: any): Promise<any> => {
    return ApiService.makeRequest<any>('/movies/add-favorite', HTTPMethod.POST, movieData);
  },

  deleteFavorite: (id: number): Promise<any> => {
    return ApiService.makeRequest<any>(`/movies/delete-favorite/${id}`, HTTPMethod.DELETE);
  },

  getFavorites: (username: string): Promise<any[]> => {
    return ApiService.makeRequest<any[]>(`/movies/favorites/${username}`, HTTPMethod.GET);
  },
};