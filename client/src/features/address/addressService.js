import axios from "axios";

const API_URL = "https://watch-store-5pti.vercel.app/api/address/";

const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token;
};

const getAddresses = async () => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return response.data;
};

const createAddress = async (addressData) => {
    const response = await axios.post(
        API_URL,
        addressData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    return response.data;
};

const updateAddress = async (id, addressData) => {
    const response = await axios.put(
        `${API_URL}${id}`,
        addressData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    return response.data;
};

const setDefaultAddress = async (id) => {
    const response = await axios.put(
        `${API_URL}default/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    return response.data;
};

const deleteAddress = async (id) => {
    const response = await axios.delete(
        `${API_URL}${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    return response.data;
};

const addressService = {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
};

export default addressService;