import { API_BASE_URL, defaultHeaders } from "../api-config";

export async function getUserById(userId) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'GET',
    headers: defaultHeaders,
  });
  return response.json();
}

export async function postFeedbackAI(dataTask) {
  const res = await fetch(`${API_BASE_URL}/feedback/exercise`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(dataTask),
  });
  return res.json();
}

export async function getFeedbackAI(feedbackId) {
  const res = await fetch(`${API_BASE_URL}/feedback/exercise/${feedbackId}`, {
    method: 'GET',
    headers: defaultHeaders,
  });
  return res.json();
}

export async function updateFeedbackAI(feedbackId, data) {
  const res = await fetch(`${API_BASE_URL}/feedback/exercise/${feedbackId}`, {
    method: 'PUT',
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });
  return res.json();
}