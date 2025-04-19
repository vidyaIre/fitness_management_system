import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-2 mt-5">
      <div className="container">
        <div className="row">
          {/* Branding */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Team Art Fitness</h5>
            <p>
              Transform your life through health and fitness. Join our community and take the first step toward a better you.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/Trainers" className="text-white text-decoration-none">Trainers</a></li>
              <li><a href="/login" className="text-white text-decoration-none">Login</a></li>
              <li><a href="/register" className="text-white text-decoration-none">Register</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Contact Us</h5>
            <p>Email: support@teamARTfitnessapp.com</p>
            <p>Phone: +91 9846786755</p>
            <p>Location: Valanchery, Malappuram, Kerala</p>
          </div>
        </div>

        <div className="text-center border-top pt-3 mt-3">
          <small>&copy; {new Date().getFullYear()} teamART. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
