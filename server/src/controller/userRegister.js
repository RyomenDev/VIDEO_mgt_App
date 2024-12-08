const fs = require("fs");
const path = require("path");

// Mock database file (where users are stored)
const DATABASE_FILE = path.join(__dirname, "../../users.json");

// Helper function to check if the database file exists
const checkDatabaseFile = () => {
  if (!fs.existsSync(DATABASE_FILE)) {
    // If the file doesn't exist, create it with an empty array
    fs.writeFileSync(DATABASE_FILE, JSON.stringify([], null, 2));
  }
};

// Helper function to read from the mock database (users.json)
const readDatabase = () => {
  try {
    // Ensure the database file exists before reading
    checkDatabaseFile();

    const data = fs.readFileSync(DATABASE_FILE);
    return JSON.parse(data); // Return parsed JSON data (array of users)
  } catch (error) {
    // Return an empty array if there's an error reading the file
    console.error("Error reading database:", error);
    return [];
  }
};

// Helper function to write to the mock database (users.json)
const writeDatabase = (data) => {
  try {
    fs.writeFileSync(DATABASE_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to database:", error);
  }
};

// Function to handle user registration
const registerUser = (req, res) => {
  console.log("Registering user...");
  const { name, email, password } = req.body;

  // Basic validation (check if required fields are present)
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields (name, email, password) are required.",
    });
  }

  // Read existing users from the mock database (users.json)
  const users = readDatabase();

  // Check if the email already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Email is already registered.",
    });
  }

  // Create a new user object after validating email
  const newUser = { name, email, password };

  // Add the new user to the users array
  users.push(newUser);

  // Save the updated users array back to the JSON file (users.json)
  writeDatabase(users);

  res.status(201).json({
    success: true,
    message: "User registered successfully.",
    user: { name, email },
  });
};

module.exports = { registerUser };
