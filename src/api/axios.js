import axios from "axios";

const axiosCre = axios.create({
  baseURL: "http://78.135.83.71:4000",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export default axiosCre;
