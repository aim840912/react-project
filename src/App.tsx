import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { Spin } from "antd";
import { useAppRouter } from "./hooks/useAppRouter";

function App() {

  const { router, isLoading } = useAppRouter();
  if (isLoading) return <Spin />;

  return (
    <div className="App">
      <Suspense fallback={<Spin />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
