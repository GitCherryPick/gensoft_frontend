const API_BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8010';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export { API_BASE_URL, defaultHeaders };