import { useAuth } from "../context/auth-context";
import { logout } from "../context/auth-provider";
import { urlString } from "../utils";

const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string;
  data?: { [key: string]: unknown };
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET" && data) {
    endpoint += `?${urlString(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return globalThis
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await logout();
        globalThis.location.reload();
        return Promise.reject({ message: "请重新登陆" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      return Promise.reject(data);
    });
};
export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
