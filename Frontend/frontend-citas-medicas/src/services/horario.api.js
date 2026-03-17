import axios from "axios";

const API = "http://localhost:9090/api/horarios";

export const guardarHorario = async (data)=>{
    const token = localStorage.getItem("token");

    const res = await axios.post(API,data,{
        headers:{ Authorization:`Bearer ${token}` }
    });

    return res.data;
};