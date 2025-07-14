import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth"; // change if deployed

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
  } catch (err) {
    throw err.response.data
  }
}