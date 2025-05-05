import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    token: sessionStorage.getItem("token") || null,
    username: sessionStorage.getItem("username") || null,
    btnAuth: JSON.parse(sessionStorage.getItem("btnAuth") || "[]"), // <- 這裡要轉回陣列
    menuList: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearToken: state => {
            state.token = null;
            sessionStorage.removeItem("token");
        },
        setMenu: (state, action) => {
            state.menuList = action.payload
        },
        setAuth: (state, action: PayloadAction<{ token: string; username: string; btnAuth: string[] }>) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.btnAuth = action.payload.btnAuth;
            sessionStorage.setItem("token", action.payload.token);
            sessionStorage.setItem("username", action.payload.username);
            sessionStorage.setItem("btnAuth", JSON.stringify(action.payload.btnAuth));
        },
        logout: (state) => {
            state.token = null;
            state.username = null;
            state.btnAuth = [];
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("btnAuth");
        },
    },
});

export const { clearToken, setMenu, setAuth, logout } = authSlice.actions;
export default authSlice.reducer;