import axios from 'axios';

const server = 'https://auth-service-9yb2-d6m25cizy-vivek-panchals-projects.vercel.app';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const api = axios.create({
  baseURL: server,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
    if (config.method === 'POST' || config.method === 'PUT' || config.method === 'DELETE') {
      const csrfToken = getCookie('csrfToken');
     if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
      }
    } 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
let isRefreshing = false;
let isRefreshingCSRFToken = false;
let failedQueue = [];
let csrfFailedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
        prom.reject(error);
    } else {
        prom.resolve(token);
    }
  });
  failedQueue = [];
};

const processCSRFQueue = (error, token = null) => {
  csrfFailedQueue.forEach(prom => {
    if (error) {
        prom.reject(error);
    } else {
        prom.resolve(token);
    }
  });
  csrfFailedQueue = [];
};


api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 403 && !originalRequest._retry) {

      const errorCode = error.response.data?.code || "";

      if (errorCode.startsWith("CSRF_")) {
        if (isRefreshingCSRFToken) {
          return new Promise(function(resolve, reject) {
              csrfFailedQueue.push({ resolve, reject });
          }).then(() => {
              return api(originalRequest);
          });
        } 
        originalRequest._retry = true;
        isRefreshingCSRFToken = true;

        try {
          await api.post('/api/v1/refresh-csrf');
          processCSRFQueue(null);
          return api(originalRequest);
        } catch (err) {
          processCSRFQueue(err);
          console.error("CSRF token refresh failed:", err);
          return Promise.reject(err);
        } finally {
          isRefreshingCSRFToken = false;
        }
      }
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
            failedQueue.push({ resolve, reject });
        }).then(() => {
            return api(originalRequest);
        });
      } 
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post('/api/v1/refresh-token');
        processQueue(null);
        return api(originalRequest);

      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;