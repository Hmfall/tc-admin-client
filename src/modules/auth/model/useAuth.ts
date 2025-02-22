import { authStore } from '@/modules/auth/store/useAuthStore';

export const useAuth = () => {
    const { isAuthorized } = storeToRefs(authStore);

    return {
        isAuthorized,
        logout: authStore.logout,
        authorize: authStore.authorize,
    };
};
