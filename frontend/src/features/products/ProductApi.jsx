import { axiosi } from "../../config/axios";

export const addProduct = async (data) => {
    try {
        const res = await axiosi.post('/products', data)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const fetchProducts = async (category = "") => {
    try {
        const url = category ? `/products?category=${category}` : `/products`; // Filter if category exists
        const res = await axiosi.get(url);
        return { data: res.data };
    } catch (error) {
        console.error("Error fetching products:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

export const fetchProductByKeyword = async (keyword) => {
    try {
        const res = await axiosi.get(`/products/search?query=${keyword}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const fetchProductById = async (id) => {
    try {
        const res = await axiosi.get(`/products/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const updateProductById = async (update) => {
    try {
        const res = await axiosi.patch(`/products/${update._id}`, update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const deleteProductById = async (id) => {
    try {
        const res = await axiosi.delete(`/products/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
