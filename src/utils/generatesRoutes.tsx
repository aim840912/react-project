import { RouteObject } from "react-router";
import { componentMap } from "../router/routerMap";
import RequireAuth from "../utils/RequireAuth";

interface MenuType {
    icon: string;
    key: string;
    label: string;
    children?: MenuType[];
}

export function generateRoutes(menu: MenuType[]): RouteObject[] {
    return menu.map(({ key, children }) => {
        const hasChildren = !!children?.length;
        const Component = componentMap[key];

        if (!Component && !hasChildren) {
            console.warn(`⚠️ componentMap 找不到對應元件：${key}`);
        }

        const route: RouteObject = {
            path: key,
            element: hasChildren
                ? undefined
                : Component
                    ? (
                        <RequireAuth needLogin={true} redirectTo="/login">
                            <Component />
                        </RequireAuth>
                    )
                    : <div>找不到元件：{key}</div>,
        };

        if (hasChildren && children) {
            route.children = generateRoutes(children);
        }

        return route;
    });
}
