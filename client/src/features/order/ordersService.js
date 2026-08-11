import axios from "axios";

const API_URL = "http://localhost:5000/api/orders/";

const getToken = () => {
    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );
    return user?.token
}

const getMyOrders = async () => {
    const response = await axios.get(`${API_URL}my`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
    });
    return response.data
}

const createOrder = async (order) => {
    const response = await axios.post(
        API_URL,
        order,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
}

const getOrderById = async (id) => {
    const response = await axios.get(
        `${API_URL}${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
}

const getAllOrders = async () => {
    const response = await axios.get(
        API_URL,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
}

const updateOrderStatus = async (id, orderStatus) => {
    const response = await axios.put(
        `${API_URL}${id}/status`,
        orderStatus,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
}

const ordersService = {
    getMyOrders,
    createOrder,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
}
export default ordersService;