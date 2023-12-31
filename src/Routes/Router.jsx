
import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layouts/Dashboard";
import Tasks from "../Pages/Dashboard/Tasks/Tasks";
import Edit from "../Pages/Edit/Edit";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                index:true,
                element: <Home></Home>

            }
        ]
    },
    {
        path:'/login',
        element: <Login></Login>
    },
    {
        path:'/signUp',
        element: <SignUp></SignUp>
    },
    {
        path:'/dashboard',
        element: <PrivateRoute>
            <Dashboard></Dashboard>
        </PrivateRoute>,
        children: [
            {
                path:'tasks',
                element:<PrivateRoute><Tasks></Tasks></PrivateRoute>
            },
            {
                path:'edit/:id',
                element:<PrivateRoute>
                    <Edit></Edit>
                </PrivateRoute>
            }
        ]
    }
]);

export default router;