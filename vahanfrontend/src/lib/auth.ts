import axios from "axios";

const serverurl = "http://localhost:3000";

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${serverurl}/api/auth/register`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return "error in registering user";
  }
};
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${serverurl}/api/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return "error in logging in user";
  }
};

export const verify = async (token: string) => {
  try {
    const response = await axios.post(`${serverurl}/api/auth/verify`, {
      token,
    });
    return response.data;
  } catch (error) {
    return { message: "error in verifying token" };
  }
};
