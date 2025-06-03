import { SANDBOX_API_BASE_URL, defaultContentHeaders } from './sandbox-api-config';

export async function getWarningsFromAI(codeData) {
  const response = await fetch(`${SANDBOX_API_BASE_URL}/sandbox/ai-feedback/lab`, {
    method: 'POST',
    headers: defaultContentHeaders,
    body: JSON.stringify(codeData),
  });
  return response.json();
}

export async function getAllSubmissions() {
  const response = await fetch(`${SANDBOX_API_BASE_URL}/sandbox/submissions`, {
    method: 'GET',
    headers: defaultContentHeaders,
  });
  return response.json();
}

export async function getAllTasksLabs() {
  const response = await fetch(`${SANDBOX_API_BASE_URL}/tasks`, {
    method: 'GET',
    headers: defaultContentHeaders,
  });
  return response.json();
}

export async function getSubmissionsByTaskId(taskId) {
  const response = await fetch(`${SANDBOX_API_BASE_URL}/sandbox/submissions/task/${taskId}`, {
    method: 'GET',
    headers: defaultContentHeaders,
  });
  return response.json();
}

export async function getTaskById(taskId) {
  const response = await fetch(`${SANDBOX_API_BASE_URL}/tasks/${taskId}`, {
    method: 'GET',
    headers: defaultContentHeaders,
  });
  return response.json();
}

export async function getSubmissionsByTaskAndUser(taskId, userId) {
  const response = await fetch(`${SANDBOX_API_BASE_URL}/sandbox/submissions/task/${taskId}/${userId}`, {
    method: 'GET',
    headers: defaultContentHeaders,
  });
  return response.json();
}

export async function endTask(taskId) {
  const response  = await fetch(`${SANDBOX_API_BASE_URL}/sandbox/task/${taskId}/close`, {
    method: 'PUT',
    headers: defaultContentHeaders,
  });
  return response.json();
}

export async function reviewSubmission(subId, submissionUpdate) {
  const response = await fetch(`${SANDBOX_API_BASE_URL}/sandbox/submissions/${subId}`, {
    method: 'PUT',
    headers: defaultContentHeaders,
    body: JSON.stringify(submissionUpdate)
  });
  return response.json()
}



