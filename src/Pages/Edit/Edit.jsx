import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { BiTask } from 'react-icons/bi';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

import { useParams } from 'react-router-dom';
import {  useQuery } from '@tanstack/react-query';
const Edit = () => {
    
    const {user}=useAuth();
    const {id}=useParams();
    const navigate = useNavigate();
    console.log(id);
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const {data:singleData, refetch}=useQuery({
        queryKey:['getSingleData' , id],
        queryFn:async()=>{
            const res = await axiosPublic(`/tasks/${id}`)
            return res.data;
        }
        
    })
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
            .patch(`/tasks/${id}`, taskItems)
            .then((res) => {
                if (res?.data) {
                    reset();
                    refetch()
                    
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Task Updated',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate('/dashboard/tasks');
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
    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full my-5">
                <label className="label">
                    <span className="label-text">Title</span>
                </label>
                <input
                    {...register('title', { required: true })}
                    type="text"
                    defaultValue={singleData?.title}
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
                    defaultValue={singleData?.description}
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
                    defaultValue={singleData?.deadline}
                    className="input input-bordered w-full"
                />
            </div>
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text"> Priority</span>
                </label>
                <select
                    defaultValue={singleData?.priority}
                    {...register('priority', { required: true })}
                    className="select select-warning w-full max-w-xs"
                >
                   
                    <option value={singleData?.priority}>{singleData?.priority}</option>
                    <option value="low">low</option>
                    <option value="moderate">moderate</option>
                    <option value="high">high</option>
                </select>
            </div>
            {errors.exampleRequired && <span>This field is required</span>}

            <button className="btn  my-5 bg-[#ff0065] text-white hover:bg-black">
                <span className="flex justify-center items-center ">
                    Update Task <BiTask className="ml-2"></BiTask>
                </span>
            </button>
        </form>
    </div>
    );
};

export default Edit;