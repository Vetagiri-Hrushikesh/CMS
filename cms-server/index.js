const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const districtsRoutes = require('./routes/districtsRoutes');
const citiesRoutes = require('./routes/citiesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const inchargesRoutes = require('./routes/inchargesRoutes');
const mlaRoutes = require('./routes/mlaRoutes');
const mpRoutes = require('./routes/mpRoutes');
const memRoutes = require('./routes/memRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Use modularized routes with base path
app.use('/api/districts', districtsRoutes);
app.use('/api/cities', citiesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/incharges', inchargesRoutes);
app.use('/api/mla', mlaRoutes);
app.use('/api/mp', mpRoutes);
app.use('/api/members', memRoutes);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
