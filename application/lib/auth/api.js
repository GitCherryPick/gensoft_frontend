const { API_BASE_URL } = require('../users/api-config');
const BASE_URL = API_BASE_URL;

const apiFetch = {
  post: async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Error en la solicitud');
    }

    return res.json();
  },
};

export default apiFetch;
