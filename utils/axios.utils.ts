import axios from "axios";

// Config
import CONSTANTS from "../config/constants";

const { DEFAULT_REQUEST_TIMEOUT } = CONSTANTS;
const { API_URL } = CONSTANTS;

const axiosDefault = axios.create({
  baseURL: API_URL,
  timeout: DEFAULT_REQUEST_TIMEOUT
});

// Report to logger middleware
const report = (error: any) => {
  return Promise.reject(error);
};

axiosDefault.interceptors.response.use(
  (response: any) => {
    // Do something with response data
    return response;
  },
  (error: any) => {
    // Do something with response error
    return report(error);
  }
);

export default axiosDefault;
