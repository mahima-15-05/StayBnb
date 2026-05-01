import api from './axiosInstance.js';

//GET
export const getUsers = async ()=>{
    const response = await api.get("/users");
    return response.data;
};

//POST 
export const createUser = async(userData)=>{
    const respone = await api.post("/users", userData);

    return response.data;
}