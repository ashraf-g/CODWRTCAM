import axios from "axios";

const URL = "http://localhost:5000/api/v1";
// const URL = "https://pos-server-wux1.onrender.com/api/v1";

// Create an axios instance
const makeRequest = axios.create({
  baseURL: URL,
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
makeRequest.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    // const token = localStorage.getItem("token");

    // If the token exists, add it to the request headers
    // if (token) {
    //   config.headers["Authorization"] = "Bearer " + token;
    //   config.headers["authtoken"] = token;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default makeRequest;
