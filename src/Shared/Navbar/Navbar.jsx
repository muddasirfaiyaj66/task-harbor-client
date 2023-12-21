import { NavLink } from "react-router-dom";


const Navbar = () => {
    const navlinks = <>
    
    <NavLink
  to="/messages"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "bg-[#ff0065] text-white" : ""
  }
>
  Home
</NavLink>;
    </>
    return (
        <div>
            
        </div>
    );
};

export default Navbar;