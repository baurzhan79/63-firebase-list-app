import axios from "axios";

const instance = axios.create({
    baseURL: "https://todo-movienames-5f698-default-rtdb.firebaseio.com"
});

export default instance;