import { Suspense, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import LoadingPage from "./page/loading";
import { baseRoutes } from "./router";
import { generateRoutes, MenuType } from "./router/generatesRoutes";
import { useMenuLoader } from "./hooks/useMenuLoader";
import { ConfigProvider, theme } from 'antd';


function App() {
  useMenuLoader();
  const { token, menuList } = useAppSelector((state) => state.authSlice);
  const currentTheme = useAppSelector((state) => state.theme.theme);

  const router = useMemo(() => {
    const newRoutes = [...baseRoutes];
    const layoutRoute = newRoutes.find((r) => r.path === '/');

    if (token && menuList.length > 0 && layoutRoute) {
      const dynamicRoutes = generateRoutes(menuList as MenuType[]);
      layoutRoute.children = [...(layoutRoute.children || []), ...dynamicRoutes];
    }

    return createBrowserRouter(newRoutes);
  }, [token, menuList]);

  return (
    <ConfigProvider
      theme={{
        algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div className="App">
        <Suspense fallback={<LoadingPage />}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </ConfigProvider>
  );
}

export default App;