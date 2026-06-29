import axiosInstance from "../axiosInstance";

const getCategoryList = async () => {
    const response = await axiosInstance.get("/category");
    return response.data.data;
};

export default {
    getCategoryList,
};
