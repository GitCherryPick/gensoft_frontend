import { TASK_API_BASE_URL, defaultTaskHeaders } from "./task-api-config";

export async function getAllTaskCodes() {
  const response = await fetch(`${TASK_API_BASE_URL}/taskcode`, {
    headers: defaultTaskHeaders,
  });
  return response.json();
}

export async function createTask(taskData) {
  const response = await fetch(`${TASK_API_BASE_URL}/taskcode`, {
    method: 'POST',
    headers: defaultTaskHeaders,
    body: JSON.stringify(taskData),
  });
  return response.json();
}

export async function updateTask(taskId, taskData) {
  const response = await fetch(`${TASK_API_BASE_URL}/taskcode/${taskId}`, {
    method: 'PUT',
    headers: defaultTaskHeaders,
    body: JSON.stringify(taskData),
  });
  return response.json();
}

export async function deleteTask(taskId) {
  const response = await fetch(`${TASK_API_BASE_URL}/taskcode/${taskId}`, {
    method: 'DELETE',
    headers: defaultTaskHeaders,
  });
  return response.json();
}   

export async function getTaskReferenceCode(taskId) {
  const response = await fetch(`${TASK_API_BASE_URL}/taskcode/${taskId}`, {
    headers: defaultTaskHeaders,
  });
  return response.json();
}

export async function getTaskTemplateCode(taskId) {
  const response = await fetch(`${TASK_API_BASE_URL}/taskcode/${taskId}/template`, {
    headers: defaultTaskHeaders,
  });
  return response.json();
}

export async function compareTaskCode(taskId, studentCode) {
  const response = await fetch(`${TASK_API_BASE_URL}/codereplicated`, {
    method: 'POST',
    headers: defaultTaskHeaders,
    body: JSON.stringify({
      task_replicator_id: taskId,
      student_code: studentCode
    }),
  });
  return response.json();
}   

