import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./customhooks/useAuth";
import useRefresh from "./useRefreshToken";

interface AuthComp{
    children? :React.ReactNode
}
const RequireAuth:React.FC<AuthComp> = () => {

  console.log('A1. entering Require Auth')
    const context = useAuth()
    const refresh = useRefresh(); 
    if (!context) {
      throw new Error('A1E1. AuthContext used outside AuthProvider');
    }
    const { auth } =context;
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const location = useLocation();

    const handleRefresh = async () => {
        console.log('A2.  Entertring handlRefresh')
        console.log('A3.  Going to run refresh')

        const token = await refresh();  
        if (token === null) {
          console.log('A4E3.  Token is NULL WTFFF')
          return false;  
        }
        return true; 
      };

      useEffect(() => {
        console.log('A5.  Entered useEffect -requireAuth ')
        const checkAuthStatus = async () => {
          if (!auth?.accessToken) {
            console.log('A6.  Entered useEffect - Going to execute HandleRrefresh ')
            const isTokenValid = await handleRefresh();
            setIsAuthenticated(isTokenValid);
            console.log('A7.  is AUthenticated or not')
            console.log(`A8.  auth access : ${isAuthenticated}`)
          }
        };
    
        checkAuthStatus();
      }, [auth, refresh]);

      if (isAuthenticated) {
        console.log("A9.  Loading...");
        return <div>Loading...</div>; // Optionally, show a loading spinner or message
      }

      if (!isAuthenticated) {
        console.log('1111111111111111111')
        return <Navigate to="/login" state={{ from: location }} replace />;
      }else if (auth?.accessToken) {
        console.log("accessToken present — rendering <Outlet />");
        return <Outlet />;
      } else {
        console.log("No auth object — redirecting to /unauthorized");
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
      }
      
       


    // return (
    //     // auth?.roles?.find(role => allowedRoles?.includes(role))
    //     auth?.accessToken 
    //     ? 
    //     <Outlet />
    //         : auth
    //             ? <Navigate to="/unauthorized" state={{ from: location }} replace />
    //             : <Navigate to="/login" state={{ from: location }} replace />
    // );
  
}

export default RequireAuth;