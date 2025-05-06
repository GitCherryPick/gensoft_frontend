"use client";
import toast from "react-hot-toast";

export async function loginUser({ email, password }) {
  try {
    const response = await fetch("http://localhost:8006/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email, 
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
    if (email.includes("admin")) {
      role = "admin";
    } else if (email.includes("teacher") || email.includes("profesor")) {
      role = "teacher";
    }

    const user = {
      id: 1,
      name: "Usuario Demo",
      email,
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
    email: "usuario@demo.com",
    role: "student",
  };
}
