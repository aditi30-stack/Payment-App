import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [getUser, setGetUser] = useState('');

    useEffect(() => {
       
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("getUser")
        if (token) {
            setIsLoggedIn(true);
        }
        if(storedUser) {
            setGetUser(storedUser);
        }
        setIsLoading(false)
    }, []); 


    const login = (token, getUser) =>{
       if (token) {
        setIsLoggedIn(true)
        setGetUser(getUser)
        localStorage.setItem("token", token)
        localStorage.setItem("getUser", getUser)
       } else {
        setIsLoggedIn(false)
       }
    }

    const logout = () =>{
        setIsLoggedIn(false);
        setGetUser("")
        localStorage.removeItem("token")
        localStorage.removeItem("getUser")
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading, setIsLoading, getUser }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () =>{
    return useContext(AuthContext)
}