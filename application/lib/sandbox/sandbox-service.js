import { SANDBOX_API_BASE_URL, defaultContentHeaders } from './sandbox-api-config';

export async function getWarningsFromAI(codeData) {
  const response = await fetch(`${SANDBOX_API_BASE_URL}/sandbox/ai-feedback/lab`, {
    method: 'POST',
    headers: defaultContentHeaders,
    body: JSON.stringify(codeData),
  });
  return response.json();
}
