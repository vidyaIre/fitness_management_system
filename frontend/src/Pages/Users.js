import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUser } from '../apiUtils/userApi';



const Users = () => {
    const [usersValue, setUsers] = useState([]);
    console.log("usersValue is:", usersValue);
    async function fetchUsers() {
        try {
            const userData = await getUser();
            console.log("userData is:", userData);
            if (userData?.success) {
                setUsers(userData?.data);
                toast.success("Users fetched successfully");

            } else {
                console.log("No users found");
                toast.info("No users found");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Error fetching users");
        }
    }

    useEffect(() => {
        fetchUsers();
        //eslint-disable-next-line
    },  []);


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
                            </tr>
                        </thead>
                        <tbody>
                        {
                                usersValue && usersValue?.length > 0
                                    ? usersValue.map((users) => (
                                        < tr >
                                            <td>{users?.firstName}</td>
                                            <td>{users?.lastName}</td>
                                            <td>{users?.email}</td>
                                            <td>{users?.role}</td>
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