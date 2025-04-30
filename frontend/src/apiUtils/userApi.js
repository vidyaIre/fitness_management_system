import axiosInstance from "../config/axiosConfig";

export const loginUser = async (payload) => {
    const { email, password } = payload;
    console.log("payload is:", payload);
    if (email && password) {
        const result = await axiosInstance.post("/user/loginUser", payload)
            .catch((error) => {
                console.error("Error logging in user:", error);
                throw error;
            });
        console.log("result from loginUser:", result);
        return result?.data;
    }

};
export const getUserAll = async () => {
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
        const result = await axiosInstance.get("/user/getUserAll", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("result from getUserAll:", result);
        return result?.data;
    }
    catch (error) {
       if (error.response) {
        console.error("Error fetching user data from API:", {
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
};
export const registerUser = async (payload) => {
    console.log("New  member is:", payload);
    const result = await axiosInstance.post("/user/registerUser", payload)
        .catch((error) => {
            console.error("Error registering user:", error);
            throw error;
        });
    console.log("result is:", result);
    return result?.data;

};
export const getUserById = async (id) => {
    console.log("first id is:", id);
    try {
        let token = localStorage.getItem("@token");
        if(token){
            token = token.slice(1, -1);
            console.log("token from getuerbyid:", token); 
        } else{
            console.log("No token found in local storage.");
            throw new Error("No token found in local storage.");
        }
        const result = await axiosInstance.get('/user/getUserById', {id}, {
          
            headers: {
                Authorization: `Bearer ${token}`
            }});
          console.log("result is:",result);
        console.log("result from getUserById:", result);
        return result?.data;
    } catch (error) {
        console.error("Error in getUserById:", error);
        throw error;
    }
};
export const updateUser = async (id, payload) => {  
    try {
        let token = localStorage.getItem("@token");
        if(token){
            token = token.slice(1, -1);
            console.log("token is:", token); 
        } else{
            console.log("No token found in local storage.");
            throw new Error("No token found in local storage.");
        }
        const result = await axiosInstance.put(`/user/updateUser?id=${id}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }})
            .catch((error) => {
                console.error("Error updating user:", error);
                throw error;
            });
        console.log("result from updateUser:", result);
        return result?.data;
    } catch (error) {
        console.error("Error in updateUser:", error);
        throw error;
    }
};
export const deleteUser = async (id) => {
    try {
        let token = localStorage.getItem("@token");
        if(token){
            token = token.slice(1, -1);
            console.log("token is:", token); 
        } else{
            console.log("No token found in local storage.");
            throw new Error("No token found in local storage.");
        }
        const result = await axiosInstance.delete(`/user/deleteUser?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }})
            .catch((error) => {
                console.error("Error deleting user:", error);
                throw error;
            });
        console.log("result from deleteUser:", result);
        return result?.data;
    } catch (error) {
        console.error("Error in deleteUser:", error);
        throw error;
    }
}
