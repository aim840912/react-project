import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { setAuth, logout } from "./authSlice";

export const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
    matcher: isAnyOf(setAuth, logout),

    effect: (action, listenerApi) => {
        if (setAuth.match(action)) {
            const { token, username, btnAuth } = action.payload;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("btnAuth", JSON.stringify(btnAuth));
        }

        if (logout.match(action)) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("btnAuth");
        }
    }
});