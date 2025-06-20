import { useEffect, useMemo } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { getMenu } from "../api/users";
import { generateRoutes } from "../router/generatesRoutes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setMenu } from "../features/user/authSlice";
import { baseRoutes } from "../router";


export function useAppRouter() {
    const { token, menuList } = useAppSelector((state) => state.authSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (token && menuList.length === 0) {
            getMenu().then((menuData) => {
                if (menuData && menuData.length) {
                    dispatch(setMenu(menuData));
                }
            }).catch(console.error);
        }
    }, [token, menuList.length, dispatch]);

    const routes: RouteObject[] = useMemo(() => {
        const base = baseRoutes
        const layoutRoute = base.find(r => r.path === '/');

        if (!token) return base;

        if (menuList.length && layoutRoute && layoutRoute.children) {
            const dynamic = generateRoutes(menuList);

            layoutRoute.children.push(...dynamic);
        }

        return base;
    }, [token, menuList, baseRoutes]);


    const router = createBrowserRouter(routes)

    return router;
}
