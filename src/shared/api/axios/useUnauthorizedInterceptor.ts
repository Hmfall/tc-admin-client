import type { AxiosInstance } from 'axios';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

export const useUnauthorizedInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    async (response) => {
      const authStore = useAuthStore();

      if (authStore.isAccessTokenExpired) {
        await authStore.logout();
      }

      return response;
    },
    async (error) => {
      const authStore = useAuthStore();

      if (error?.response?.status === 401) {
        await authStore.logout();
      }

      return Promise.reject(error);
    },
  );
};
