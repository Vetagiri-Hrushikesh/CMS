import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const DistrictInchargeRegistrationForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    district: '',
  });

  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch districts from Node.js server
    fetch('http://localhost:3001/api/districts/districts')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setDistricts(data))
      .catch(error => setError(`Error fetching districts: ${error.message}`));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

// Updated handleRegister function
const handleRegister = () => {
    // Send registration data to the server
    fetch('http://localhost:3001/api/incharges/register/districtincharge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
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
        console.error(`Error registering District Incharge: ${error.message}`);
        setError(`Error registering District Incharge: ${error.message}`);
      });
  };
  

  return (
    <div>
      <TextField
        label="Username"
        name="username"
        value={userData.username}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Full Name"
        name="fullName"
        value={userData.fullName}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="district-label">District</InputLabel>
        <Select
          labelId="district-label"
          name="district"
          value={userData.district}
          onChange={handleChange}
          required
        >
          {districts.map(district => (
            <MenuItem key={district.DistrictID} value={district.DistrictName}>
              {district.DistrictName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleRegister} variant="contained" color="primary">
        Register
      </Button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DistrictInchargeRegistrationForm;
