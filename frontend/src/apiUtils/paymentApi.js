import axiosInstance from "../config/axiosConfig";

export const createPayment = async (paymentData) => {

    console.log("Creating payment with data:", paymentData);
    const response = await axiosInstance.post('/api/payment/createPayment', paymentData)
        .catch((error) => {
            console.error("Error creating payment:", error);
            throw error;
        });

    console.log("Payment created successfully:", response.data);
    return response?.data;
};

export const recordPayment = async (paymentData) => {
    console.log("Recording payment with data:", paymentData);
    const response = await axiosInstance.post('/api/payment/recordPayment', paymentData)
        .catch((error) => {
            console.error("Error recording payment:", error);
            throw error;
        });

    console.log("Payment recorded successfully:", response.data);
    return response?.data;
};