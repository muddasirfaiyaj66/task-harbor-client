import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo-no-background.svg'
import MenuDropdown from './MenuDropdown'

const Navbar = () => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-5 border-b-[1px]'>
        
          <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
            {/* Logo */}
            <Link to='/'>
              <img  data-aos="zoom-out-down"
                className=' md:block ml-3'
                src={logo}
                alt='logo'
                width='200'
                height='100'
              />
            </Link>

            <div className=' hidden md:flex'>
      <ul className=' flex justify-center items-center gap-3 cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out   text-xl'>
      <li >
       
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "py-4 px-2 text-green-500 font-semibold hover:text-green-500 transition duration-300" : "py-4 px-2 text-gray-500 font-semibold hover:text-green-500 "
          }
        >
          Home
        </NavLink>
      </li>
      <li >
       
        <NavLink
          to="https://github.com/muddasirfaiyaj66"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "py-4 px-2 text-green-500 font-semibold hover:text-green-500 transition duration-300" : "py-4 px-2 text-gray-500 font-semibold hover:text-green-500  "
          }
        >
          Contact
        </NavLink>
      </li>
      <li >
       
        <NavLink
          to="/dashboard"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "py-4 px-2 text-green-500 font-semibold hover:text-green-500 transition duration-300" : "py-4 px-2 text-gray-500 font-semibold hover:text-green-500  "
          }
        >
          Dashboard
        </NavLink>
      </li>
      </ul>
       </div>
            {/* Dropdown Menu */}
            <MenuDropdown />
          </div>
       
      </div>
    </div>
  )
}

export default Navbar