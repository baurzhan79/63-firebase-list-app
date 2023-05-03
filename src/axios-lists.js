import axios from "axios";

const instance = axios.create({
    baseURL: "https://todo-movienames-643d9-default-rtdb.firebaseio.com"
});

export default instance;