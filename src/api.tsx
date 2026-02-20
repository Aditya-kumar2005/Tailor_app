// ...existing code...
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // backend REST API (root)
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
// ...existing code...