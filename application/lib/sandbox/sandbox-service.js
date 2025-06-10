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

export async function getScore(taskId, userId) {
  const response = await fetch(`${SANDBOX_API_BASE_URL}/tasks/getScore?task_id=${taskId}&user_id=${userId}`, {
    method: "GET",
    headers: defaultContentHeaders
  });
  return response.json()
}

export async function sendCodeSolution(codeData) {
  const res = await fetch(`${SANDBOX_API_BASE_URL}/enviar`, {
    method: "POST",
    headers: defaultContentHeaders,
    body: JSON.stringify(codeData)
  });
  return res.json()
}

export async function feedbackForEachTest(codeData) {
  const response = await fetch(`${SANDBOX_API_BASE_URL}/sandbox/ai-feedback/lab-test`, {
    method: "POST",
    headers: defaultContentHeaders,
    body: JSON.stringify(codeData)
  });
  return response.json()
}

export async function executeCodeSandbox(code) {
  const response = await fetch(`${SANDBOX_API_BASE_URL}/sandbox/execute`, {
    method: "POST",
    headers: defaultContentHeaders,
    body: JSON.stringify(code),
  });
  return response.json()
}

export async function createExerciseWithDetailsLab(data) {
  const response = await fetch(`${SANDBOX_API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: defaultContentHeaders,
    body: JSON.stringify(data),
  });
  return response.json();
}