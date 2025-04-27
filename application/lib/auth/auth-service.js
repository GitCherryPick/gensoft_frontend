"use client"
import toast from "react-hot-toast"

const delay = () => new Promise((resolve) => setTimeout(resolve, 500))

export async function loginUser(credentials) {
  try {
    await delay()

    if (Math.random() < 0.33) {
      throw new Error("Error al iniciar sesion")
    }

    let role = "student"

    if (credentials.email.includes("admin")) {
      role = "admin"
    } else if (credentials.email.includes("teacher") || credentials.email.includes("profesor")) {
      role = "teacher"
    }

    const user = {
      id: "1",
      name: "Usuario Demo",
      email: credentials.email,
      role: role,
    }

    return user
  } catch (error) {
    toast.error(error.message)
    throw error
  }
}

export async function logoutUser() {
  await delay()
  return true
}

export async function getCurrentUser() {
  return null
}
