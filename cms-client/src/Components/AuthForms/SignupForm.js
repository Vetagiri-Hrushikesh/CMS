import React, { useState, useRef } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DIRegistrationForm from '../RegistrationForms/DIRegistrationForm';
import CIRegistrationForm from '../RegistrationForms/CIRegistrationForm';
import SIRegistrationForm from '../RegistrationForms/SIRegistrationForm';
import MemRegistrationForm from '../RegistrationForms/MemRegistrationForm';
import MLARegistrationForm from '../RegistrationForms/MLARegistrationForm';
import MPRegistrationForm from '../RegistrationForms/MPRegistrationForm';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [signupData, setSignupData] = useState({
    selectedRole: '',
  });

  const formRef = useRef();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(signupData);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left half with nature image */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/6776756/pexels-photo-6776756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Nature" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Right half with signup form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '70%', maxWidth: '400px' }}>
          <form ref={formRef} onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Select Role</InputLabel>
              <Select
                labelId="role-label"
                name="selectedRole"
                value={signupData.selectedRole}
                onChange={handleChange}
                required
              >
                <MenuItem value="District Incharge">District Incharge</MenuItem>
                <MenuItem value="City Incharge">City Incharge</MenuItem>
                <MenuItem value="Sub Incharge">Sub Incharge</MenuItem>
                <MenuItem value="Member">Member</MenuItem>
                <MenuItem value="MLA">MLA</MenuItem>
                <MenuItem value="MP">MP</MenuItem>
              </Select>
            </FormControl>

            {/* Display the registration form based on the selected role */}
            {signupData.selectedRole === 'District Incharge' && <DIRegistrationForm />}
            {signupData.selectedRole === 'City Incharge' && <CIRegistrationForm />}
            {signupData.selectedRole === 'Sub Incharge' && <SIRegistrationForm />}
            {signupData.selectedRole === 'Member' && <MemRegistrationForm />}
            {signupData.selectedRole === 'MLA' && <MLARegistrationForm />}
            {signupData.selectedRole === 'MP' && <MPRegistrationForm />}

            <p style={{ marginTop: '10px', textAlign: 'center', fontSize: '14px' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ textDecoration: 'none', color: '#1976D2' }}>
                Log in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;