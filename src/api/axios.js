import axios from "axios";

const axiosCre = axios.create({
  baseURL: "https://linktree-clone-api.oguzhanercelik.dev/",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export default axiosCre;
