import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useTaskData = () => {
    const {user}=useAuth();
    const axiosPublic = useAxiosPublic()

    const {data , refetch,isLoading}=useQuery({
        queryKey:['taskData',user],
        queryFn: async ()=>{
            const res= await axiosPublic.get(`/tasks?email=${user?.email}`) 
            return res.data;
        }
     


    })
    return [data, refetch,isLoading]
};

export default useTaskData;