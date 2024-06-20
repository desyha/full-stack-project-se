import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://obeng-api.vercel.app/api",
    withCredentials: true
})

export default apiRequest

