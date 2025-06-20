const TASK_API_BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8010';

const defaultTaskHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export { TASK_API_BASE_URL, defaultTaskHeaders };