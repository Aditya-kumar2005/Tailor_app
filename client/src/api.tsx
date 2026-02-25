import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:5000", // backend REST API (root)
  headers: {
    "Content-Type": "application/json",
  },
});

// attach JWT token from localStorage to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const Services = {
    // customer routes
    getAllCustomers: () => api.get("/customers"),
    getCustomerById: (id:number) => api.get(`/customers/${id}`),
    createCustomer: (data:object) => api.post("/customers", data),
    updateCustomer: (id:number, data:object) => api.put(`/customers/${id}`, data),
    deleteCustomer: (id:number) => api.delete(`/customers/${id}`),

    // orders
    getAllOrders: () => api.get("/orders"),
    getOrderById: (id:number) => api.get(`/orders/${id}`),
    createOrder: (data:object) => api.post("/orders", data),
    updateOrder: (id:number, data:object) => api.put(`/orders/${id}`, data),
    deleteOrder: (id:number) => api.delete(`/orders/${id}`),

    // inventory
    getAllInventory: () => api.get("/inventory"),
    createInventory: (data:object) => api.post("/inventory", data),
    updateInventory: (id:number, data:object) => api.put(`/inventory/${id}`, data),
    deleteInventory: (id:number) => api.delete(`/inventory/${id}`),

    // payments
    getAllPayments: () => api.get("/payments"),
    createPayment: (data:object) => api.post("/payments", data),
    updatePayment: (id:number, data:object) => api.put(`/payments/${id}`, data),
    deletePayment: (id:number) => api.delete(`/payments/${id}`),

    // staff
    getAllStaff: () => api.get("/staff"),
    createStaff: (data:object) => api.post("/staff", data),
    updateStaff: (id:number, data:object) => api.put(`/staff/${id}`, data),
    deleteStaff: (id:number) => api.delete(`/staff/${id}`),

    // measurements
    getAllMeasurements: () => api.get("/measurements"),
    createMeasurement: (data:object) => api.post("/measurements", data),
    updateMeasurement: (id:number, data:object) => api.put(`/measurements/${id}`, data),
    deleteMeasurement: (id:number) => api.delete(`/measurements/${id}`),
  };



export default api;