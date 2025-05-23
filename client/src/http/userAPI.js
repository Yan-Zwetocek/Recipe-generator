import { jwtDecode } from "jwt-decode";
import { $host, $authHost } from "./index";

export const registration = async (email, password, username) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    username,
    role: "ADMIN",
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.accessToken);
};
export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.accessToken);
};
export const check = async () => {
  const {data} = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwtDecode(data.accessToken);
};
