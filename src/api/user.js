// src/api/user.js
import axios from "axios";

export const updateUserProfile = async (data, token) => {
   const BASE_URL = "http://localhost:5000/api/auth"; // change if deployed
                         
  const res = await axios.put(`${BASE_URL}/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
