import axios from "axios";


export default axios.create(
    {
        baseURL : 'http://127.0.0.1:8000',
        withCredentials :true,
    }
)

export const privateAxios = axios.create({

    baseURL : 'http://127.0.0.1:8000',
    withCredentials :true,
    headers :{"Content-Type" : 'application/json'}
})