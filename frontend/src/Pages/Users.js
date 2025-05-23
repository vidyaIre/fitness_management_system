import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUserAll } from '../apiUtils/userApi'



const Users = () => {
    const [usersValue, setUsers] = useState([]);
    async function fetchUsers() {
        try {
            const userData = await getUserAll();
            console.log("userData is:", userData);
            const token = localStorage.getItem("@token");
            console.log("stored token is:", token);
            setUsers(userData?.users);
            console.log("list of users is:", userData?.users);
            if (userData?.success) {
                toast.success("Users fetched successfully");
            } else {
                toast.error("Failed to fetch users");
            }
        } catch (error) {
            console.log("Error fetching users:", error);
            toast.error("Error fetching users");
        }
    }
    
    useEffect(() => {
        fetchUsers();
       
    }
        //eslint-disable-next-line
        , []);




    return (
        <>

            <div className="container">
                <div className="d-flex justify-content-center mb-3 mt-2">
                    <h1>User List</h1>
                </div>
                <div className="d-flex justify-content-center">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                {/* <th>Function</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usersValue && usersValue?.length > 0
                                    ? usersValue.map((users) => (
                                        < tr key={users?._id} >
                                            <td>{users?.firstName}</td>
                                            <td>{users?.lastName}</td>
                                            <td>{users?.email}</td>
                                            <td>{users?.role}</td>
                                            {/* <td>
                                                <button className="btn btn-success">View</button>
                                                <button className="btn btn-primary">Edit</button>
                                                <button className="btn btn-danger">Delete</button>

                                            </td> */}
                                        </tr>

                                    )) : <></>
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    );
};
export default Users;