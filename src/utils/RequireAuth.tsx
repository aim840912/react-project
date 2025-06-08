// src/utils/RequireAuth.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

interface RequireAuthProps {
    children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
    const token = useAppSelector((s) => s.authSlice.token);
    const location = useLocation();

    // 如果還沒登入，就導到 /login，並把原本要去的路徑存在 state.from
    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    // 已登入就正常渲染子元件
    return <>{children}</>;
}
