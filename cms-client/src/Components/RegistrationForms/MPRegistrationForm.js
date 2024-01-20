import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

// Personal Information:
//  - MP Name
//  - District ID
//  - User ID (linked to the Users table)
// User Account Information:
//  - User Name
//  - Password
//  - Email Address
// Constituency Information:
//  - District Name

const MPRegistrationForm = () => {
  const [mpData, setMPData] = useState({
    mpName: '',
    district: '',
    userName: '',
    password: '',
    emailAddress: '',
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
    setMPData({ ...mpData, [name]: value });
  };

  const handleRegister = () => {
    // Validate form data before submitting
    if (!mpData.mpName || !mpData.district || !mpData.userName || !mpData.password || !mpData.emailAddress) {
      setError('All fields are required');
      return;
    }

    // Send MP registration data to Node.js server
    fetch('http://localhost:3001/api/mp/signup/mp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mpData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('MP registration successful:', data);
        setError(null);
      })
      .catch(error => setError(`Error registering MP: ${error.message}`));
  };

  return (
    <div>
      <TextField
        label="MP Name"
        name="mpName"
        value={mpData.mpName}
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
          value={mpData.district}
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
      <TextField
        label="User Name"
        name="userName"
        value={mpData.userName}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={mpData.password}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Email Address"
        name="emailAddress"
        type="email"
        value={mpData.emailAddress}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <Button onClick={handleRegister} variant="contained" color="primary">
        Register
      </Button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default MPRegistrationForm;
