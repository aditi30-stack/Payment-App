import { useAuth } from "./AuthContext"
import { Navigate } from "react-router-dom";


export const PrivateRoute = ({children}) =>{

    const {isLoggedIn, isLoading} = useAuth();

    if (isLoading) {
        return <div>Loading....</div>
    }
    return isLoggedIn ? children: <Navigate to= "/"/>


    
}