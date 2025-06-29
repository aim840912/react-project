import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import RequireAuth from "@/guard/RequireAuth";
import ErrorPage from "@/page/error";

const MainLayout = React.lazy(() => import("@/layout/mainLayout"));
const Login = React.lazy(() => import("@/features/user/pages/login/index"));
const NotFound = React.lazy(() => import("@/page/404"));

export const baseRoutes: RouteObject[] = [
    {
        path: "/login",
        element: (
            <React.Suspense fallback={<div>Loading...</div>}>
                <Login />
            </React.Suspense>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: "/",
        element: (
            <RequireAuth>
                <React.Suspense fallback={<div>Loading page...</div>}>
                    <MainLayout />
                </React.Suspense>
            </RequireAuth>
        ),
        errorElement: <ErrorPage />,
        children: [{
            index: true,
            element: <Navigate to="dashboard" replace />,
        }],
    },
    {
        path: "*",
        element: <NotFound />,
    },
];