import axiosInstance from "../config/axiosConfig";

export const getAllSessions = async () => {
    try {
        let token = localStorage.getItem("@token");
        console.log("stored token is :", token);

        if (token) {
            token = token.slice(1, -1);
        } else {
            console.log("No token found in local Storage");
            throw new Error("No token found in local storage.");
        }

        const results = await axiosInstance.get("/session/getAllSessions", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("result from getallSession:", results);
        return results?.data;
    } catch (error) {
        if (error.response) {
            console.log("Error fetching sesion data from API:", {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
        } else if (error.request) {
            console.log("No request received from API: ", error.request);
        } else {
            console.log("Error setting up to API:", error.message);
        }
        throw error;
    }
}
export const  createSession = async (payload) => {
    console.log("new sesstion is:", payload);
    const result = await axiosInstance.post("/session/createSession", payload)
    .catch((error) => {
        console.log("Error creating new Session:", error);
        throw error;
    });
    console.log("result is:", result);
    return result?.data;
}
