import React, { useEffect, useState } from 'react';


const TrainerDash = () => {
    const [trainerData, setTrainerData] = useState(null);

    useEffect(() => {
        const id = JSON.parse(localStorage.getItem('@user'))?.id;
        if (!id) return console.error('Not logged in.');

        // Fetch trainer data by ID (assuming an API function exists)
        fetch(`/api/trainers/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setTrainerData(data.trainer);
                } else {
                    console.error('Failed to fetch trainer data');
                }
            })
            .catch(err => console.error('Error fetching trainer data:', err));
    }, []);
  return (
    <div>TrainerDash</div>
  )
}

export default TrainerDash;