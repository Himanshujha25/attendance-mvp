import axios from "axios";

const BASE_URL = "https://attendance-mvp-1.onrender.com/api/auth"; // change if deployed

export const registerUser = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/register`, formData);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const loginUser=async(formData)=>{
  try {
    const res=await axios.post(`${BASE_URL}/login`,formData)
    return res.data;
  } catch (error) {
    throw err.response.data
  }
}