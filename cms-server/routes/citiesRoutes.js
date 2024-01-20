// citiesRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/cities', (req, res) => {
    const query = 'SELECT * FROM Cities';
  
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error fetching cities:', err.message);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(result);
      }
    });
});

module.exports = router;
