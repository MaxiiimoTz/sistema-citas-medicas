import { API_URL } from "./api";

export const loginRequest = async (data: {
  email: string;
  password: string;
}) => {

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Credenciales incorrectas");
  }

  return res.json();
};