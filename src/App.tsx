import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Spin, Result, Button } from "antd";
import { useAppRouter } from "./hooks/useAppRouter";

const LoadingScreen = () => (
  <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Spin size="large" tip="应用加载中..." />
  </div>
);

const RouterError = ({ error, onRetry }: { error: Error | null; onRetry: () => void }) => (
  <Result
    status="error"
    title="路由加載失敗"
    subTitle={error?.message || "加載應用路由時出現錯誤"}
    extra={
      <Button type="primary" onClick={onRetry}>
        重試
      </Button>
    }
  />
);

function App() {

  const router = useAppRouter();

  return (
    <div className="App">
      <Suspense fallback={<LoadingScreen />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
