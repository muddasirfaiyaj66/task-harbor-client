
import { useForm } from 'react-hook-form';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { BiTask } from 'react-icons/bi';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useTaskData from '../../../Hooks/useTaskData';
import { Link } from 'react-router-dom';

const Tasks = () => {
    const { user } = useAuth();
    const [data, refetch] = useTaskData();
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onDragEnd = async (result) => {
        if (!result.destination) return; // Dragged outside the list

        // Reorder the tasks in the state based on the drag result
        const reorderedData = Array.from(data);
        const [removed] = reorderedData.splice(result.source.index, 1);
        reorderedData.splice(result.destination.index, 0, removed);

        // Update the tasks with the new order
        // You need to implement your logic to update the tasks in the database
        // (axios.put, refetch, etc.)
        // Example: axios.put(`/tasks/${removed._id}`, { status: 'ongoing' });

        refetch(); // Refetch data after updating the order
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
const handleDelete =(id)=>{
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
            .then(res=>{
                if(res){
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
                        <p className="mb-2">{toList.deadline}</p>
                        <p>{toList.priority}</p>
                        <p><button onClick={()=> handleDelete(toList._id)} className='btn my-2 bg-red-400 text-white hover:bg-black'>Delete</button></p>
                        <p><Link to={`/dashboard/edit/${toList._id}`}><button  className='btn my-2 bg-green-400 text-white hover:bg-black'>Edit</button></Link></p>
                    </div>
                )}
            </Draggable>
        ));
    return (
        <div>
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
                                        defaultValue="default"
                                        {...register('priority', { required: true })}
                                        className="select select-warning w-full max-w-xs"
                                    >
                                        <option value="default" disabled selected hidden>
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

            <div className="flex w-full">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="todo">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="mr-5 w-full "
                            >
                                <div className="card bg-base-300 rounded-box p-4">
                                    <h1 className="text-xl font-semibold mb-4">To-do</h1>
                                    {renderTaskList(data?.filter((item) => item.status === 'to-do'))}
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
                                className="mr-5 w-full"
                            >
                                <div className="card bg-base-300 rounded-box p-4">
                                    <h1 className="text-xl font-semibold mb-4">Ongoing</h1>
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
                                    <h1 className="text-xl font-semibold mb-4">Complete</h1>
                                    {renderTaskList(data?.filter((item) => item.status === 'complete'))}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};

export default Tasks;
