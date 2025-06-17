import React, { Suspense } from "react";
import { RouteObject, Outlet } from "react-router";
import { componentMap } from "./routerMap";
import RequireAuth from "../guard/RequireAuth";
// import { MenuType } from "../types";
import LoadingPage from "../page/loading";
import ErrorPage from "../page/error";

export interface MenuType {
    label: string;
    icon: string;
    key: string;
    children?: MenuType[]
}

export function generateRoutes(menu: MenuType[]): RouteObject[] {
    return menu.reduce<RouteObject[]>((routes, { key, children }) => {
        // 如果這層有子項，先產生一個父層路由
        if (children?.length) {
            routes.push({
                path: key,
                element: (
                    // 全域只包一次認證與錯誤邊界
                    <RequireAuth >
                        <Suspense fallback={<LoadingPage />}>
                            <Outlet />
                        </Suspense>
                    </RequireAuth>
                ),
                errorElement: <ErrorPage />,
                children: generateRoutes(children),
                // 如果希望第一個 child 同時也是 index，也可打開下面這行
                // index: true,
            });
        } else {
            // Leaf route: 直接對應到 componentMap
            const Component = componentMap[key];
            routes.push({
                path: key,
                element: Component ? (
                    <RequireAuth >
                        <Suspense fallback={<LoadingPage />}>
                            <Component />
                        </Suspense>
                    </RequireAuth>
                ) : (
                    <div>⚠️ 找不到元件：{key}</div>
                ),
                errorElement: <ErrorPage />,
            });
        }
        return routes;
    }, []);
}
