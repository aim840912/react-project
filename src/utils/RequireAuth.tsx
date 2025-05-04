import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface RequireAuthProps {
    needLogin: boolean;
    redirectTo: string;
    children: React.ReactNode;
}

function RequireAuth({ needLogin, redirectTo, children }: RequireAuthProps) {
    const token = useAppSelector((state) => state.authSlice.token);
    const isLogin = !!token;

    if (needLogin !== isLogin) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
}

export default RequireAuth;
