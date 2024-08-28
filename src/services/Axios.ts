import axios from 'axios';
import LocalStorageService from 'src/services/LocalStorageService';
import { httpPost } from 'src/services/common';
import URL from 'src/services/urls';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const getTokenData = () => {
  const tokenData = LocalStorageService.getAccessToken();
  let tokenObj;
  if (tokenData) {
    tokenObj = JSON.parse(tokenData);
  }
  return tokenObj;
};

// export const refreshToken = async (): Promise<void> => {
//   try {
//     const { refreshToken, deviceId, id } = await getTokenData();
//     const result: any = await httpPost(URL.REFRESH_TOKEN, {
//       refreshToken,
//     });
//     const newToken = {
//       accessToken: result.data,
//       deviceId,
//       id,
//       refreshToken,
//     };
//     LocalStorageService.setToken(JSON.stringify(newToken));
//   } catch (error) {
//     return error;
//   }
// };
const reCallFailedRequest = axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.request.use(
  (config: any) => {
    const tokenData = LocalStorageService.getAccessToken();
    if (tokenData) {
      const token = JSON.parse(tokenData).accessToken;
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },

  async (error: any) => {
    await Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async function (error: any) {
    const originalRequest = error.config;
    if (!error.response) {
      // Store.dispatch({

      return await Promise.reject(error);
    }
    if (error.response.status === 403) {
      // Invalid token

      return Promise.reject(error);
    }
    if (error.response.status === 402) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // await refreshToken();
        const { accessToken } = await getTokenData();
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return reCallFailedRequest(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    if (error.response.status === 500) {
      return await Promise.reject(error);
    }
    return await Promise.reject(error.response);
  }
);

export default axios;
