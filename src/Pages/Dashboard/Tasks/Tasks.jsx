
import { useForm } from 'react-hook-form';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { BiTask } from 'react-icons/bi';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useTaskData from '../../../Hooks/useTaskData';
import { Link } from 'react-router-dom';
import Loader from '../../../Components/Loader';

const Tasks = () => {
    const { user } = useAuth();
    const [data, refetch,isLoading] = useTaskData();
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onDragEnd = async (result) => {
        if (!result.destination) return;


        const reorderedData = Array.from(data);
        const [removed] = reorderedData.splice(result.source.index, 1);
        reorderedData.splice(result.destination.index, 0, removed);


        console.log(removed._id);

        axiosPublic.put(`/tasks/${removed._id}`, { status: result.destination.droppableId })
        .then(res=>{
            console.log('task moved', res.data);
            refetch()
        })
        refetch()
    };
    const onSubmit = async (data) => {
        const taskItems = {
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            priority: data.priority,
            email: user?.email,
            status: 'to-do',
        };

        axiosPublic
            .post('/tasks', taskItems)
            .then((res) => {
                if (res?.data) {
                    reset();
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Task Added',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                // Handle error and show a user-friendly message
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            });
    };
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/tasks/${id}`)
                    .then(res => {
                        if (res) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }

                    })

            }
        });
    }

    const renderTaskList = (tasks) =>
        tasks?.map((toList, index) => (
            <Draggable key={toList._id} draggableId={toList._id} index={index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white text-black rounded-md my-3 p-4"
                    >
                        <h1 className="text-xl font-semibold mb-2">{toList.title}</h1>
                        <p className="mb-2">{toList.description}</p>
                        <p className="mb-2 font-medium text-red-400">Deadline: {toList.deadline}</p>
                        <p className='font-bold'>
                            Priority:
                            <span className={
                                toList.priority === 'low' ? 'text-red-500' :
                                    toList.priority === 'moderate' ? 'text-yellow-500' :
                                        toList.priority === 'high' ? 'text-green-600' :
                                            ''
                            }>
                                {toList.priority}
                            </span>
                        </p>
                        <p><button onClick={() => handleDelete(toList._id)} className='btn my-2 bg-red-400 text-white hover:bg-black'>Delete</button></p>
                        <p><Link to={`/dashboard/edit/${toList._id}`}><button className='btn my-2 bg-green-400 text-white hover:bg-black'>Edit</button></Link></p>
                    </div>
                )}
            </Draggable>
        ));
    return (
        <div data-aos="zoom-out-right">
            <div className="flex justify-center my-5">
                <button
                    className="btn bg-[#ff0065] text-white hover:bg-black"
                    onClick={() => document.getElementById('my_modal_5').showModal()}
                >
                    <span className="text-2xl">
                        <BiTask />
                    </span>
                    Add New task
                </button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control w-full my-5">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input
                                        {...register('title', { required: true })}
                                        type="text"
                                        placeholder="Title"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                <div className="form-control w-full my-5 ">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea
                                        {...register('description', { required: true })}
                                        className="textarea textarea-primary"
                                        placeholder="Description"
                                    ></textarea>
                                </div>
                                <div className="form-control w-full my-5">
                                    <label className="label">
                                        <span className="label-text">Deadline</span>
                                    </label>
                                    <input
                                        {...register('deadline', { required: true })}
                                        type="date"
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text"> Priority</span>
                                    </label>
                                    <select

                                        {...register('priority', { required: true })}
                                        className="select select-warning w-full max-w-xs"
                                    >
                                        <option disabled selected hidden>
                                            priority
                                        </option>
                                        <option value="low">low</option>
                                        <option value="moderate">moderate</option>
                                        <option value="high">high</option>
                                    </select>
                                </div>
                                {errors.exampleRequired && <span>This field is required</span>}

                                <button className="btn  my-5 bg-[#ff0065] text-white hover:bg-black">
                                    <span className="flex justify-center items-center ">
                                        Add Task <BiTask className="ml-2"></BiTask>
                                    </span>
                                </button>
                            </form>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>

           {isLoading? <Loader></Loader>
           :
           
           <div className="flex w-full">
           <DragDropContext onDragEnd={onDragEnd}>
               <Droppable droppableId="to-do">
                   {(provided) => (
                       <div
                           ref={provided.innerRef}
                           {...provided.droppableProps}
                           className="mr-3 w-full "
                       >
                           <div className="card bg-base-300 rounded-box p-4">
                               <h1 className="text-xl  mb-4 text-red-500 font-bold">To-do</h1>
                               {renderTaskList(data?.filter((item) => item.status === "to-do"))}
                               {provided.placeholder}
                           </div>
                       </div>
                   )}
               </Droppable>

               <Droppable droppableId="ongoing">
                   {(provided) => (
                       <div
                           ref={provided.innerRef}
                           {...provided.droppableProps}
                           className="mr-3 w-full"
                       >
                           <div className="card bg-base-300 rounded-box p-4">
                               <h1 className="text-xl  mb-4 text-blue-500 font-bold">Ongoing</h1>
                               {renderTaskList(data?.filter((item) => item.status === 'ongoing'))}
                               {provided.placeholder}
                           </div>
                       </div>
                   )}
               </Droppable>

               <Droppable droppableId="complete">
                   {(provided) => (
                       <div
                           ref={provided.innerRef}
                           {...provided.droppableProps}
                           className="mr-1 w-full"
                       >
                           <div className="card bg-base-300 rounded-box p-4">
                               <h1 className="text-xl  mb-4 text-green-500 font-bold">Complete</h1>
                               {renderTaskList(data?.filter((item) => item.status === 'complete'))}
                               {provided.placeholder}
                           </div>
                       </div>
                   )}
               </Droppable>
           </DragDropContext>
       </div>
           }
        </div>
    );
};

export default Tasks;
