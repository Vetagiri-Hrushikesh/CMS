import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

// Personal Information:
//  - Sub Incharge Name
//  - City Incharge ID
//  - User ID (linked to the Users table)
// User Account Information:
//  - User Name
//  - Password
//  - Email Address
// SubInchargesRegistrationForm.js

const SubInchargesRegistrationForm = () => {
  const [subInchargeData, setSubInchargeData] = useState({
    subInchargeName: '',
    cityIncharge: '',
    userName: '',
    password: '',
    emailAddress: '',
  });

  const [cityIncharges, setCityIncharges] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Fetch city incharges from Node.js server
    fetch('http://localhost:3001/api/incharges/cityIncharges')
      .then(response => response.json())
      .then(data => setCityIncharges(data))
      .catch(error => console.error('Error fetching city incharges:', error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubInchargeData({ ...subInchargeData, [name]: value });
  };

  const handleRegister = () => {
    // Send registration data to the server
    fetch('http://localhost:3001/api/incharges/register/subincharge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subInchargeData),
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
        console.error(`Error registering Sub Incharge: ${error.message}`);
        setError(`Error registering Sub Incharge: ${error.message}`);
      });
  };
  
  return (
    <div>
      <TextField
        label="Sub Incharge Name"
        name="subInchargeName"
        value={subInchargeData.subInchargeName}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="cityIncharge-label">City Incharge</InputLabel>
        <Select
          labelId="cityIncharge-label"
          name="cityIncharge"
          value={subInchargeData.cityIncharge}
          onChange={handleChange}
          required
        >
          {cityIncharges.map(cityIncharge => (
            <MenuItem key={cityIncharge.InchargeID} value={cityIncharge.InchargeName}>
              {cityIncharge.InchargeName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="User Name"
        name="userName"
        value={subInchargeData.userName}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={subInchargeData.password}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Email Address"
        name="emailAddress"
        type="email"
        value={subInchargeData.emailAddress}
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

export default SubInchargesRegistrationForm;
