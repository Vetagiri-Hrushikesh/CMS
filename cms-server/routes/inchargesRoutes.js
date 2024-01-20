 // districtsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');


router.get('/di/:userID', async (req, res) => {
  const userID = req.params.userID;

  // InchargeID: District Incharge's unique identifier
  // InchargeName: District Incharge's name
  // UserID: User's unique identifier
  // UserName: User's full name
  // DistrictID: District's unique identifier to which the District Incharge belongs
  // DistrictName: District's name

  try {
    const districtInchargeQuery = `
      SELECT
        di.InchargeID,
        di.InchargeName,
        u.UserID,
        u.FullName AS UserName,
        u.Email,
        d.DistrictID,
        d.DistrictName
      FROM DistrictIncharges di
      JOIN Users u ON di.UserID = u.UserID
      JOIN Districts d ON di.DistrictID = d.DistrictID
      WHERE u.UserID = ?;
    `;

    const districtInchargeDetails = await new Promise((resolve, reject) => {
      db.query(districtInchargeQuery, [userID], (err, result) => {
        if (err) {
          console.error('Error fetching District Incharge details:', err.message);
          reject(err);
        } else {
          resolve(result[0]); // Assuming there is only one result or null
        }
      });
    });

    if (!districtInchargeDetails) {
      // No District Incharge found with the provided userID
      res.status(404).json({ message: 'District Incharge not found' });
      return;
    }

    res.status(200).json(districtInchargeDetails);
  } catch (error) {
    console.error('Unhandled error during District Incharge details retrieval:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/si/:userID', async (req, res) => {
  const userID = req.params.userID;
  try {
    const subInchargeQuery = `
      SELECT
        si.SubInchargeID,
        si.SubInchargeName,
        u.UserID,
        u.FullName AS UserName,
        u.Email,
        ci.InchargeID,
        ci.InchargeName
      FROM SubIncharges si
      JOIN Users u ON si.UserID = u.UserID
      JOIN CityIncharges ci ON si.InchargeID = ci.InchargeID
      WHERE u.UserID = ?;
    `;

    const subInchargeDetails = await new Promise((resolve, reject) => {
      db.query(subInchargeQuery, [userID], (err, result) => {
        if (err) {
          console.error('Error fetching Sub-Incharge details:', err.message);
          reject(err);
        } else {
          resolve(result[0]); // Assuming there is only one result or null
        }
      });
    });

    if (!subInchargeDetails) {
      // No Sub-Incharge found with the provided userID
      res.status(404).json({ message: 'Sub-Incharge not found' });
      return;
    }

    res.status(200).json(subInchargeDetails);
  } catch (error) {
    console.error('Unhandled error during Sub-Incharge details retrieval:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


// Endpoint to get City Incharge details by userID
router.get('/ci/:userID', async (req, res) => {
  const userID = req.params.userID;

  try {
    const cityInchargeQuery = `
      SELECT
        ci.InchargeID,
        ci.InchargeName,
        u.UserID,
        u.FullName AS UserName,
        u.Email,
        c.CityID,
        c.CityName
      FROM CityIncharges ci
      JOIN Users u ON ci.UserID = u.UserID
      JOIN Cities c ON ci.CityID = c.CityID
      WHERE u.UserID = ?;
    `;

    const cityInchargeDetails = await new Promise((resolve, reject) => {
      db.query(cityInchargeQuery, [userID], (err, result) => {
        if (err) {
          console.error('Error fetching City Incharge details:', err.message);
          reject(err);
        } else {
          resolve(result[0]); // Assuming there is only one result or null
        }
      });
    });

    if (!cityInchargeDetails) {
      // No City Incharge found with the provided userID
      res.status(404).json({ message: 'City Incharge not found' });
      return;
    }

    res.status(200).json(cityInchargeDetails);
  } catch (error) {
    console.error('Unhandled error during City Incharge details retrieval:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/register/districtincharge', async (req, res) => {
  const { username, password, email, fullName, district } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert District Incharge data into the Users and DistrictIncharges tables
    const insertUserQuery = 'INSERT INTO Users (FullName, UserName, PasswordHash, Email, RoleID) VALUES (?, ?, ?, ?, ?)';
    const insertDistrictInchargeQuery = 'INSERT INTO DistrictIncharges (InchargeName, DistrictID, UserID) VALUES (?, (SELECT DistrictID FROM Districts WHERE DistrictName = ?), ?)';

    const userResult = await new Promise((resolve, reject) => {
      db.query(insertUserQuery, [fullName, username, hashedPassword, email, 2], (err, result) => {
        if (err) {
          console.error('Error creating District Incharge user:', err.message);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const userID = userResult.insertId;

    await new Promise((resolve, reject) => {
      db.query(insertDistrictInchargeQuery, [fullName, district, userID], (err, result) => {
        if (err) {
          console.error('Error creating District Incharge:', err.message);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    res.status(201).json({ message: 'District Incharge registration successful' });
  } catch (error) {
    console.error('Unhandled error during District Incharge registration:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Updated City Incharges registration route
router.post('/register/cityincharge', async (req, res) => {
  const { inchargeName, password, emailAddress, city } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert City Incharge data into the Users and CityIncharges tables
    const insertUserQuery = 'INSERT INTO Users (FullName, UserName, PasswordHash, Email, RoleID) VALUES (?, ?, ?, ?, ?)';
    const insertCityInchargeQuery = 'INSERT INTO CityIncharges (InchargeName, CityID, UserID) VALUES (?, ?, ?)';

    const userResult = await new Promise((resolve, reject) => {
      db.query(insertUserQuery, [inchargeName, inchargeName, hashedPassword, emailAddress, 3], (err, result) => {
        if (err) {
          console.error('Error creating City Incharge user:', err.message);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const userID = userResult.insertId;

    await new Promise((resolve, reject) => {
      db.query(insertCityInchargeQuery, [inchargeName, city, userID], (err, result) => {
        if (err) {
          console.error('Error creating City Incharge:', err.message);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    res.status(201).json({ message: 'City Incharge registration successful' });
  } catch (error) {
    console.error('Unhandled error during City Incharge registration:', error.message);
    res.status(500).send('Internal Server Error');
  }
});



router.post('/register/subincharge', async (req, res) => {
  const { subInchargeName, cityIncharge, userName, password, emailAddress } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert Sub Incharge data into the Users and SubIncharges tables
    const insertUserQuery = 'INSERT INTO Users (FullName, UserName, PasswordHash, Email, RoleID) VALUES (?, ?, ?, ?, ?)';
    const insertSubInchargeQuery = 'INSERT INTO SubIncharges (SubInchargeName, InchargeID, UserID) VALUES (?, (SELECT InchargeID FROM CityIncharges WHERE InchargeName = ?), ?)';

    const userResult = await new Promise((resolve, reject) => {
      db.query(insertUserQuery, [subInchargeName, userName, hashedPassword, emailAddress, 4], (err, result) => {
        if (err) {
          console.error('Error creating Sub Incharge user:', err.message);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const userID = userResult.insertId;

    await new Promise((resolve, reject) => {
      db.query(insertSubInchargeQuery, [subInchargeName, cityIncharge, userID], (err, result) => {
        if (err) {
          console.error('Error creating Sub Incharge:', err.message);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    res.status(201).json({ message: 'Sub Incharge registration successful' });
  } catch (error) {
    console.error('Unhandled error during Sub Incharge registration:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/cityIncharges', (req, res) => {
    const query = 'SELECT * FROM CityIncharges';
  
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error fetching city incharges:', err.message);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(result);
      }
    });
});

router.get('/subIncharges', (req, res) => {
    const query = 'SELECT * FROM SubIncharges';

    db.query(query, (err, result) => {
        if (err) {
        console.error('Error fetching sub incharges:', err.message);
        res.status(500).send('Internal Server Error');
        } else {
        res.json(result);
        }
    });
});

module.exports = router;
