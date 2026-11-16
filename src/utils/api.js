const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Helper for fetch with timeout and error parsing
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('gemly_auth_token')
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const config = {
    ...options,
    headers,
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      const error = new Error(data.message || `Request failed with status ${response.status}`)
      error.status = response.status
      error.data = data
      throw error
    }

    return data
  } catch (err) {
    console.warn(`[GEMLY API] ${endpoint} error:`, err.message)
    throw err
  }
}

export const api = {
  // Authentication
  auth: {
    login: (credentials) =>
      request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    register: (userData) =>
      request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    getMe: () => request('/auth/me'),
    updateProfile: (profileData) =>
      request('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      }),
    changePassword: (passwords) =>
      request('/auth/change-password', {
        method: 'PUT',
        body: JSON.stringify(passwords),
      }),
  },

  // Products
  products: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString()
      return request(`/products${query ? `?${query}` : ''}`)
    },
    getBySlug: (slug) => request(`/products/${slug}`),
  },

  // Customer Reviews
  reviews: {
    getBySlug: (slug) => request(`/reviews/product/${slug}`),
    create: (slug, reviewData) =>
      request(`/reviews/product/${slug}`, {
        method: 'POST',
        body: JSON.stringify(reviewData),
      }),
    voteHelpful: (id) =>
      request(`/reviews/${id}/helpful`, {
        method: 'POST',
      }),
  },

  // Orders
  orders: {
    create: (orderData) =>
      request('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      }),
    getMyOrders: () => request('/orders/my-orders'),
    getById: (id) => request(`/orders/${id}`),
  },

  // Custom 3D Configurations
  customDesigns: {
    save: (designData) =>
      request('/custom-designs', {
        method: 'POST',
        body: JSON.stringify(designData),
      }),
    getMyDesigns: () => request('/custom-designs/my-designs'),
    delete: (id) =>
      request(`/custom-designs/${id}`, {
        method: 'DELETE',
      }),
  },

  // General Inquiries & Newsletter
  general: {
    subscribeNewsletter: (email) =>
      request('/newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
    sendContact: (inquiryData) =>
      request('/contact', {
        method: 'POST',
        body: JSON.stringify(inquiryData),
      }),
  },

  // Atelier Admin Portal APIs
  admin: {
    getOverview: () => request('/admin/overview?demo=admin'),
    getProducts: (params = {}) => {
      const q = new URLSearchParams(params).toString()
      return request(`/admin/products?demo=admin${q ? `&${q}` : ''}`)
    },
    createProduct: (data) =>
      request('/admin/products', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateProduct: (id, data) =>
      request(`/admin/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    deleteProduct: (id) =>
      request(`/admin/products/${id}`, {
        method: 'DELETE',
      }),
    getOrders: (params = {}) => {
      const q = new URLSearchParams(params).toString()
      return request(`/admin/orders?demo=admin${q ? `&${q}` : ''}`)
    },
    updateOrderStatus: (id, statusData) =>
      request(`/admin/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify(statusData),
      }),
    deleteOrder: (id) =>
      request(`/admin/orders/${id}`, {
        method: 'DELETE',
      }),
    getReviews: () => request('/admin/reviews?demo=admin'),
    verifyReview: (id) =>
      request(`/admin/reviews/${id}/verify`, {
        method: 'PUT',
      }),
    deleteReview: (id) =>
      request(`/admin/reviews/${id}`, {
        method: 'DELETE',
      }),
    getInquiries: () => request('/admin/inquiries?demo=admin'),
    updateInquiryStatus: (id, status) =>
      request(`/admin/inquiries/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      }),
    deleteInquiry: (id) =>
      request(`/admin/inquiries/${id}`, {
        method: 'DELETE',
      }),
    getSubscribers: () => request('/admin/subscribers?demo=admin'),
    deleteSubscriber: (id) =>
      request(`/admin/subscribers/${id}`, {
        method: 'DELETE',
      }),
    getUsers: () => request('/admin/users?demo=admin'),
  },
}
