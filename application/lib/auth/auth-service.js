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

    // Determinar rol según el correo
    let role = "student";
    if (username.includes("admin")) {
      role = "admin";
    } else if (username.includes("teacher") || username.includes("profesor")) {
      role = "teacher";
    }

    const user = {
      id: 1,
      name: "Usuario Demo",
      username,
      role,
      token: access_token,
      token_type,
    };

    localStorage.setItem("token", access_token);

    return user;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
}

export async function logoutUser() {
  localStorage.removeItem("token");
  return true;
}

export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;


  return {
    id: 1,
    name: "Usuario Demo",
    email: "demo@example.com",
    role: "student",
  };
}

/**
 * Obtiene todos los usuarios registrados en el sistema.
 * @returns {Promise<Array>} Un array de objetos con la información de los usuarios.
 * Cada usuario tiene la siguiente estructura:
 * {
 *   id: number,
 *   username: string,
 *   email: string,
 *   full_name: string,
 *   status: string,
 *   created_at: string,
 *   updated_at: string,
 *   last_login: string | null
 * }
 */
export async function getAllUsers() {
  try {
    const response = await fetch("http://localhost:8006/users/");
    if (!response.ok) {
      throw new Error("Error al obtener los usuarios");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
}
