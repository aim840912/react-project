import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { useAppRouter, useMenuLoader } from "./hooks/useAppRouter";
import LoadingPage from "./page/loading";


function App() {
  useMenuLoader();

  const router = useAppRouter();

  return (
    <div className="App">
      <Suspense fallback={<LoadingPage />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
