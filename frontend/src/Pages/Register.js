import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../config/axiosConfig';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    role: '',
    specialization: '',
    experience: '',
    certification: '',
    availability: '',
    weight: '',
    height: '',
    goal: '',
    memberShip: '',
    phone: ''
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = { ...formData };
    console.log("payload is:", payload);
    if (formData.role === "trainer") {
      payload.specialization = formData.specialization;
      payload.experience = formData.experience;
      payload.certification = formData.certification;
      payload.availability = formData.availability;
    } else if (formData.role === "user") {
      payload.weight = formData.weight;
      payload.height = formData.height;
      payload.goal = formData.goal;
      payload.memberShip = formData.memberShip;
      payload.phone = formData.phone;
    } else if (formData.role === "admin") {
      payload.phone = formData.phone;

    }

    try {
      const { data } = await axiosInstance.post("registerUser", formData);
      console.log("data from register is:", data);
      localStorage.setItem("@token", JSON.stringify(data?.token));
      localStorage.setItem("@user", JSON.stringify(data?.user));
      console.log("token is:", data?.token);
      console.log("user is:", data?.user);

      if (data?.success) {
        toast.success("Registration successful");
      } else {
        toast.error("Registration failed");
      }
      navigate("/Pages/Login");

    } catch (error) {
      console.log("Error during registration:", error);
      toast.error("Registration failed");
    }
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Register</h2>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input type="text" className="form-control" id="firstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleRegister} />
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleRegister} />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleRegister} />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleRegister} />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleRegister} />
                </div>

                <div className="mb-3">
                  <label htmlFor="age" className="form-label">Age</label>
                  <input type="number" className="form-control" id="age" name="age" placeholder="Age" value={formData.age} onChange={handleRegister} />
                </div>

                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">Gender</label>
                  <select className="form-select" id="gender" name="gender" value={formData.gender} onChange={handleRegister}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor='role' className='form-label'>Role</label>
                  <select className="form-select" id="role" name="role" value={formData.role} onChange={handleRegister}>
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="trainer">Trainer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                {
                  formData.role === "trainer" && (
                    <>
                      <div className="mb-3">
                        <label htmlFor='specialization' className='form-label'>Specialization: </label>
                        <select className="form-select" id="specialization" name="specialization" value={formData.specialization} onChange={handleRegister}>
                          <option value="">Select Specialization</option> 
                          <option value="yoga">Yoga</option>
                          <option value="weightlifting">Weightlifting</option>
                          <option value="cardio">Cardio</option>
                          <option value="nutrition">Nutrition</option>
                          <option value="rehabilitation">Rehabilitation</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label htmlFor='experience' className='form-label'>Experience: </label>
                        <input type="number" className="form-control" id="experience" name="experience" placeholder="Experience in years" value={formData.experience} onChange={handleRegister} />
                      </div>

                      <div className="mb-3">
                        <label htmlFor='certification' className='form-label'>Certification: </label>
                        <input type="text" className="form-control" id="certification" name="certification" placeholder="Certification" value={formData.certification} onChange={handleRegister} />
                      </div>

                      <div className="mb-3">
                        <label htmlFor='availability' className='form-label'>Availability: </label>
                        <input type="text" className="form-control" id="availability" name="availability" placeholder="Availability" value={formData.availability} onChange={handleRegister} />
                      </div>
                    </>
                  )
                }

                {
                  formData.role === "user" && (
                    <>
                      <div className="mb-3">
                        <label htmlFor='weight' className='form-label'>Weight: </label>
                        <input type="number" className="form-control" id="weight" name="weight" placeholder="Weight in kg" value={formData.weight} onChange={handleRegister} />
                      </div>

                      <div className="mb-3">
                        <label htmlFor='height' className='form-label'>Height: </label>
                        <input type="number" className="form-control" id="height" name="height" placeholder="Height in cm" value={formData.height} onChange={handleRegister} />
                      </div>

                      <div className="mb-4">
                        <label htmlFor='goal' className='form-label'>Goal: </label>
                        <select className="form-select" id="goal" name="goal" value={formData.goal} onChange={handleRegister}>
                          <option value="">Select Goal</option>
                          <option value="weight loss">Weight Loss</option>
                          <option value="muscle gain">Muscle Gain</option>
                          <option value="maintain weight">Maintain Weight</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label htmlFor='memberShip' className='form-label'>Membership: </label>
                        <select className="form-select" id="memberShip" name="memberShip" value={formData.memberShip} onChange={handleRegister}>
                          <option value="">Select Membership</option>
                          <option value="basic">Basic</option>
                          <option value="premium">Premium</option>
                          <option value="pro">Pro</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label htmlFor='phone' className='form-label'>Phone: </label>
                        <input type="number" className="form-control" id="phone" name="phone" placeholder="Contact" value={formData.phone} onChange={handleRegister} />
                      </div>
                    </>
                  )
                }
                {
                  formData.role === "admin" && (
                    <>
                      <div className="mb-3">
                        <label htmlFor='phone' className='form-label'>Phone: </label>
                        <input type="number" className="form-control" id="phone" name="phone" placeholder="Contact" value={formData.phone} onChange={handleRegister} />
                      </div>
                    </>
                  )
                }

                <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Register</button>

                <p className="mt-3 text-center">
                  Already have an account? <a href="/login">Login</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
