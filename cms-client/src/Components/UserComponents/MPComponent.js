// MPComponent.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';

const MPComponent = () => {
  const [mpData, setMPData] = useState(null);
  const { id: userID } = useParams();

  useEffect(() => {
    if (!userID) {
      return;
    }
    fetch(`http://localhost:3001/api/mp/${userID}`, {
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
        console.log('MP Data:', data);
        setMPData(data);
      })
      .catch(error => console.log(`Error fetching MP data: ${error.message}`));
  }, [userID]);

  return (
    <div>
      <h2>Welcome, MP {userID}</h2>
      {mpData && (
        <div>
          {/* Display MP-specific data here */}
          <p>MP Name: {mpData.MPName}</p>
          <p>Email: {mpData.Email}</p>
          {/* Add other MP-related information as needed */}
        </div>
      )}
    </div>
  );
};

export default MPComponent;
