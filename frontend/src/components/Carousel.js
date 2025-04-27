import React from 'react';

const Carousel = () => {
  const images = [
    "https://res.cloudinary.com/dbaklqnls/image/upload/w_1200,h_800,c_fill/v1745748161/image1_stxbtb.avif",
    "https://res.cloudinary.com/dbaklqnls/image/upload/w_1200,h_800,c_fill/v1745748197/image2.jpg",
    "https://res.cloudinary.com/dbaklqnls/image/upload/w_1200,h_800,c_fill/v1745748207/image6.jpg",
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center text-uppercase fw-bold mb-4">Welcome to MyFitnessApp</h2>
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {images.map((img, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
              <img src={img} className="d-block w-100" alt={`Slide ${index}`} />
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
