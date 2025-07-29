import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";

const AdminRoute = ({ children }: { children: React.ReactElement }) => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    
    // Add debugging to check values
    console.log("AdminRoute - Auth state:", isAuthenticated, "User:", user);
    
    if (!isAuthenticated || !user || user.role?.toLowerCase() !== "admin") {
        // Add debugging for redirect
        console.log("Not admin, redirecting to login");
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AdminRoute;
