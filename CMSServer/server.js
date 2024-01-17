// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'CMSApp',
});

// Register a new user
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username and email are unique
    const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
    const existingUsers = await queryAsync(checkUserQuery, [username, email]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Username or email already in use' });
    }

    // Set the role based on the email condition
    const role = email === 'admin@gmail.com' ? 'admin' : 'user';

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserQuery = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
    await queryAsync(createUserQuery, [username, email, hashedPassword, role]);

    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});


// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Retrieve user based on email
    const getUserQuery = 'SELECT * FROM users WHERE email = ?';
    const users = await queryAsync(getUserQuery, [email]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Compare the entered password with the hashed password from the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ userId: user.user_id, role: user.role });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Logout (not a real logout in this example)
app.post('/api/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

app.put('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const { username, email, role } = req.body;

  try {
    // Update user details in the database, including role
    const updateUserQuery = 'UPDATE users SET username = ?, email = ?, role = ? WHERE user_id = ?';
    await queryAsync(updateUserQuery, [username, email, role, userId]);

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete user
app.delete('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Delete user from the database
    const deleteUserQuery = 'DELETE FROM users WHERE user_id = ?';
    await queryAsync(deleteUserQuery, [userId]);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
});

// Get all users (only accessible to admin)
app.get('/api/users', async (req, res) => {
  try {
    const getUsersQuery = 'SELECT * FROM users';
    const users = await queryAsync(getUsersQuery);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Utility function to promisify the query
function queryAsync(sql, values) {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
