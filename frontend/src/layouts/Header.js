import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const token = localStorage.getItem("@token");
    const user = localStorage.getItem("@user");
    console.log("user", user);
    if (token && user) {
      const logedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(logedUser.firstName);
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("@token");
    localStorage.removeItem("@user");
    setIsLoggedIn(false);
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  console.log("Hi:", userName);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={"https://res.cloudinary.com/dbaklqnls/image/upload/v1745834231/logo_jfaztb.jpg"}
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-text-top"
          />
        </a>
        <a className="navbar-brand text-white fw-bold" href="/">Team ART</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
            <li className="nav-item">
              <a className="nav-link active text-white" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dashboard
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/Pages/DashboardUser">User</a>
                </li>
                <li>
                  <a className="dropdown-item" href="/Pages/DashboardTrainer">Trainer</a>
                </li>
                <li>
                  <a className="dropdown-item" href="/Pages/DashboardAdmin">Admin</a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Link
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/Pages/CreateWorkout">Create Workout</a>
                </li>
                <li>
                  <a className="dropdown-item" href="/Pages/createSession">Create Session</a>
                </li>
                <li>
                  <a className="dropdown-item" href="/Pages/CreateNutrition">Create Nutrition</a>
                </li>
              </ul>
            </li>
          </ul>
          {/* <form className="d-flex ms-auto" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form> */}
          <ul className="navbar-nav ms-3">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/Pages/Login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/Pages/Register">Register</a>
                </li>
              </>
            ) : (
              <>
              <li className="nav-item">
                <a className="nav-link text-white" href="/Pages/Profile">Welcome, {userName}</a>
              </li>

              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
