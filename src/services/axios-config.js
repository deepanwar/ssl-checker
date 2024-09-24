import axios from "axios";

const getBaseUrl = () => {
  const devUrl = import.meta.env.VITE_DEV_API_URL;
  const prodUrl = import.meta.env.VITE_PROD_API_URL;

  if (import.meta.env.VITE_ENV === "development") {
    if (!devUrl) {
      throw new Error("VITE_DEV_API_URL environment variable is not set");
    }
    return devUrl;
  }

  if (import.meta.env.VITE_ENV === "production") {
    if (!prodUrl) {
      throw new Error("VITE_PROD_API_URL environment variable is not set");
    }
    return prodUrl;
  }

  if (!devUrl) {
    throw new Error("VITE_DEV_API_URL environment variable is not set");
  }

  return devUrl;
};

export const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
});
