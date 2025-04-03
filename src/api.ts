import axios, { AxiosError, AxiosInstance } from "axios";
import { addVendorToFavoriteReq, VendorRequest } from "./types/apiReq";
const apAuth = "/auth";
const apVendor = "/vendors";

let api: AxiosInstance;

export const configureAPI = (baseURL: string | undefined) => {
  api = axios.create({ 
    baseURL: "https://vendorfinder.onrender.com",
    withCredentials: true 
  });
};

/****************** Auth api *******************************/
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
/************** Vendor api ****************/
export const createVendor = async (req:VendorRequest)=>{
  try {
    const response = await api.post(`${apVendor}/create`, req);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Create Vendor Error:", error.response?.data || error.message);
      throw error.response?.data || "Vendor creation failed";
    }
    throw "Something went wrong";
  }
}
export const getAllVendors = async (user_id:string)=>{
  try {
    const response = await api.get(`${apVendor}/getall/${user_id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Get Vendors Error:", error.response?.data || error.message);
      throw error.response?.data || "Failed to fetch vendors";
    }
    throw "Something went wrong";
  }
}
export const getVendorById = async (id:string)=>{
  try {
    const response = await api.get(`${apVendor}/getbyid/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Get Vendor Error:", error.response?.data || error.message);
      throw error.response?.data || "Failed to fetch vendor";
    }
    throw "Something went wrong";
  }
}

export const addVendorToFavorite = async (req:addVendorToFavoriteReq)=>{
  try {
    const response = await api.post(`${apVendor}/addtofavorite`, req); 

    return response.data;
  } catch (error) {
    console.error("Error adding vendor to favorites:", error);
    
    throw error.response?.data || { message: "Something went wrong" };
  }
};
export const getFavoriteVendor = async (user_id:string)=>{
  try {
    const response = await api.get(`${apVendor}/getfavorite/${user_id}`); 
    return response.data;
  } catch (error) {
    console.error("Error while getting favorites vendor", error);
    
    throw error.response?.data || { message: "Something went wrong" };
  }
};
export const removeVendorToFavorite = async (req: addVendorToFavoriteReq) => {
  try {
    const response = await api.delete(`${apVendor}/removefromfavorite`, {
      data: req,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting vendor from favorites:", error);
    
    throw error.response?.data || { message: "Something went wrong" };
  }
};

