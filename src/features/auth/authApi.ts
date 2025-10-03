import axios from 'axios';

const API_URL = 'http://localhost:7111'; // AuthServer

export const registerUser = async (data: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};
