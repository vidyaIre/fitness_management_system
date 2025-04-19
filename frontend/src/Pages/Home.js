import React from 'react';
import Carousel from '../components/Carousel';


const Home = () => {
  return (
    // <div className="container mt-5">
    //   <div className="row justify-content-center">
    //     <div className="col-md-8">
    //       <div className="card shadow text-center p-4">
    //         <h1 className="mb-3">Welcome to the Home Page</h1>
    //         <p className="lead">This is the home page of our application.</p>
    //         <p>Here you can find various features and functionalities.</p>

    //         <div className="d-flex justify-content-center gap-3 mt-4">
    //           <a href="/Pages/Login" className="btn btn-outline-primary px-4">Login</a>
    //           <a href="/Pages/Register" className="btn btn-primary px-4">Register</a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <Carousel />
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Left side - Image */}
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="https://img.freepik.com/premium-photo/fit-woman-doing-sit-ups-gym_470178-8717.jpg"
              alt="Workout"
              className="img-fluid rounded shadow"
              style={{ height: '400px', objectFit: 'cover', width: '100%' }}
            />
          </div>

          {/* Right side - Text */}
          <div className="col-md-6 text-center text-md-start">
            <h2 className="fw-bold">Transform Your Body</h2>
            <p className="lead">
              Our expert trainers and personalized programs are designed to help you meet your fitness goals, whether you're a beginner or a pro.
            </p>
            <a href="/Pages/register" className="btn btn-primary mt-3">Join Now</a>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row align-items-center">

          {/* Left Side - Text */}
          <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
            <h2 className="fw-bold">Your Fitness Journey Starts Here</h2>
            <p className="lead">
              Build strength, boost stamina, and transform your lifestyle with personalized training programs from certified experts.
            </p>
            <a href="/Pages/register" className="btn btn-primary mt-3">Get Started</a>
          </div>

          {/* Right Side - Image */}
          <div className="col-md-6">
            <img
              src="https://wallpapercave.com/wp/wp5339178.jpg"
              alt="Fitness"
              className="img-fluid rounded shadow"
              style={{ height: '400px', objectFit: 'cover', width: '100%' }}
            />
          </div>

        </div>
      </div>

    </>
  )
}


export default Home;