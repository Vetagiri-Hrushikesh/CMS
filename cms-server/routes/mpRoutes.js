// mpRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

router.route('/signup/mp')
  .get((req, res) => {
    // Handle GET request if needed
    res.status(200).json({ message: 'MP signup form' });
  })
  .post([
    check('mpName', 'MP Name is required').notEmpty(),
    check('district', 'District is required').notEmpty(),
    check('userName', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    check('emailAddress', 'Valid email is required').isEmail(),
  ], async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mpName, district, userName, password, emailAddress } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert MP data into the Users and MPs tables
    const insertUserQuery = 'INSERT INTO Users (FullName, UserName, PasswordHash, Email, RoleID) VALUES (?, ?, ?, ?, ?)';
    const insertMPQuery = 'INSERT INTO MPs (MPName, DistrictID, UserID) VALUES (?, (SELECT DistrictID FROM Districts WHERE DistrictName = ?), ?)';

    try {
      db.query(insertUserQuery, [mpName, userName, hashedPassword, emailAddress, 7], (err, userResult) => {
        if (err) {
          console.error('Error creating MP user:', err.message);
          return res.status(500).send('Internal Server Error');
        }

        const userID = userResult.insertId;

        db.query(insertMPQuery, [mpName, district, userID], (err, mpResult) => {
          if (err) {
            console.error('Error creating MP:', err.message);
            return res.status(500).send('Internal Server Error');
          }

          res.status(201).json({ message: 'MP registration successful' });
        });
      });
    } catch (error) {
      console.error('Unhandled error during MP signup:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });
  
// Endpoint to get MP details by userID
router.get('/:userID', async (req, res) => {
  const userID = req.params.userID;

  // MPID: MP's unique identifier
  // MPName: MP's name
  // UserID: User's unique identifier
  // UserName: User's full name
  // Email: User's email address
  // DistrictID: District's unique identifier to which the MP belongs
  // DistrictName: District's name

  try {
    const mpQuery = `
      SELECT
      mp.MPID,
      mp.MPName,
      u.UserID,
      u.FullName AS UserName,
      u.Email,
      d.DistrictID,
      d.DistrictName
      FROM MPs mp
      JOIN Users u ON mp.UserID = u.UserID
      JOIN Districts d ON mp.DistrictID = d.DistrictID
      WHERE u.UserID = ?;
    `;

    const mpDetails = await new Promise((resolve, reject) => {
      db.query(mpQuery, [userID], (err, result) => {
        if (err) {
          console.error('Error fetching MP details:', err.message);
          reject(err);
        } else {
          resolve(result[0]); // Assuming there is only one result or null
        }
      });
    });

    if (!mpDetails) {
      // No MP found with the provided userID
      res.status(404).json({ message: 'MP not found' });
      return;
    }

    res.status(200).json(mpDetails);
  } catch (error) {
    console.error('Unhandled error during MP details retrieval:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
