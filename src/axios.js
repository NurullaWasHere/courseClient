import axios from "axios";

const instance = axios.create({
    baseURL: "https://courseserver-production.up.railway.app",

})

instance.interceptors.request.use(config => {
    config.headers.authorization = window.localStorage.getItem('token');
    return config;
})

export default instance;