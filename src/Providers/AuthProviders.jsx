import { createContext } from "react";
import {getAuth} from 'firebase/auth';
import { app } from "../Config/Firebase/config.firebase";
export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProviders = ({children}) => {
    const authInfo = {

    }
    return (
     <AuthContext.Provider value={authInfo}>
        {children}
        </AuthContext.Provider>

    );
};

export default AuthProviders;