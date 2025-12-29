import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;

// API endpoints
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getCurrentUser: () => api.get('/auth/me'),
};

export const productsAPI = {
    getAll: (params) => api.get('/products', { params }),
    getById: (id) => api.get(`/products/${id}`),
    getFeatured: () => api.get('/products/featured'),
    search: (keyword) => api.get('/products/search', { params: { keyword } }),
};

export const ordersAPI = {
    create: (data) => api.post('/orders', data),
    getAll: (params) => api.get('/orders', { params }),
    getById: (id) => api.get(`/orders/${id}`),
    cancel: (id) => api.post(`/orders/${id}/cancel`),
};

export const sellerAPI = {
    getProducts: (params) => api.get('/seller/products', { params }),
    createProduct: (data) => api.post('/seller/products', data),
    updateProduct: (id, data) => api.put(`/seller/products/${id}`, data),
    deleteProduct: (id) => api.delete(`/seller/products/${id}`),
    getOrders: (params) => api.get('/seller/orders', { params }),
    updateOrderStatus: (id, status) => api.patch(`/seller/orders/${id}/status`, { status }),
};

export const adminAPI = {
    getUsers: (params) => api.get('/admin/users', { params }),
    getPendingSellers: () => api.get('/admin/sellers/pending'),
    approveSeller: (id) => api.patch(`/admin/sellers/${id}/approve`),
    getOrders: (params) => api.get('/admin/orders', { params }),
    getAnalytics: () => api.get('/admin/analytics/revenue'),
};

export const deliveryAPI = {
    getAssignedDeliveries: () => api.get('/delivery/assigned'),
    updateDeliveryStatus: (id, status) => api.patch(`/delivery/${id}/status`, { status }),
    updateLocation: (id, location) => api.post(`/delivery/${id}/location`, location),
    toggleAvailability: (available) => api.patch('/delivery/availability', { available }),
};
