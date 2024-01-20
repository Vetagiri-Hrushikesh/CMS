// Import necessary components from Material-UI
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const MLAsRegistrationForm = () => {
  const [mlaData, setMLAData] = useState({
    mlaName: '',
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
    setMLAData({ ...mlaData, [name]: value });
  };

  const handleRegister = () => {
    // Validate form data before submitting
    if (!mlaData.mlaName || !mlaData.district || !mlaData.userName || !mlaData.password || !mlaData.emailAddress) {
      setError('All fields are required');
      return;
    }

    // Send MLA registration data to Node.js server
    fetch('http://localhost:3001/api/mla/register/mla', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mlaData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('MLA registration successful:', data);
        setError(null);
        // Handle registration success, e.g., show a success message
      })
      .catch(error => setError(`Error registering MLA: ${error.message}`));
  };

  return (
    <div>
      <TextField
        label="MLA Name"
        name="mlaName"
        value={mlaData.mlaName}
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
          value={mlaData.district}
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
        value={mlaData.userName}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={mlaData.password}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Email Address"
        name="emailAddress"
        type="email"
        value={mlaData.emailAddress}
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

export default MLAsRegistrationForm;
