// SubInchargeComponent.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SIComponent = () => {
  const [subInchargeData, setSubInchargeData] = useState(null);
  const { id: userID } = useParams();

  useEffect(() => {
    // Ensure userID is defined before making the API call
    if (!userID) {
      return;
    }

    fetch(`http://localhost:3001/api/incharges/si/${userID}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Sub-Incharge Data:', data);
        setSubInchargeData(data);
      })
      .catch(error => console.log(`Error fetching Sub-Incharge data: ${error.message}`));
  }, [userID]);

  return (
    <div>
      <h2>Welcome, Sub-Incharge {userID}</h2>
      {subInchargeData && (
        <div>
          {/* Display Sub-Incharge-specific data here */}
          <p>Incharge Name: {subInchargeData.SubInchargeName}</p>
          <p>Email: {subInchargeData.Email}</p>
          {/* Add other Sub-Incharge-related information as needed */}
        </div>
      )}
    </div>
  );
};

export default SIComponent;
