import axiosInstance from "../config/axiosConfig";

export const getWorkoutAll = async () => {
    try {
        let token = localStorage.getItem("@token");
        console.log("stored token is:", token);
        if(token){
            token = token.slice(1, -1);
            console.log("token is:", token); 
        } else{
            console.log("No token found in local storage.");
            throw new Error("No token found in local storage.");
        }
        const result = await axiosInstance.get("/workout/getWorkoutAll", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("result from getWorkoutAll:", result);
        return result?.data;
    }
    catch (error) {
       if (error.response) {
        console.error("Error fetching workout data from API:", {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers
        });
    }else if (error.request) {
        console.error("No response received from API:", error.request);
    }
    else {
        console.error("Error setting up request to API:", error.message);
    }
        throw error;
    }
}