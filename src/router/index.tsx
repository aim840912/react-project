import React from "react";
import RequireAuth from "../utils/RequireAuth";
import { Navigate, RouteObject } from "react-router";
import ErrorPage from "../page/error";

const MainLayout = React.lazy(() => import("../layout/mainLayout"));
const Login = React.lazy(() => import("../features/user/pages/login/index"));
const NotFound = React.lazy(() => import("../page/404"));




export const baseRoutes: RouteObject[] = [
    {
        path: "/login",
        element: (
            <React.Suspense fallback={<div>Loading...</div>}>
                <Login />
            </React.Suspense>),
        errorElement: <ErrorPage />,
    },
    {
        path: "/",
        element: (
            <RequireAuth >
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Navigate to="dashboard" replace />
                    <MainLayout />
                </React.Suspense>
            </RequireAuth>),
        errorElement: <ErrorPage />,
        children: [{
            element: <Navigate to="dashboard" replace />,
        },],
    },

    {
        path: "*",
        element: <NotFound />,
    },
];
