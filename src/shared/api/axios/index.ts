import axios from 'axios';
import { appConfig } from '@/app/config';
import { useAuthorizationInterceptor } from '@/shared/api/axios/useAuthorizationInterceptor';
import { useUnauthorizedInterceptor } from '@/shared/api/axios/useUnauthorizedInterceptor';

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? appConfig.API_BASE_URL : appConfig.API_DEV_BASE_URL,
});

useUnauthorizedInterceptor(axiosInstance);
useAuthorizationInterceptor(axiosInstance);

export default axiosInstance;
