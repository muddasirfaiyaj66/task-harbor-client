import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link} from 'react-router-dom'
import useAuth from '../../Hooks/useAuth'
import logo from '../../assets/logo-no-background.svg'


const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logOut } = useAuth()
  console.log(user);

  return (
    <div className='relative'>

      <div className='flex flex-row items-center gap-3 mr-5'>
    
        {/* Dropdown btn */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className='p-5 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div className=' md:block'>
            {/* Avatar */}
            <img
              className='rounded-full'
              referrerPolicy='no-referrer'
              src={user?.photoURL}
              alt='profile'
              height='30'
              width='30'
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-3 top-15 text-sm'>
          <div className='flex flex-col cursor-pointer'>
           {user?
           <h1  className='px-2 py-2 bg-green-500 text-white transition font-semibold'>
           {user?.displayName}
         </h1>
         : '' 
          }
            <Link
              to='/'
              className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
            >
              Home
            </Link>

           {
            user? 
         <button onClick={()=> logOut()} className='px-4 py-3 text-left  hover:bg-red-500 hover:text-white transition font-semibold'>
          LogOut 
         </button>
          :
          <Link
          to='/login'
          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
        >
          Login
        </Link>
           }
           
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuDropdown