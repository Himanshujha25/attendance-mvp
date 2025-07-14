// src/api/student.js
import axios from "axios";

const BASE = "https://attendance-mvp-1.onrender.com/api";

export const joinClass = async (code, token) => {
  const res = await axios.post(`${BASE}/enroll/join`, { code }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getStudentClasses = async (token) => {
  const res = await axios.get(`${BASE}/enroll/classes`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const markAttendance = async (code, token) => {
  const res = await axios.post(`${BASE}/attendance/verify`, { code }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const checkAttendance = async (classId, token) => {
const res = await axios.get(`${BASE}/attendance/check/${classId}`, {
  headers: { Authorization: `Bearer ${token}` },
});
  return res.data.marked;
};
