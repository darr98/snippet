import React, { createContext,useState ,ReactNode, Dispatch, SetStateAction} from "react";
import { Provider } from "react-redux";

interface AuthUserType {
  userId: string;
  accessToken: string;
}

interface AuthContextType {
  auth: AuthUserType | null;
  setAuth: Dispatch<SetStateAction<AuthUserType | null>>;
}

interface AuthProviderProps {
    children: ReactNode;
  }

export const AuthContext = createContext<AuthContextType|undefined>(undefined)

const AuthProvider:React.FC<AuthProviderProps>=({children})=>{

    const [auth ,setAuth] = useState<AuthUserType | null>(null)

    return(
        <AuthContext.Provider value={{auth ,setAuth}}>
        {children}
        </AuthContext.Provider>

    )

}

export default AuthProvider