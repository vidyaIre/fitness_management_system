import axiosInstance from "../config/axiosConfig";

export const getAllWorkouts = async () => {
    try {
        let token = localStorage.getItem("@token");
        //console.log("stored token is:", token);
        if (token) {
            token = token.slice(1, -1);
            // console.log("token is:", token); 
        } else {
            console.log("No token found in local storage.");
            throw new Error("No token found in local storage.");
        }
        const results = await axiosInstance.get("/workout/getAllWorkouts", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("result from getWorkoutAll:", results);
        return results?.data;
    }
    catch (error) {
        if (error.response) {
            console.error("Error fetching workout data from API:", {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
        } else if (error.request) {
            console.error("No request received from API:", error.request);
        }
        else {
            console.error("Error setting up request to API:", error.message);
        }
        throw error;
    }
}
export const createWorkout = async (payload) => {
    console.log("New workout is:", payload);
    const result = await axiosInstance.post("/workout/createWorkout", payload)
        .catch((error) => {
            console.log("Error creating workout:", error);
            throw error;
        });
    console.log("result is:", result);
    return result?.data;

}