import { useContext, useDebugValue } from "react";
import { AuthContext } from "./AuthProvider";

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('AuthContext used outside AuthProvider');
    }
    const { auth } =context;
    useDebugValue(auth, auth => auth?.userId ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;