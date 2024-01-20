import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const MembersRegistrationForm = () => {
  const [memberData, setMemberData] = useState({
    memberName: '',
    subIncharge: '',
    userName: '',
    password: '',
    emailAddress: '',
  });

  const [subIncharges, setSubIncharges] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch sub incharges from Node.js server
    fetch('http://localhost:3001/api/incharges/subIncharges')
      .then(response => response.json())
      .then(data => setSubIncharges(data))
      .catch(error => console.error('Error fetching sub incharges:', error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMemberData({ ...memberData, [name]: value });
  };

  const handleRegister = () => {
    // Send registration data to the server
    fetch('http://localhost:3001/api/members/register/member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Registration successful:', data);
        // Handle success as needed (e.g., show a success message, redirect, etc.)
      })
      .catch(error => {
        console.error(`Error registering Member: ${error.message}`);
        setError(`Error registering Member: ${error.message}`);
      });
  };

  return (
    <div>
      <TextField
        label="Member Name"
        name="memberName"
        value={memberData.memberName}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="subIncharge-label">Sub Incharge</InputLabel>
        <Select
          labelId="subIncharge-label"
          name="subIncharge"
          value={memberData.subIncharge}
          onChange={handleChange}
          required
        >
          {subIncharges.map(subIncharge => (
            <MenuItem key={subIncharge.SubInchargeID} value={subIncharge.SubInchargeID}>
              {subIncharge.SubInchargeName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="User Name"
        name="userName"
        value={memberData.userName}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={memberData.password}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Email Address"
        name="emailAddress"
        type="email"
        value={memberData.emailAddress}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <Button onClick={handleRegister} variant="contained" color="primary">
        Register
      </Button>
    </div>
  );
};

export default MembersRegistrationForm;
