import React from 'react';


const Home = () => {
  return (
    // <div>
    //     <h1>Welcome to the Home Page</h1>
    //     <p>This is the home page of our application.</p>
    //     <p>Here you can find various features and functionalities.</p>
    //     <div>
    //         <Link to="/login">Login</Link>
    //         <Link to="/register">Register</Link>
    //     </div>
    // </div>

    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow text-center p-4">
            <h1 className="mb-3">Welcome to the Home Page</h1>
            <p className="lead">This is the home page of our application.</p>
            <p>Here you can find various features and functionalities.</p>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <a href="/Pages/Login" className="btn btn-outline-primary px-4">Login</a>
              <a href="/Pages/Register" className="btn btn-primary px-4">Register</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;