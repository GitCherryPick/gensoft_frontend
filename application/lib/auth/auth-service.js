"use client";
import toast from "react-hot-toast";

export async function loginUser({ username, password }) {
  try {
    const { API_BASE_URL } = require('../users/api-config');
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username, 
        password: password,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.detail || "Credenciales incorrectas.");
    }

    const data = await response.json();
    const { access_token, token_type, user_direct } = data;
    
    const userDataHeader = response.headers.get('X-User-Data');
    let userData = { username };
    
    if (userDataHeader) {
      try {
        userData = JSON.parse(userDataHeader);
      } catch (e) {
        console.error('Error al parsear datos del usuario:', e);
      }
    }

    let role = "";
    if(user_direct.role === "estudiante") {
      role = "student";
    } else if(user_direct.role == "docente") {
      role = "teacher";
    }

    const user = {
      id: userData.user_id || user_direct.user_id ||'1',
      name: userData.full_name || user_direct.full_name || 'Usuario',
      username: userData.username || user_direct.username || username,
      email: userData.email || user_direct.email || '',
      role,
      token: access_token,
      token_type,
    };

    // Guardar datos en localStorage
    localStorage.setItem("token", access_token);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
}

export async function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return true;
}

export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    const user = JSON.parse(userStr);
    return user;
  } catch (e) {
    console.error('Error al parsear datos del usuario desde localStorage:', e);
    return null;
  }
}

