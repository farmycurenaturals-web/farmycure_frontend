const rawApiUrl = (import.meta.env.VITE_API_URL || '').trim();
const API = rawApiUrl ? (rawApiUrl.endsWith('/') ? rawApiUrl.slice(0, -1) : rawApiUrl) : '';

if (import.meta.env.DEV) {
  console.log('API URL:', API);
}

const BASE_URL = API ? `${API}/api` : '/api';

const getAuthToken = () => localStorage.getItem('farmycure_token');
const getRefreshToken = () => localStorage.getItem('farmycure_refresh_token');
const setAccessToken = (token) => localStorage.setItem('farmycure_token', token);

const getSessionId = () => {
  let sessionId = localStorage.getItem('farmycure_session_id');
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem('farmycure_session_id', sessionId);
  }
  return sessionId;
};

const buildHeaders = (customHeaders = {}, body) => {
  const token = getAuthToken();
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  const headers = {
    'x-session-id': getSessionId(),
    ...customHeaders
  };
  if (!isFormData && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

const request = async (path, options = {}) => {
  let response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: buildHeaders(options.headers, options.body)
  });
  if (response.status === 401 && !String(path).includes('/auth/')) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        if (refreshData.accessToken) {
          setAccessToken(refreshData.accessToken);
          response = await fetch(`${BASE_URL}${path}`, {
            ...options,
            headers: buildHeaders(options.headers, options.body)
          });
        }
      }
    }
  }
  return handleResponse(response);
};

const requestWithMeta = async (path, options = {}) => {
  let response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: buildHeaders(options.headers, options.body)
  });
  if (response.status === 401 && !String(path).includes('/auth/')) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        if (refreshData.accessToken) {
          setAccessToken(refreshData.accessToken);
          response = await fetch(`${BASE_URL}${path}`, {
            ...options,
            headers: buildHeaders(options.headers, options.body)
          });
        }
      }
    }
  }
  const data = await handleResponse(response);
  return { data, headers: response.headers, status: response.status };
};

const requestBlob = async (path, options = {}) => {
  let response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: buildHeaders(options.headers, options.body)
  });
  if (response.status === 401 && !String(path).includes('/auth/')) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        if (refreshData.accessToken) {
          setAccessToken(refreshData.accessToken);
          response = await fetch(`${BASE_URL}${path}`, {
            ...options,
            headers: buildHeaders(options.headers, options.body)
          });
        }
      }
    }
  }
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Something went wrong');
  }
  const blob = await response.blob();
  return { blob, headers: response.headers };
};

export const api = {
  products: {
    list: (category) => request(`/products${category ? `?category=${encodeURIComponent(category)}` : ''}`),
    listPaged: async ({ page = 1, limit = 8, sortBy = 'createdAt', order = 'desc', category = null } = {}) => {
      const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sortBy: String(sortBy),
        order: String(order),
      });
      if (category) query.set('category', category);
      const { data, headers } = await requestWithMeta(`/products?${query.toString()}`);
      return {
        items: Array.isArray(data) ? data : [],
        pagination: {
          total: Number(headers.get('X-Total-Count') || 0),
          page: Number(headers.get('X-Page') || page),
          limit: Number(headers.get('X-Limit') || limit),
          totalPages: Number(headers.get('X-Total-Pages') || 1),
        },
      };
    },
    featured: (limit = 8) => request(`/products/featured?limit=${encodeURIComponent(limit)}`),
    getById: (id) => request(`/products/${id}`)
  },
  categories: {
    list: () => request('/categories')
  },
  cart: {
    get: () => request('/cart'),
    add: (payload) => request('/cart/add', { method: 'POST', body: JSON.stringify(payload) }),
    updateItem: (itemId, quantity) =>
      request(`/cart/item/${itemId}`, { method: 'PATCH', body: JSON.stringify({ quantity }) }),
    remove: (itemId) => request(`/cart/remove/${itemId}`, { method: 'DELETE' }),
    clear: () => request('/cart/clear', { method: 'DELETE' })
  },
  payments: {
    createOrder: (amount) =>
      request('/payments/create-order', { method: 'POST', body: JSON.stringify({ amount }) }),
    verifySignature: (payload) =>
      request('/payments/verify-signature', { method: 'POST', body: JSON.stringify(payload) })
  },
  orders: {
    create: (payload) => request('/orders', { method: 'POST', body: JSON.stringify(payload) }),
    getById: (id) => request(`/orders/${id}`),
    getInvoice: (id) => requestBlob(`/orders/${id}/invoice`)
  },
  auth: {
    register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
    login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
    googleLogin: (payload) => request('/auth/google-login', { method: 'POST', body: JSON.stringify(payload) }),
    googleTokenLogin: (payload) => request('/auth/google-token-login', { method: 'POST', body: JSON.stringify(payload) }),
    sendOtp: (payload) => request('/auth/send-otp', { method: 'POST', body: JSON.stringify(payload) }),
    verifyOtp: (payload) => request('/auth/verify-otp', { method: 'POST', body: JSON.stringify(payload) }),
    logout: (refreshToken) => request('/auth/logout', { method: 'POST', body: JSON.stringify({ refreshToken }) }),
    forgotPassword: (email) => request('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
    validateResetToken: (resetToken) =>
      request('/auth/validate-reset-token', { method: 'POST', body: JSON.stringify({ resetToken }) }),
    resetPassword: (resetToken, newPassword) =>
      request('/auth/reset-password', { method: 'POST', body: JSON.stringify({ resetToken, newPassword }) })
  },
  contact: {
    submit: (payload) => request('/contact', { method: 'POST', body: JSON.stringify(payload) }),
  },
  address: {
    list: () => request('/address'),
    save: (payload) => request('/address', { method: 'POST', body: JSON.stringify(payload) }),
    delete: (id) => request(`/address/${id}`, { method: 'DELETE' }),
    setDefault: (id) => request(`/address/${id}/default`, { method: 'PATCH' }),
  },
  user: {
    updateProfileImage: (formData) => request('/user/profile-image', { method: 'PUT', body: formData }),
    getOrders: () => request('/user/orders'),
    getAddresses: () => request('/user/addresses'),
    createAddress: (payload) => request('/user/address', { method: 'POST', body: JSON.stringify(payload) }),
    updateAddress: (id, payload) =>
      request(`/user/address/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
    deleteAddress: (id) => request(`/user/address/${id}`, { method: 'DELETE' }),
    updateProfile: (payload) => request('/user/profile', { method: 'PUT', body: JSON.stringify(payload) }),
    changePassword: (payload) => request('/user/password', { method: 'PUT', body: JSON.stringify(payload) })
  }
};
