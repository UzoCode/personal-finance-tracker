import api from "../lib/api";

export async function register(data: { email: string; password: string }) {
  const res = await api.post("/auth/register", data);
  return res.data;
}

export async function login(data: { email: string; password: string }) {
  const res = await api.post("/auth/login", data);
  return res.data;
}

export async function getProfile() {
  const res = await api.get("/auth/profile");
  return res.data;
}

export async function logout() {
  const res = await api.post("/auth/logout");
  return res.data;
}
