import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    username: string | null;
    btnAuth: string[];
    menuList: [];
}

const initialState: AuthState = {
    token: sessionStorage.getItem("token") || null,
    username: sessionStorage.getItem("username") || null,
    btnAuth: getStoredJson("btnAuth", []),
    menuList: [],
};

function getStoredJson(key: string, defaultValue: any) {
    try {
        const storedValue = sessionStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        }
    } catch (error) {
        console.error(`解析 sessionStorage 中的 key "${key}" 時出錯:`, error);
    }
    return defaultValue;
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ token: string; username: string; btnAuth: string[] }>) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.btnAuth = action.payload.btnAuth;
        },
        logout: (state) => {
            state.token = null;
            state.username = null;
            state.btnAuth = [];
            state.menuList = [];
        },
        clearToken: state => {
            state.token = null;
        },
        setMenu: (state, action) => {
            state.menuList = action.payload
        },
    },
});

export const { clearToken, setMenu, setAuth, logout } = authSlice.actions;
export default authSlice.reducer;