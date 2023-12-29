// Import necessary modules
const express = require('express'); // Import Express framework
const Knex = require('knex'); // Import Knex for database connection

const app = express(); // Create an Express application
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static('public')); // Serve static files from the 'public' directory

// PostgreSQL connection configuration using Knex
// Replace these placeholder values with your PostgreSQL connection details
const createTcpPool = async (config) => {
  const dbConfig = {
    client: 'pg', // PostgreSQL client
    connection: {
      host: process.env.INSTANCE_HOST, // PostgreSQL host
      port: process.env.DB_PORT, // PostgreSQL port
      user: process.env.DB_USER, // PostgreSQL user
      password: process.env.DB_PASS, // PostgreSQL password
      database: process.env.DB_NAME, // PostgreSQL database name
    },
    // ... Specify additional properties here for Knex configuration.
    ...config,
  };
  // Establish a connection to the database.
  return Knex(dbConfig);
};

let pool; // Initialize a variable to hold the database connection pool

createTcpPool({})
  .then((knexPool) => {
    pool = knexPool; // Assign the database connection pool
    console.log('Database connection established'); // Log successful database connection
  })
  .catch((err) => {
    console.error('Error establishing database connection:', err); // Log error if database connection fails
  });

// Serve login page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html'); // Serve the login HTML file
});

// Handle login form submission
app.post('/login', async (req, res) => {
  const username = req.body.username; // Get username from the request body
  const password = req.body.password; // Get password from the request body

  try {
    const result = await pool('users').where({ username, password }); // Query the 'users' table for provided credentials
    if (result.length > 0) {
      res.send('Hello, World!'); // Send a success message if credentials are valid
    } else {
      res.send('Invalid credentials'); // Send an error message if credentials are invalid
    }
  } catch (err) {
    console.error('Error executing query:', err); // Log error if query execution fails
    res.status(500).send('Error occurred'); // Send a server error response
  }
});

const PORT = process.env.PORT || 4000; // Set the server port

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Start the server and log its running status
});
