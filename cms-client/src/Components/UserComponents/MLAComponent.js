// MLAComponent.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MLAComponent = () => {
  const [mlaData, setMlaData] = useState(null);
  const { id: userID } = useParams(); // Rename 'id' to match the parameter in your route

  useEffect(() => {
    // Ensure userID is defined before making the API call
    if (!userID) {
      return;
    }

    // Fetch MLA-specific data based on the userID
    // Replace 'http://localhost:3001/api/mla' with your actual API endpoint
    fetch(`http://localhost:3001/api/mla/${userID}`, {
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
        console.log('MLA Data:', data);
        setMlaData(data);
      })
      .catch(error => console.log(`Error fetching MLA data: ${error.message}`));
  }, [userID]);

  return (
    <div>
      <h2>Welcome, MLA {userID}</h2>
      {mlaData && (
        <div>
          {/* Display MLA-specific data here */}
          <p>MLA Name: {mlaData.MLAName}</p>
          <p>Email: {mlaData.Email}</p>
          {/* Add other MLA-related information as needed */}
        </div>
      )}
    </div>
  );
};

export default MLAComponent;
