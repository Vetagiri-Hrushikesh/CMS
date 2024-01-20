// membersRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

router.get('/:userID', async (req, res) => {
    const userID = req.params.userID;
    
    try {
      const memberQuery = `
        SELECT
          m.PersonID,
          m.MemberName,
          u.UserID,
          u.FullName AS UserName,
          u.Email,
          si.SubInchargeID,
          si.SubInchargeName
        FROM Members m
        JOIN Users u ON m.UserID = u.UserID
        JOIN SubIncharges si ON m.SubInchargeID = si.SubInchargeID
        WHERE u.UserID = ?;
      `;
  
      const memberDetails = await new Promise((resolve, reject) => {
        db.query(memberQuery, [userID], (err, result) => {
          if (err) {
            console.error('Error fetching Member details:', err.message);
            reject(err);
          } else {
            resolve(result[0]); // Assuming there is only one result or null
          }
        });
      });
  
      if (!memberDetails) {
        // No Member found with the provided userID
        res.status(404).json({ message: 'Member not found' });
        return;
      }
  
      res.status(200).json(memberDetails);
    } catch (error) {
      console.error('Unhandled error during Member details retrieval:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });

router.post('/register/member', async (req, res) => {
  const { memberName, subIncharge, userName, password, emailAddress } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert Member data into the Users and Members tables
    const insertUserQuery = 'INSERT INTO Users (FullName, UserName, PasswordHash, Email, RoleID) VALUES (?, ?, ?, ?, ?)';
    const insertMemberQuery = 'INSERT INTO Members (MemberName, SubInchargeID, UserID) VALUES (?, ?, ?)';

    const userResult = await new Promise((resolve, reject) => {
      db.query(insertUserQuery, [memberName, userName, hashedPassword, emailAddress, 5], (err, result) => {
        if (err) {
          console.error('Error creating Member user:', err.message);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const userID = userResult.insertId;

    await new Promise((resolve, reject) => {
      db.query(insertMemberQuery, [memberName, subIncharge, userID], (err, result) => {
        if (err) {
          console.error('Error creating Member:', err.message);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    res.status(201).json({ message: 'Member registration successful' });
  } catch (error) {
    console.error('Unhandled error during Member registration:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
