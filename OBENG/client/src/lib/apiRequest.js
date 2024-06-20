import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://obeng-api.vercel.app",
    withCredentials: true
})

export default apiRequest