// usersRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/login', async (req, res) => {
  console.log('Received login request with data:', req.body);
  const { email, password } = req.body;

  // Check if required fields are present
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Query to get user details by email
  const query = `
    SELECT *
    FROM Users
    WHERE Email = ?
  `;

  try {
    db.query(query, [email], async (err, result) => {
      if (err) {
        console.error('Error fetching user details:', err.message);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      console.log('Query Result:', result);

      console.log(result.length);
      // Check if user with given email exists
      if (result.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check if the user has a hashed password stored
      if (!result[0].PasswordHash) {
        return res.status(500).json({ message: 'Password hash not found for the user' });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, result[0].PasswordHash);
      if (!isPasswordValid) {
        console.log("Password is Invalid");
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Define role names based on role ID
      const roleNames = {
        1: 'Admin',
        2: 'District Incharge',
        3: 'City Incharge',
        4: 'Sub Incharge',
        5: 'Member',
        6: 'MLA',
        7: 'MP',
      };

      // Determine the role based on role ID
      const role = roleNames[result[0].RoleID] || 'Unknown';

      // Generate JWT token
      const token = jwt.sign(
        { userID: result[0].UserID, roleID: result[0].RoleID },
        'secret_key',
        { expiresIn: '1h' }
      );

      console.log(token + "\n" + role + "\n" + "userID" + ": " + result[0].UserID);
      res.status(200).json({ token, role, userID: result[0].UserID });
    });
  } catch (error) {
    console.error('Unhandled error during user login:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
