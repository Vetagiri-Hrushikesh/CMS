// DistrictInchargeComponent.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DIComponent = () => {
  const [districtInchargeData, setDistrictInchargeData] = useState(null);
  const { id: userID } = useParams();

  useEffect(() => {
    // Ensure userID is defined before making the API call
    if (!userID) {
      return;
    }

    fetch(`http://localhost:3001/api/incharges/di/${userID}`, {
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
        console.log('District Incharge Data:', data);
        setDistrictInchargeData(data);
      })
      .catch(error => console.log(`Error fetching District Incharge data: ${error.message}`));
  }, [userID]);

  return (
    <div>
      <h2>Welcome, District Incharge {userID}</h2>
      {districtInchargeData && (
        <div>
          {/* Display District Incharge-specific data here */}
          <p>Incharge Name: {districtInchargeData.InchargeName}</p>
          <p>Email: {districtInchargeData.Email}</p>
          {/* Add other District Incharge-related information as needed */}
        </div>
      )}
    </div>
  );
};

export default DIComponent;
