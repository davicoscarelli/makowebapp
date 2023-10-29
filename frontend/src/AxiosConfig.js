import axios from 'axios';

const setAuthorizationHeader = () => {
    const token = localStorage.getItem('token');
    console.log('Token before request:', token);  // Logging token
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

// Set the default base URL
//axios.defaults.baseURL = 'http://localhost:5000';

setAuthorizationHeader();

axios.interceptors.response.use(
    response => response,
    error => {
        console.log('Error response received:', error.response);  // Logging the error response
        if (error.response && error.response.status === 401) {
            console.warn('401 received. Handling token and redirecting.');  // Logging 401 handling
            
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            window.location = '/login';
        }
        return Promise.reject(error);
    }
);

axios.interceptors.request.use(
    config => {
        setAuthorizationHeader();
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;
