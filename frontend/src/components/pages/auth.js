import axios from 'axios';

// Function to refresh the token
const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) {
      throw new Error('No refresh token available');
    }
    const response = await axios.post('http://127.0.0.1:8000/api/auth/token/refresh/', {
      refresh: refresh,
    });
    console.log('Token refreshed:', response.data.access);
    localStorage.setItem('access_token', response.data.access);
    return response.data.access;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    logout();
  }
};

// Function to log out
const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  window.location.href = '/login'; // Redirect to login page
};

// Set up Axios interceptor to automatically refresh tokens
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

const scheduleTokenRefresh = () => {
  // Refresh the token 5 minutes before it expires (25 minutes if ACCESS_TOKEN_LIFETIME is 30 minutes)
  setInterval(async () => {
    await refreshToken();
  }, 495 * 60 * 1000); // Adjust the interval to be slightly less than the token lifetime
};

scheduleTokenRefresh();

export { refreshToken, logout };