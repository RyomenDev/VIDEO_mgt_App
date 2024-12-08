const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Path to the users.json file
const usersFilePath = path.join(__dirname, "../../users.json");

// Function to read users from the JSON file
const readUsersFromFile = () => {
  try {
    const data = fs.readFileSync(usersFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users from file", error);
    return [];
  }
};

// Function to handle user login
const loginUser = (req, res) => {
  const { email, password } = req.body;

  const users = readUsersFromFile();
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  if (user.password === password) {
    // console.log("Login successful");

    const token = jwt.sign(
      { email: user.email, name: user.name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: { email: user.email, name: user.name },
      token: token,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
};

module.exports = { loginUser };
