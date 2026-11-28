import type { RoleSystem, SystemPermission, UserSystem } from '@/types/systemTypes';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';




interface UserStore {
    userRole: RoleSystem | '';
    setUserRole: (userRole: RoleSystem | '') => void;
    permissions: SystemPermission[];
    setPermissions: (permissions: SystemPermission[]) => void;
    hasPermission: (permission: SystemPermission) => boolean;
    userInfo: UserSystem | null;
    setUserInfo: (user: UserSystem) => void;
    token: string | null;
    setToken: (token: string) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    clearAllSession: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            userRole: '',
            setUserRole: (userRole) => set({ userRole }),
            permissions: [],
            setPermissions: (permissions) => set({ permissions }),
            hasPermission: (permission: SystemPermission) => {
                const { userRole, permissions, userInfo } = get();
                // Admin tiene acceso total
                if (userRole === 'administrator') return true;
                const activePermissions = permissions.length > 0 ? permissions : (userInfo?.permissions ?? []);
                return activePermissions.includes(permission);
            },
            userInfo: null,
            setUserInfo: (userInfo) => set({
                userInfo,
                userRole: userInfo.role,
                permissions: userInfo.permissions || []
            }),
            token: null,
            setToken: (token) => set({ token }),
            isAuthenticated: false,
            setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
            clearAllSession: () => {
                set({
                    userInfo: null,
                    token: null,
                    isAuthenticated: false,
                    userRole: '',
                    permissions: [],
                });
            }
        }),
        {
            name: 'auth-store', // Nombre de la clave
        }
    )
);
