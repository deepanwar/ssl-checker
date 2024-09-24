import { axiosInstance as axios } from "./axios-config";

export const checkSsl = async (domain) => {
  const response = await axios.post(`/check-ssl`, { domain });
  return response.data;
};
