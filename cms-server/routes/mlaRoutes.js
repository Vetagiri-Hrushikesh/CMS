// mlaRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

router.route('/register/mla')
  .get((req, res) => {
    // Handle GET request if needed
    res.status(200).json({ message: 'MLA registration form' });
  })
  .post([
    check('mlaName', 'MLA Name is required').notEmpty(),
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

    const { mlaName, district, userName, password, emailAddress } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert MLA data into the Users and MLAs tables
    const insertUserQuery = 'INSERT INTO Users (FullName, UserName, PasswordHash, Email, RoleID) VALUES (?, ?, ?, ?, ?)';
    const insertMLAQuery = 'INSERT INTO MLAs (MLAName, DistrictID, UserID) VALUES (?, (SELECT DistrictID FROM Districts WHERE DistrictName = ?), ?)';

    try {
      db.query(insertUserQuery, [mlaName, userName, hashedPassword, emailAddress, 6], (err, userResult) => {
        if (err) {
          console.error('Error creating MLA user:', err.message);
          return res.status(500).send('Internal Server Error');
        }

        const userID = userResult.insertId;

        db.query(insertMLAQuery, [mlaName, district, userID], (err, mlaResult) => {
          if (err) {
            console.error('Error creating MLA:', err.message);
            return res.status(500).send('Internal Server Error');
          }

          res.status(201).json({ message: 'MLA registration successful' });
        });
      });
    } catch (error) {
      console.error('Unhandled error during MLA registration:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });

// Endpoint to get MLA details by userID
router.get('/:userID', async (req, res) => {
  const userID = req.params.userID;

  // MLAID: MLA's unique identifier
  // MLAName: MLA's name
  // UserID: User's unique identifier
  // UserName: User's full name
  // Email: User's email address
  // DistrictID: District's unique identifier to which the MLA belongs
  // DistrictName: District's name

  try {
    const mlaQuery = `
        SELECT
        m.MLAID,
        m.MLAName,
        u.UserID,
        u.FullName AS UserName,
        u.Email,
        d.DistrictID,
        d.DistrictName
        FROM MLAs m
        JOIN Users u ON m.UserID = u.UserID
        JOIN Districts d ON m.DistrictID = d.DistrictID
        WHERE u.UserID = ?;

    `;

    const mlaDetails = await new Promise((resolve, reject) => {
      db.query(mlaQuery, [userID], (err, result) => {
        if (err) {
          console.error('Error fetching MLA details:', err.message);
          reject(err);
        } else {
          resolve(result[0]); // Assuming there is only one result or null
        }
      });
    });

    if (!mlaDetails) {
      // No MLA found with the provided userID
      res.status(404).json({ message: 'MLA not found' });
      return;
    }

    res.status(200).json(mlaDetails);
  } catch (error) {
    console.error('Unhandled error during MLA details retrieval:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
