import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';
import { toast } from 'react-toastify';

function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosInstance.post('/user/verify-otp', { email, otp });

      if (data.success) {
        toast.success("OTP verified successfully!");
        navigate("/Pages/Users"); // or login page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to verify OTP");
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Enter OTP</h2>
      <form onSubmit={handleOtpSubmit}>
        <div className="mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter OTP" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Verify OTP</button>
      </form>
    </div>
  );
}

export default VerifyOtp;
