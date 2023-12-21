import bannerImg from '../../assets/4850077_42.jpg'

const Home = () => {
    return (
        <div>
            <div className='md:flex justify-center items-center gap-4 max-w-screen-xl mx-auto p-5 md:p-10 '>
                <div className='flex-1'>
                    <div className='text-center'>
                        <h1 className='md:text-7xl space-y-5 text-2xl font-bold text-[#515f66] '>
                            Best Way to <br />
                            Manage Your <br />
                            Daily Task.
                        </h1>

                        <button className='btn my-8 bg-green-500 p-3 font-medium rounded-xl text-white '>
                        Let’s Explore
                        </button>

                    </div>
                </div>
                <div className='w-full h-full object-cover flex-1'>
                    <img src={bannerImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Home;