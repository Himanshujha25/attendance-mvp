import axios from "axios";
const BASE_URL = "http://localhost:5000/api/class"; 

export const createClass = async (data, token) => {
  const res = await axios.post(`${BASE_URL}/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getAllClasses = async (token) => {
  const res = await axios.get(`${BASE_URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteClassByCode = async (code, token) => {
  const res = await axios.delete(`${BASE_URL}/delete/${code}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
