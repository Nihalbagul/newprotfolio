/**
 * API utility functions for making requests to the backend
 * 
 * In development, requests are proxied through Vite to avoid CORS issues.
 * In production, make sure the backend has proper CORS headers configured.
 */

const API_BASE_URL = import.meta.env.PROD
  ? 'https://cielbackendmasterdevelopmentfinal.vercel.app'
  : '/api'; // Use proxy in development

/**
 * Make a GET request to the API
 */
export const apiGet = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API GET Error:', error);
    throw error;
  }
};

/**
 * Make a POST request to the API
 */
export const apiPost = async (endpoint, data = {}, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API POST Error:', error);
    throw error;
  }
};

/**
 * Make a PUT request to the API
 */
export const apiPut = async (endpoint, data = {}, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API PUT Error:', error);
    throw error;
  }
};

/**
 * Make a DELETE request to the API
 */
export const apiDelete = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API DELETE Error:', error);
    throw error;
  }
};

/**
 * Example: Update FCM token
 * Usage: await updateFCMToken('your-fcm-token-here');
 */
export const updateFCMToken = async (fcmToken, userId = null) => {
  return apiPost('/user/fcm-token', {
    fcmToken,
    userId,
  });
};

