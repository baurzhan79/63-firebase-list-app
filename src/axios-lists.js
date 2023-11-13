import axios from "axios";

const instance = axios.create({
    baseURL: "https://todo-movienames-b478e-default-rtdb.firebaseio.com"
});

export default instance;