import { Link } from 'react-router-dom';
import bannerImg from '../../assets/4850077_42.jpg'
import Chart from '../Dashboard/Tasks/Chart/Chart';


const Home = () => {

    return (
        <div data-aos="fade-up">
            <div className='md:flex justify-center items-center gap-4 max-w-screen-xl mx-auto p-5 md:p-10  '>
                <div className='flex-1'>
                    <div className='text-center mt-28'>
                        <h1 data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" className='lg:text-7xl space-y-5 text-5xl font-bold text-[#515f66] '>
                            Best Way to <br />
                            Manage Your <br />
                            Daily Task.
                        </h1>

                       
                      
                        
   <Link to='/dashboard'>
   
   <button>
         <div data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" className=" my-8 relative mx-auto h-16 w-64 flex justify-center items-center">
      <div className=" h-16 w-64 bg-green-400 items-center rounded-xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
      </div>
      <a className="text-center text-white font-semibold z-10 pointer-events-none" >  Let’s Explore</a>
      <span className="absolute flex h-6 w-6 top-0 right-0 transform translate-x-2.5 -translate-y-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="absolute inline-flex rounded-full h-6 w-6 bg-green-500"></span>
      </span>

    </div>
         </button>
   </Link>

                    </div>
                </div>
                <div data-aos="zoom-out-down" className='w-full h-full object-cover flex-1'>
                    <img src={bannerImg} alt="" />
                </div>
            </div>


            <div className='my-10'>
                <h1  data-aos="zoom-out-up" className='text-4xl text-center p-5 uppercase font-bold my-10 '>Users of Our TaskHarbor Website </h1>
          <div data-aos="fade-up"
     data-aos-duration="3000"> 
          <Chart ></Chart>
          </div>
            </div>
        </div>
    );
};

export default Home;