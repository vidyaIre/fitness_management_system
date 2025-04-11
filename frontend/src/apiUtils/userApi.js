import axiosInstance from "../config/axiosConfig";

export const loginUser = async (payload) => {
    const { email, password } = payload;
    console.log("payload is:", payload);
    if(email && password) {
        const result = await axiosInstance.post("loginUser", payload)
        .catch((error) => {
            console.error("Error logging in user:", error);
            throw error;
        });
        console.log("result is:", result);
        return result?.data;
    }

};
export const getUser = async () => {
    const result = await axiosInstance.get("getUser")
    .catch((error) => {
        console.log("Error fetching user datafrom api:", error);
    })
    console.log("result is:", result);
    return result?.data;
};