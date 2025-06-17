import { useMemo } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { getMenu } from "../api/users";
import { generateRoutes } from "../router/generatesRoutes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setMenu } from "../features/user/authSlice";
import { baseRoutes } from "../router";


export function useAppRouter() {
    const { token, menuList } = useAppSelector((state) => state.authSlice);
    const dispatch = useAppDispatch();

    useMemo(() => {
        if (token && menuList.length === 0) {
            getMenu().then((res) => {
                if (res.data && res.data.length) {
                    dispatch(setMenu(res.data));
                }
            }).catch(console.error);
        }
    }, [token, menuList.length, dispatch]);

    const routes: RouteObject[] = useMemo(() => {
        // static routes
        const base = baseRoutes
        const layoutRoute = base.find(r => r.path === '/');

        // token 驗證不過就直接回 base
        if (!token) return base;

        // 有 menuList 就做動態路由
        if (menuList.length && layoutRoute && layoutRoute.children) {
            const dynamic = generateRoutes(menuList);

            layoutRoute.children.push(...dynamic);
        }

        return base;
    }, [token, menuList, baseRoutes]);


    const router = createBrowserRouter(routes)

    return router;
}
