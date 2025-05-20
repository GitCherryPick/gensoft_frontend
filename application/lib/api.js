const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8006';

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
