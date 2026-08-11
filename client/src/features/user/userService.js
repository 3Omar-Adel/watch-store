import api from "../../services/api/axios";

export const getUsers = async (token) => {
    const response = await api.get("/users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};