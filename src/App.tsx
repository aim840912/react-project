import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { useMenuLoader } from "./hooks/useMenuLoader";
import LoadingPage from "./page/loading";
import { router } from "./router";


function App() {
  useMenuLoader();
  return (
    <div className="App">
      <Suspense fallback={<LoadingPage />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
