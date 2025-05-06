import React from "react";
import RequireAuth from "../utils/RequireAuth";
import { Navigate, RouteObject } from "react-router";
import ErrorPage from "../page/error";

const Home = React.lazy(() => import("../page/home"));
const Login = React.lazy(() => import("../page/login"));
const NotFound = React.lazy(() => import("../page/404"));


export const baseRoutes: RouteObject[] = [
    {
        path: "/",
        element: (<RequireAuth needLogin={true} redirectTo="/login"><Home /></RequireAuth>),
        errorElement: <ErrorPage />,
        children: [{
            index: true,
            element: <Navigate to="/dashboard" replace />,
        },],
    },
    {
        path: "/login",
        element: <RequireAuth needLogin={false} redirectTo="/"><Login /></RequireAuth>,
        errorElement: <ErrorPage />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
];
