import React from 'react';
import logo from '../assets/images/logo.jpg';

const Navbar = () => {
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
          <form className="d-flex ms-auto" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="/Pages/Login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/Pages/Register">
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
