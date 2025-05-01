import React from "react";
import RequireAuth from "../utils/RequireAuth";
import { Navigate, RouteObject } from "react-router";

const Home = React.lazy(() => import("../page/home"));
const Login = React.lazy(() => import("../page/login"));
const NotFound = React.lazy(() => import("../page/404"));


export const routes: RouteObject[] = [
    {
        path: "/",
        element: <RequireAuth needLogin={true} redirectTo="/login"><Home /></RequireAuth>,
        children: [{
            // ✅ 登入後進入 "/"，自動轉去 dashboard
            index: true,
            element: <Navigate to="/dashboard" replace />,
        },], // 動態路由會塞進來
    },
    {
        path: "/login",
        element: <RequireAuth needLogin={false} redirectTo="/"><Login /></RequireAuth>,
    },
    {
        path: "*",
        element: <NotFound />,
    },
];
