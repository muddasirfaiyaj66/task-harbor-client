import { createContext, useEffect, useState } from "react";
import {GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import { app } from "../Config/Firebase/config.firebase";
export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const AuthProviders = ({children}) => {
    const [user , setUser]= useState(null);
    const [ loading, setLoading]= useState(true);

    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const signIn = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const logOut = ()=>{
        setLoading(true);
        return signOut(auth);
    }
    const signInWithGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }
    const signInWithGitHub = ()=>{
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    }

    const handleUpdateProfile = (name,photo)=>{
        return updateProfile(auth.currentUser, {
            displayName:name, photoURL:photo
        })
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            setLoading(false);
        })
        return ()=>{
            return unsubscribe()
        }
    },[])
    const authInfo = {
        createUser,
        signIn,
        logOut,
        signInWithGoogle,
        signInWithGitHub,
        handleUpdateProfile



    }
    return (
     <AuthContext.Provider value={authInfo}>
        {children}
        </AuthContext.Provider>

    );
};

export default AuthProviders;