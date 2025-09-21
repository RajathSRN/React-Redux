import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:5000"
});

export const fetchTasks = () => {
    return api({ method: "GET", url: "/tasks" });
};

export const createTask = (payload) => {
    return api({ method: "POST", url: "/tasks", data: payload });
};

export const deleteTask = (id) => {
    return api({ method: "DELETE", url: `/tasks/${id}` });
};

