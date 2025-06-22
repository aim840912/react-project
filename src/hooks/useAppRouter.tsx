import { useEffect, useMemo } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { generateRoutes, MenuType } from "../router/generatesRoutes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setMenu } from "../features/user/authSlice";
import { baseRoutes } from "../router";
import { useGetMenuQuery } from "../features/user/api/userApi";

export function useMenuLoader() {
    const token = useAppSelector((state) => state.authSlice.token);
    const dispatch = useAppDispatch();

    const { data: menuData } = useGetMenuQuery(undefined, {
        skip: !token,
    });

    useEffect(() => {
        if (menuData) {
            dispatch(setMenu(menuData));
        }
    }, [menuData, dispatch]);
}

export function useAppRouter() {
    const { token, menuList } = useAppSelector((state) => state.authSlice);

    const routes: RouteObject[] = useMemo(() => {

        const newRoutes = [...baseRoutes];
        const layoutRouteIndex = newRoutes.findIndex((r) => r.path === '/');

        if (token && menuList.length > 0 && layoutRouteIndex > -1) {
            const newLayoutRoute = { ...newRoutes[layoutRouteIndex] };

            newLayoutRoute.children = [...(newLayoutRoute.children || [])];

            const dynamicRoutes = generateRoutes(menuList as MenuType[]);
            newLayoutRoute.children.push(...dynamicRoutes);

            newRoutes[layoutRouteIndex] = newLayoutRoute;
        }

        return newRoutes;
    }, [token, menuList]);

    // 建立並回傳 router 實例
    const router = createBrowserRouter(routes);

    return router;
}