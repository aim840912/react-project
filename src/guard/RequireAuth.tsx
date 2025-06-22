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

    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    return <>{children}</>;
}
