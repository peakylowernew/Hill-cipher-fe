import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_URL;
// URL API của backend
const API_URL = API_BASE_URL; // Điều chỉnh URL theo môi trường của bạn

// Đăng ký người dùng
export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Trả về lỗi nếu có
  }
};

// Đăng nhập người dùng
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
    
    return response.data; // Trả về dữ liệu thành công (token)
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Trả về lỗi nếu có
  }
};
