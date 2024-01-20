import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MemComponent = () => {
  const [memberData, setMemberData] = useState(null);
  const { id: userID } = useParams();

  useEffect(() => {
    // Ensure userID is defined before making the API call
    if (!userID) {
      return;
    }

    // Fetch Member-specific data based on the userID
    // Replace 'http://localhost:3001/api/member' with your actual API endpoint
    fetch(`http://localhost:3001/api/members/${userID}`, {
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
        console.log('Member Data:', data);
        setMemberData(data);
      })
      .catch(error => console.log(`Error fetching Member data: ${error.message}`));
  }, [userID]);

  return (
    <div>
      <h2>Welcome, Member {userID}</h2>
      {memberData && (
        <div>
          {/* Display Member-specific data here */}
          <p>Member Name: {memberData.MemberName}</p>
          <p>Email: {memberData.Email}</p>
          {/* Add other Member-related information as needed */}
        </div>
      )}
    </div>
  );
};

export default MemComponent;
