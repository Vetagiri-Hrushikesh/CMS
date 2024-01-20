import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CIComponent = () => {
  const [cityInchargeData, setCityInchargeData] = useState(null);
  const { id: userID } = useParams();

  useEffect(() => {
    if (!userID) {
      return;
    }

    fetch(`http://localhost:3001/api/incharges/ci/${userID}`, {
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
        console.log('City Incharge Data:', data);
        setCityInchargeData(data);
      })
      .catch(error => console.log(`Error fetching City Incharge data: ${error.message}`));
  }, [userID]);

  return (
    <div>
      <h2>Welcome, City Incharge {userID}</h2>
      {cityInchargeData && (
        <div>
          {/* Display City Incharge-specific data here */}
          <p>Incharge Name: {cityInchargeData.InchargeName}</p>
          <p>Email: {cityInchargeData.Email}</p>
          {/* Add other City Incharge-related information as needed */}
        </div>
      )}
    </div>
  );
};

export default CIComponent;
