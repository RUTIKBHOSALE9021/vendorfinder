import axios, { AxiosError, AxiosInstance } from "axios";
const apAuth = "/auth";

let api: AxiosInstance;

export const configureAPI = (baseURL: string | undefined) => {
  api = axios.create({ baseURL: baseURL });
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