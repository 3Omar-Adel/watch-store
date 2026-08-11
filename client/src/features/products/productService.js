import api from "../../services/api/axios";

export const getProducts = async () => {
    const response = await api.get("/products");
    return response.data;
};
export const getFeaturedProducts = async () => {
    const response = await api.get("/products/featured");
    return response.data;
};
export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

export const deleteProduct = async (id, token) => {
    const response = await api.delete(
        `/products/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
export const createProduct = async (productData, token) => {
    const response = await api.post(
        "/products",
        productData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const updateProduct = async (
    id,
    productData,
    token
) => {
    const response = await api.put(
        `/products/${id}`,
        productData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};