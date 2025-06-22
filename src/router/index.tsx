import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import RequireAuth from "../guard/RequireAuth";
import ErrorPage from "../page/error";
import LoadingPage from "../page/loading";
import DynamicRoutes from "./DynamicRoutes";

const MainLayout = React.lazy(() => import("../layout/mainLayout"));
const Login = React.lazy(() => import("../features/user/pages/login/index"));

const baseRoutes: RouteObject[] = [
    {
        path: "/login",
        element: (
            <React.Suspense fallback={<LoadingPage />}>
                <Login />
            </React.Suspense>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: "/",
        element: (
            <RequireAuth>
                <React.Suspense fallback={<LoadingPage />}>
                    <MainLayout />
                </React.Suspense>
            </RequireAuth>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "*",
                element: <DynamicRoutes />
            }
        ],
    }
];

export const router = createBrowserRouter(baseRoutes);