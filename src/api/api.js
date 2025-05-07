import axiosInstance from '../axios/axios';

// Get All Category
export const getAllCategories = () => {
    return axiosInstance.get('/category');
};

// Get Category
export const getCategory = (categoryId) => {
    return axiosInstance.get(`/category/${categoryId}`);
};

// Get All Products
export const getAllProducts = () => {
    return axiosInstance.get('/product');
};

// Get Product
export const getProduct = (productId) => {
    return axiosInstance.get(`/product/${productId}`);
};

// Get Product by Category
export const getProductByCategory = (categoryId) => {
    return axiosInstance.get(`/product/category/${categoryId}`);
};

// Search Products
export const searchProducts = async (query) => {
    try {
        // Trim query and handle empty input
        const trimmedQuery = query?.trim() || "";
        if (!trimmedQuery) {
            // console.log("[searchProducts] Empty query, returning empty array");
            return { data: [] };
        }
        const url = `/product/search?search=${trimmedQuery}`;
        const response = await axiosInstance.get(url);

        return response;
    } catch (error) {
        //   console.error("[searchProducts] Error:", {
        //     message: error.message,
        //     status: error.response?.status,
        //     data: error.response?.data,
        //   });
        throw error;
    }
};

// Send Email Enquiry
export const sendEmailEnquiry = (emailData) => {
    return axiosInstance.post('/mailer', {
        name: emailData.name,
        email: emailData.email,
        phone: emailData.phone,
        message: emailData.message
    });
};