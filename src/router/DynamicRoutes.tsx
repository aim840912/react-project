// src/router/DynamicRoutes.tsx (新檔案)

import { useRoutes, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { generateRoutes, MenuType } from "./generatesRoutes";
import NotFound from "../page/404";

export default function DynamicRoutes() {
    const { menuList } = useAppSelector((state) => state.authSlice);

    const dynamicRoutes = menuList.length > 0 ? generateRoutes(menuList as MenuType[]) : [];

    const routesToRender = [
        {
            path: '/',
            element: <Navigate to="/dashboard" replace />
        },
        ...dynamicRoutes,
        {
            path: "*",
            element: <NotFound />
        }
    ];

    const element = useRoutes(routesToRender);

    return element;
}