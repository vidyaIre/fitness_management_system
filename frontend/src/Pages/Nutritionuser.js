import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getNutritionByUserId } from '../apiUtils/nutritionApi';

const Nutritionuser = () => {
    const [nutritionUser, setNutritionUser] = useState([]);
    useEffect(() => {
            const fetchNutritionUser = async () => {
                try {
                    const token = JSON.parse(localStorage.getItem("@token"));
                    const user = JSON.parse(localStorage.getItem("@user"));
                    const id = user?.id;
                    if (!token || !id) {
                        console.error("User not logged in or missing token.");
                        return;
                    }
                    const result = await getNutritionByUserId(id);
                    console.log("Fetched nutrition from nutritionUser:", result);
                    if (result.success && result.nutrition) {
                        setNutritionUser(result.nutrition);
                    } else {
                        console.error("Failed to fetch nutrition.");
                    }
                } catch (error) {
                    console.error("Error fetching nutrition users:", error);
                }
            };
            fetchNutritionUser();
        }, []);
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4 text-success">🥗 Nutrition List</h1>

      {nutritionUser?.length > 0 ? (
        <div className="accordion" id="nutritionAccordion">
          {nutritionUser.map((n, idx) => (
            <div className="card mb-3 shadow" key={n._id} style={{ borderColor: '#28a745' }}>
              <div className="card-header d-flex justify-content-between align-items-center bg-success text-white">
                <div>
                  <strong>{n.title}</strong> by {<strong>{n.user.firstName} {n.user.lastName}</strong>}
                </div>
                <button
                  className="btn btn-outline-light btn-sm"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${idx}`}
                  aria-expanded="false"
                  aria-controls={`collapse${idx}`}
                >
                  Details
                </button>
              </div>

              <div id={`collapse${idx}`} className="collapse" data-bs-parent="#nutritionAccordion">
                <div
                  className="card-body bg-light"
                  style={{ borderTop: '3px solid #28a745' }}
                >
                  <p><strong>Calories:</strong> {n.calories}</p>
                  <p><strong>Protein:</strong> {n.protein}g</p>
                  <p><strong>Carbohydrates:</strong> {n.carbohydrates}g</p>
                  <p><strong>Fats:</strong> {n.fats}g</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No nutrition data available.</p>
      )}
    </div>
  )
}

export default Nutritionuser;