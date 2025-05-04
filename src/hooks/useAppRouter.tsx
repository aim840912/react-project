import { useCallback, useEffect, useState } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { getMenu } from "../api/users";
import { generateRoutes } from "../utils/generatesRoutes";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setMenu } from "../store/login/authSlice";
import { routes } from "../router";

const createLoadingRouter = () => createBrowserRouter([
    {
        path: "/",
        element: <div>Loading...</div>,
    },
]);

export function useAppRouter() {
    const { token } = useAppSelector((state) => state.authSlice);
    const menu = useAppSelector((state) => state.authSlice.menuList);
    const dispatch = useAppDispatch();
    const [router, setRouter] = useState(createLoadingRouter);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null);

    const mergeRoutes = useCallback((baseRoutes: RouteObject[], dynamicRoutes: RouteObject[]) => {
        const routes = [...baseRoutes];
        const homeRoute = routes.find(r => r.path === "/");

        if (homeRoute) {
            if (!Array.isArray(homeRoute.children)) homeRoute.children = [];
            const existingIndex = homeRoute.children.find(r => r.index);

            homeRoute.children = [
                ...(existingIndex ? [existingIndex] : []),
                ...dynamicRoutes,
            ];
        }

        return routes;
    }, []);

    const loadRoutes = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const baseRoutes = [...routes];

            if (!token) {
                setRouter(createBrowserRouter(baseRoutes));
                setIsLoading(false);
                return;
            }

            if (menu && menu.length) {
                const dynamicRoutes = generateRoutes(menu);
                const finalRoutes = mergeRoutes(baseRoutes, dynamicRoutes);
                setRouter(createBrowserRouter(finalRoutes));
                setIsLoading(false);
                return;
            }

            const { data } = await getMenu();
            if (data && data.length) {
                dispatch(setMenu(data));
                const dynamicRoutes = generateRoutes(data);
                const finalRoutes = mergeRoutes(baseRoutes, dynamicRoutes);
                setRouter(createBrowserRouter(finalRoutes));
            } else {
                //雖然有token但沒有菜單數據的情況
                console.warn("User authenticated but no menu data received");
                setRouter(createBrowserRouter(baseRoutes));
            }
        } catch (error) {
            console.error("Error loading routes:", error);
            setError(error instanceof Error ? error : new Error('Failed to load routes'));
            setRouter(createBrowserRouter(routes)); // 使用基礎路由作為後備方案
        } finally {
            setIsLoading(false);
        }
    }, [token, dispatch, mergeRoutes, menu]);

    useEffect(() => {
        loadRoutes();
    }, [loadRoutes]);

    return { router, isLoading, error, reloadRoutes: loadRoutes };
}
