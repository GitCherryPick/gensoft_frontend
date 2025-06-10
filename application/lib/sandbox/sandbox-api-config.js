const SANDBOX_API_BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8010';

const defaultContentHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export { SANDBOX_API_BASE_URL, defaultContentHeaders };