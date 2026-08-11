import axios from "axios";

const API_URL = "http://localhost:5000/api/wishlist/";

const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token;
};

const getWishlist = async () => {

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return response.data;
};

const toggleWishlist = async (productId) => {

    const response = await axios.post(
        API_URL,
        { productId },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    return response.data;
};

const wishlistService = {
    getWishlist,
    toggleWishlist,
};

export default wishlistService;