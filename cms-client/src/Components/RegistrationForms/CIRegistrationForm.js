// Import necessary components from Material-UI
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

// Personal Information:
//  - City Incharge Name
//  - City ID
//  - User ID (linked to the Users table)
// User Account Information:
//  - User Name
//  - Password
//  - Email Address

const CityInchargesRegistrationForm = () => {
  // State to manage input values
  const [cityInchargeData, setCityInchargeData] = useState({
    inchargeName: '',
    city: '',
    userName: '',
    password: '',
    emailAddress: '',
  });

  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch cities from Node.js server
    fetch('http://localhost:3001/api/cities/cities')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setCities(data))
      .catch(error => setError(`Error fetching cities: ${error.message}`));
  }, []);

  // Event handler for input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCityInchargeData({ ...cityInchargeData, [name]: value });
  };

  const handleRegister = () => {
    // Send registration data to the server
    fetch('http://localhost:3001/api/incharges/register/cityincharge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cityInchargeData),
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
        label="City Incharge Name"
        name="inchargeName"
        value={cityInchargeData.inchargeName}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="city-label">City</InputLabel>
        <Select
          labelId="city-label"
          name="city"
          value={cityInchargeData.city}
          onChange={handleChange}
          required
        >
          {cities.map(city => (
            <MenuItem key={city.CityID} value={city.CityID}>
              {city.CityName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="User Name"
        name="userName"
        value={cityInchargeData.userName}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={cityInchargeData.password}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Email Address"
        name="emailAddress"
        type="email"
        value={cityInchargeData.emailAddress}
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

export default CityInchargesRegistrationForm;
