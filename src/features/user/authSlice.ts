import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    username: string | null;
    btnAuth: string[];
    menuList: []; // 建議給予更精確的型別
}

const initialState: AuthState = {
    token: sessionStorage.getItem("token") || null,
    username: sessionStorage.getItem("username") || null,
    btnAuth: JSON.parse(sessionStorage.getItem("btnAuth") || "[]"), // <- 這裡要轉回陣列
    menuList: [],
};

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