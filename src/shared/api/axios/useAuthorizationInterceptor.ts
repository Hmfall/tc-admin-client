import type { AxiosInstance } from 'axios';
import { LSKeys } from '@/shared/constants/LSKeys';

export const useAuthorizationInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use((config) => {
    const accessToken = getAccessToken();
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
    return config;
  });
};

export const getAccessToken = () => {
  const LSValue = localStorage.getItem(LSKeys.Auth);
  return LSValue ? JSON.parse(LSValue).accessToken : null;
};
