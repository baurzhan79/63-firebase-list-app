import axios from "axios";

const instance = axios.create({
    baseURL: "https://todo-movienames-b86ad-default-rtdb.firebaseio.com"
});

export default instance;