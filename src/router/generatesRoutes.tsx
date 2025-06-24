import { Suspense } from "react";
import { RouteObject, Outlet } from "react-router";
import { componentMap } from "./routerMap";
import RequireAuth from "@/guard/RequireAuth";
import LoadingPage from "@/page/loading";
import ErrorPage from "@/page/error";

export interface MenuType {
    label: string;
    icon: string;
    key: string;
    children?: MenuType[]
}

export function generateRoutes(menu: MenuType[]): RouteObject[] {
    return menu.reduce<RouteObject[]>((routes, { key, children }) => {
        if (children?.length) {
            routes.push({
                path: key,
                element: (
                    <RequireAuth >
                        <Suspense fallback={<LoadingPage />}>
                            <Outlet />
                        </Suspense>
                    </RequireAuth>
                ),
                errorElement: <ErrorPage />,
                children: generateRoutes(children),
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
