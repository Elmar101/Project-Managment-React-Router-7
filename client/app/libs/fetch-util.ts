import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACK_API_URL || 'http://localhost:5000/api-v1';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axios.interceptors.request.use(
    (config) => {
        // Add any request interceptors here, e.g., adding auth tokens
        const token = localStorage.getItem('token'); // Example: get token from local storage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);  

axios.interceptors.response.use(
    (response) => {
        // Handle successful response
        return response;
    },
    (error) => {
        // Handle response error
        if (error.response && error.response.status === 401) {
            // Example: redirect to login on 401 Unauthorized
            // window.location.href = '/auth/sign-in';
            window.dispatchEvent(new Event('auth-unauthorized'));
        }
        return Promise.reject(error);
    }
);

export const postData = async <T>(url: string, data: unknown): Promise<T> => {
    const response = await api.post<T>(url, data);
    return response.data;
};

export const fetchData = async <T>(url: string): Promise<T> => {
    const response = await api.get<T>(url);
    return response.data;
};

export const updateData = async <T>(url: string, data: unknown): Promise<T> => {
    const response = await api.put<T>(url, data);
    return response.data;
};

export const deleteData = async <T>(url: string): Promise<T> => {
    const response = await api.delete<T>(url);
    return response.data;
};

// old version of fetchUtil
// This is kept for backward compatibility, but you can use the above functions directly.
export const fetchUtil = {
    get: async <T>(url: string): Promise<T> => {
        const response = await api.get<T>(url);
        return response.data;
    },
    post: async <T>(url: string, data: unknown): Promise<T> => {
        const response =  await api.post(url, data);
        return response.data;
    },
    put: async <T>(url: string, data: unknown): Promise<T> => {
        const response = await api.put(url, data);
        return response.data;
    },
    delete:  async <T>(url: string): Promise<T> => {
        const response = await api.delete<T>(url);
        return response.data;
    },
};