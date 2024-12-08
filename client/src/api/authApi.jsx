import axios from "axios";

// Set up base URL for the API
const BASE_URL = "http://localhost:5000/api";

// Sign-up API request
export const signUp = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("response", response.data);

    return response;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// Log-in API request (use POST instead of GET)
export const logIn = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("response", response.data);
    return response;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};
