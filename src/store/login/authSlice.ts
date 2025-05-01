import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: sessionStorage.getItem("token") || null,
        menuList: []
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;// 把token存到redux中
            sessionStorage.setItem("token", action.payload);// 把token存到sessionStorage中
        },
        clearToken: state => {
            state.token = null;
            sessionStorage.removeItem("token");
        },
        setMenu: (state, action) => {
            state.menuList = action.payload
        }
    },
});

export const { setToken, clearToken, setMenu } = authSlice.actions;
export default authSlice.reducer;