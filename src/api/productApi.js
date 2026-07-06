// src/api/productApi.js
const API_URL = "https://planto-backend-production.up.railway.app/api";

const getToken = () => localStorage.getItem("token");

export const productApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
  },

  getOne: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    return response.json();
  },

  create: async (formData) => {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`
        // ❌ DO NOT set Content-Type here
      },
      body: formData
    });
    return response.json();
  },

  update: async (id, formData) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`
        // ❌ DO NOT set Content-Type here
      },
      body: formData
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.json();
  }
};