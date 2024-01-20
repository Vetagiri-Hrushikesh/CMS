// LoginForm.js
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useNavigate  } from 'react-router-dom';
// import MLAComponent from '../UserComponents/MLAComponent'; // Import your MLA component

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = () => {
    // Validate form data before submitting
    if (!loginData.email || !loginData.password) {
      console.log('Email and password are required');
      return;
    }
  
    fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Login successful:', data);
        localStorage.setItem('token', JSON.stringify(data.token));
        setUserInfo(data); // Store user information in state
  
        console.log("================================================================")
        console.log(data.userID)
      // Redirect to specific component based on user's role
      if (data.role === 'MLA') {
        // Set the userID in the navigate function
        navigate(`/mla/${data.userID}`);
      }
      if (data.role === 'MP') {
        // Set the userID in the navigate function
        navigate(`/mp/${data.userID}`);
      }
      if (data.role === 'City Incharge') {
        // Set the userID in the navigate function
        navigate(`/ci/${data.userID}`);
      }
      if (data.role === 'Sub Incharge') {
        // Set the userID in the navigate function
        navigate(`/si/${data.userID}`);
      }
      if (data.role === 'District Incharge') {
        // Set the userID in the navigate function
        navigate(`/di/${data.userID}`);
      }
      if (data.role === 'Member') {
        // Set the userID in the navigate function
        navigate(`/member/${data.userID}`);
      }

      })
      .catch(error => console.log(`Error logging in: ${error.message}`));
  };
  
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left half with nature image */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {/* Replace the placeholder URL with the actual URL of your nature image */}
        <img src="https://images.pexels.com/photos/6776756/pexels-photo-6776756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Nature" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Right half with login form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '70%', maxWidth: '400px' }}>
          <h2 style={{ textAlign: 'center', color: '#333' }}>PMS</h2>
          <div>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <Button onClick={handleLogin} variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Login
            </Button>

            <p style={{ marginTop: '10px', textAlign: 'center', fontSize: '14px' }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ textDecoration: 'none', color: '#1976D2' }}>
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
