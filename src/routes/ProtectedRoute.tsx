import { useAuth } from "hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: any }) => {
    const { isAuthenticated } = useAuth();
    const { pathname } = useLocation();
    if (!isAuthenticated) {
        return <Navigate to="/login"  replace state={{ from: pathname }} />;
    }

    return children;
};

export default ProtectedRoute;