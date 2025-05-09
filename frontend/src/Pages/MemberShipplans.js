import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Basic",
    prices: {
      "1 Month": "880",
      "3 Months": "2400",
      "6 Months": "5000",
      "1 Year": "10000",
    },
    features: ["Access workouts", "Basic nutrition tips"],
  },
  {
    name: "Premium",
    prices: {
      "1 Month": "1120",
      "3 Months": "3200",
      "6 Months": "6600",
      "1 Year": "13000",
    },
    features: ["All Basic features", "Live sessions", "Progress tracking"],
  },
  {
    name: "Pro",
    prices: {
      "1 Month": "1600",
      "3 Months": "4600",
      "6 Months": "9400",
      "1 Year": "18000",
    },
    features: ["All Premium features", "1-on-1 coaching", "Custom diet plan"],
  },
];

const durations = ["1 Month", "3 Months", "6 Months", "1 Year"];


const MembershipPlans = () => {
  const navigate = useNavigate();
  const [selectedDuration, setSelectedDuration] = useState("1 Month");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/Pages/Register")
  }
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Choose Your Membership</h2>

      {/* Duration Selector */}
      <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
        {durations.map((duration) => (
          <button
            key={duration}
            className={`btn ${
              selectedDuration === duration ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setSelectedDuration(duration)}
          >
            {duration}
          </button>
        ))}
      </div>

      {/* Plan Cards */}
      <div className="row">
        {plans.map((plan) => (
          <div key={plan.name} className="col-md-4 mb-4">
            <div className="card shadow h-100">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title text-center">{plan.name}</h4>
                <h5 className="text-center text-success mt-2">
                  {plan.prices[selectedDuration]} / {selectedDuration}
                </h5>
                <ul className="list-unstyled mt-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>✔ {feature}</li>
                  ))}
                </ul>
                <button className="btn btn-primary mt-auto" onClick={handleSubmit}>Select Plan</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipPlans;
