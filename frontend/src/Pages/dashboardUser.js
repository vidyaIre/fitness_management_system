import React from 'react';

const dashboardUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user is:", user);
  return (
    <div>
        <h1>Welcome to the User Dashboard, {user?.name}</h1>
        <p>This is the user dashboard where users can manage their activities.</p>
        <p>Here you can find various features and functionalities specific to users.</p>
        <div>
            <h2>User Features</h2>
            <ul>
            <li>View personal progress</li>
            <li>Manage training sessions</li>
            <li>Access resources</li>
            </ul>
        </div>
    </div>
  )
}

export default dashboardUser;