import axios from "axios";

const myAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API
});
export default myAxios;