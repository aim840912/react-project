import { RouteObject } from "react-router";
import { componentMap } from "../router/routerMap";
import RequireAuth from "../utils/RequireAuth";
import { MenuType } from "../types";

function getRouteElement(key: string): React.ReactNode {
    const Component = componentMap[key];

    if (!Component) {
        console.warn(`⚠️ componentMap 找不到對應元件：${key}`);
        return <div>找不到元件：{key}</div>;
    }

    return (
        <RequireAuth needLogin redirectTo="/login">
            <Component />
        </RequireAuth>
    );
}

export function generateRoutes(menu: MenuType[]): RouteObject[] {
    return menu.map(({ key, children }) => {
        const route: RouteObject = {
            path: key,
            element: children?.length ? undefined : getRouteElement(key),
        };

        if (children?.length) {
            route.children = generateRoutes(children);
        }

        return route;
    });
}
