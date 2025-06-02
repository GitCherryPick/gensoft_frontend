"use client";
import toast from "react-hot-toast";

export async function loginUser({ username, password }) {
  try {
    const response = await fetch("http://localhost:8006/auth/login", {
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
    const { access_token, token_type } = data;

    const userDataHeader = response.headers.get('X-User-Data');
    let userData = { username };
    
    if (userDataHeader) {
      try {
        userData = JSON.parse(userDataHeader);
      } catch (e) {
        console.error('Error al parsear datos del usuario:', e);
      }
    }

    // Determinar rol según el correo
    let role = "student";
    if (username.includes("admin")) {
      role = "admin";
    } else if (username.includes("teacher") || username.includes("profesor")) {
      role = "teacher";
    }

    const user = {
      id: data.user_id || '1',
      name: data.full_name || 'Usuario',
      username: data.username,
      full_name: data.full_name,
      bio: data.bio || '',
      email: data.email || '',
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

