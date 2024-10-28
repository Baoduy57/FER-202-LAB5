import axios from "axios";

const baseURL = "https://student-api-nestjs.onrender.com/students";

export const getAllStudents = async () => {
  try {
    const res = await axios.get(`${baseURL}`);
    return res.data.data;
  } catch (error) {
    console.log(error.toString());
  }
};

export const getStudentById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/${id}`);
    return res.data.data;
  } catch (error) {
    console.log(error.toString());
  }
};

export const createStudent = async (student) => {
  try {
    const res = await axios.post(`${baseURL}`, student);
    return res.data;
  } catch (error) {
    console.log(error.toString());
  }
};

export const updateStudent = async (id, student) => {
  try {
    const res = await axios.put(`${baseURL}/${id}`, student);
    return res.data;
  } catch (error) {
    console.log(error.toString());
  }
};

export const deleteStudent = async (id) => {
  try {
    await axios.delete(`${baseURL}/${id}`);
  } catch (error) {
    console.log(error.toString());
  }
};
