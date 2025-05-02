import { useEffect, useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import { getMenu } from "../../api/users";
import { generateRoutes } from "../utils/generatesRoutes";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setMenu } from "../store/login/authSlice";
import { routes } from "../router";
import type { MenuItem } from "../types/api";



// 建立空 router 作為預設值
const fallbackRouter = createBrowserRouter([
    {
        path: "/",
        element: <div>Loading...</div>,
    },
]);


export function useAppRouter() {
    const { token } = useAppSelector((state) => state.authSlice);
    const dispatch = useAppDispatch();
    const [router, setRouter] = useState(() => fallbackRouter);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadRoutes = async () => {
            try {
                const baseRoutes = [...routes];

                if (!token) {
                    setRouter(createBrowserRouter(baseRoutes));
                    return;
                }

                const { data } = await getMenu();
                if (data.length) {
                    dispatch(setMenu(data));
                    const dynamicRoutes = generateRoutes(data);

                    const homeRoute = baseRoutes.find(r => r.path === "/");
                    if (homeRoute) {
                        if (!Array.isArray(homeRoute.children)) homeRoute.children = [];
                        const existingIndex = homeRoute.children.find(r => r.index);
                        homeRoute.children = [
                            ...(existingIndex ? [existingIndex] : []),
                            ...dynamicRoutes,
                        ];
                    }
                }

                setRouter(createBrowserRouter(baseRoutes));
            } catch (error) {
                console.error("Error loading routes:", error);
                setRouter(createBrowserRouter(routes));
            } finally {
                setIsLoading(false); // ✅ 載入完畢
            }
        };

        loadRoutes();
    }, [token, dispatch]);

    return { router, isLoading };
}
