import React, { createContext,useState ,ReactNode, Dispatch, SetStateAction} from "react";
import { Provider } from "react-redux";

interface AuthUserType {
  userId: string;
  accessToken: string;
}
interface DetAuthType {
  showDetCard: boolean;
}

interface AuthContextType {
  auth: AuthUserType | null;
  setAuth: Dispatch<SetStateAction<AuthUserType | null>>;
  IsdetCard : boolean;
  setDetCard : Dispatch<SetStateAction<boolean>>;
}

interface AuthProviderProps {
    children: ReactNode;
  }

export const AuthContext = createContext<AuthContextType|undefined>(undefined)


const AuthProvider:React.FC<AuthProviderProps>=({children})=>{

  const [auth ,setAuth] = useState<AuthUserType | null>(null)
  const [IsdetCard ,setDetCard] = useState<boolean>(false);
  
    return(
        <AuthContext.Provider value={{auth ,setAuth,IsdetCard,setDetCard}}>
        {children}
        </AuthContext.Provider>

    )

}

export default AuthProvider