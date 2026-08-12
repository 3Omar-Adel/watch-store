import axios from "axios"

const api = axios.create({
    baseURL: "https://watch-store-5pti.vercel.app/api",
});

export default api;