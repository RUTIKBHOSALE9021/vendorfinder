
import axios from "axios";
import { VendorRequest, addVendorToFavoriteReq } from "@/types/apiReq";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set up request interceptor to add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const configureAPI = (baseURL: string) => {
  api.defaults.baseURL = baseURL;
};

export const login = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Invalid credentials");
  }
};

export const googleAuth = async () => {
  window.location.href = `${api.defaults.baseURL}/auth/google`;
};

export const createVendor = async (vendorData: VendorRequest) => {
  try {
    const response = await api.post("/vendors", vendorData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to create vendor");
  }
};

export const addVendorToFavorite = async (data: addVendorToFavoriteReq) => {
  try {
    const response = await api.post("/vendors/favorite", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to add to favorites");
  }
};

export default api;
