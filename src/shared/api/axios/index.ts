import axios from 'axios';
import { appConfig } from '@/app/config';
import { useAuthorizationInterceptor } from '@/shared/api/axios/useAuthorizationInterceptor';

const axiosInstance = axios.create({
  baseURL: appConfig.API_BASE_URL,
  headers: {
    accept: 'application/json',
  },
});

useAuthorizationInterceptor(axiosInstance);

export default axiosInstance;
