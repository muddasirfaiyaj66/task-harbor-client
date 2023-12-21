import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader";


const PrivateRoute = ({children}) => {
    const {user,loading}= useAuth();
    const location = useLocation();
    if(loading){
        return <div><Loader></Loader></div>;
    }
    if(user){
        return children;
    }
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default PrivateRoute;