import axios, { AxiosError, AxiosInstance } from "axios";
const apAuth = "/auth";

let api: AxiosInstance;

export const configureAPI = (baseURL: string | undefined) => {
  api = axios.create({ 
    baseURL: "https://vendorfinder.onrender.com",
    withCredentials: true 
  });
};

export const signup = async (fullName: string, email: string, password: string) => {
  try {
    const response = await api.post(`${apAuth}/signup`, {
      full_name: fullName,
      email,
      password,
    });

    return response.data; 
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Signup Error:", error.response?.data || error.message);
      throw error.response?.data || "Signup failed";
    }
    throw "Something went wrong";
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post(`${apAuth}/login`, {
      email,
      password,
    });
    const data = response.data;
    localStorage.setItem("token", data.token)
    return data; 
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Login Error:", error.response?.data || error.message);
      throw error.response?.data || "Login failed";
    }
    throw "Something went wrong";
  }
};

export const googleAuth = async () => {
  try {
    // Redirect to backend Google auth endpoint
    window.location.href = "https://vendorfinder.onrender.com/auth/google";
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Google Auth Error:", error.response?.data || error.message);
      throw error.response?.data || "Google authentication failed";
    }
    throw "Something went wrong";
  }
};