import React from 'react';

const Carousel = () => {
  return (
    <div className="container my-5">
   
    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">

      <div className="carousel-inner">
      <h2 className="text-center  text-uppercase fw-bold mb-4 ">Welcome to MyFitnessApp</h2>
        <div className="carousel-item active">
          <img
            src="https://img.freepik.com/premium-photo/fit-woman-doing-sit-ups-gym_470178-8717.jpg"
            className="d-block w-100"
            alt="image1"
            
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://wallsdesk.com/wp-content/uploads/2016/10/Gym-for-desktop.jpg"
            className="d-block w-100"
            alt="image2"
            
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://wallpapercave.com/wp/wp5339178.jpg"
            className="d-block w-100"
            alt="image3"
            
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    </div>
  );
};

export default Carousel;
