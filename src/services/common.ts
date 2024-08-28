import Axios from 'src/services/Axios';

type ApiResponse<T> = Promise<T>;

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const httpGet = <T>(path: string): ApiResponse<T> => {
  return Axios.get<T>(`${BASE_URL}/${path}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const httpPost = <T>(path: string, values?: any): ApiResponse<T> => {
  return Axios.post<T>(`${BASE_URL}/${path}`, values)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const httpPut = <T>(path: string, values: any): ApiResponse<T> => {
  return Axios.put<T>(`${BASE_URL}/${path}`, values)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const httpPatch = <T>(path: string, values: any): ApiResponse<T> => {
  return Axios.patch<T>(`${BASE_URL}/${path}`, values)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const httpDelete = <T>(path: string): ApiResponse<T> => {
  return Axios.delete<T>(`${BASE_URL}/${path}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
