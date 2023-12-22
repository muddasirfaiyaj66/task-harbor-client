import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import logo from '../assets/logo-no-background.svg'
import { TiThMenu } from "react-icons/ti";
const Dashboard = () => {
    const {user}=useAuth();
    return (
<div className="drawer lg:drawer-open">

<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="  p-3 ">
  <label  htmlFor="my-drawer-2" className="btn  drawer-button lg:hidden "><TiThMenu></TiThMenu></label>
  </div>
  <div className="drawer-content flex flex-col ">
   <Outlet></Outlet>
  
  
  </div> 
  <div className="drawer-side">
  <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-black text-base-content">
      {/* Sidebar content here */}
      <img className="my-3 " src={logo} width='200' height='150' alt="" />
        <div className=' p-2 flex justify-center items-center gap-5'>
            {/* Avatar */}
            <img
              className='rounded-full'
              referrerPolicy='no-referrer'
              src={user?.photoURL}
              alt='profile'
              height='50'
              width='50'
            />

            <h1 className="font-bold text-white">{user?.displayName}</h1>
          </div>

          <li className="my-3">
       
       <NavLink
         to="/dashboard/tasks"
         className={({ isActive, isPending }) =>
           isPending ? "pending" : isActive ? "py-4 px-2 bg-green-500 text-white btn font-semibold outline-none transition duration-300" : "py-4 px-2 text-gray-500 font-semibold hover:text-green-500 btn  outline-none"
         }
       >
         Tasks
       </NavLink>
     
       </li> 
     
       <li>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "py-4 px-2 text-green-500 btn font-semibold outline-none hover:text-green-500 transition duration-300" : "py-4 px-2 text-gray-500 font-semibold hover:text-green-500 btn outline-none "
        }
      >
        Home
      </NavLink>
      </li>

    </ul>
  
  </div>
</div>


      
    );
};

export default Dashboard;