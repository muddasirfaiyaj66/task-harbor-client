import React from 'react';
import { useForm } from 'react-hook-form';
import useTaskData from '../../Hooks/useTaskData';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { BiTask } from 'react-icons/bi';
const Edit = () => {
    const [data, refetch] = useTaskData();
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
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
                    Update Task <BiTask className="ml-2"></BiTask>
                </span>
            </button>
        </form>
    </div>
    );
};

export default Edit;