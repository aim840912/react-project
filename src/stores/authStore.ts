import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { MenuType } from '../features/settings/types';

interface AuthState {
    token: string | null;
    username: string | null;
    btnAuth: string[];
    menuList: MenuType[];
    setAuth: (authData: { token: string; username: string; btnAuth: string[] }) => void;
    setMenu: (menuList: MenuType[]) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            username: null,
            btnAuth: [],
            menuList: [],

            setAuth: (authData) => {
                set({
                    token: authData.token,
                    username: authData.username,
                    btnAuth: authData.btnAuth,
                });
            },

            setMenu: (menuList) => {
                set({ menuList: menuList });
            },

            logout: () => {
                set({
                    token: null,
                    username: null,
                    btnAuth: [],
                    menuList: [],
                });
            },
        }),

        {
            name: 'auth-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);