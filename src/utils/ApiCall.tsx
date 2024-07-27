import { deleteCookie } from "@/app/api/login/route";
import axios, { AxiosRequestConfig, Method } from "axios";
import { Router } from "next/router";
import Cookies from "universal-cookie";

interface ApiResponse<T> {
  data: any;
  status: number;
  statusText: string;
}

async function refreshAccessToken(): Promise<string | null> {
  const cookies = new Cookies();
  const refreshToken = cookies.get("refreshToken") ?? null;

  if (!refreshToken) return null;

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + `api/refresh`,
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const newToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;

    const expires = new Date();
    expires.setDate(expires.getDate() + 1);

    cookies.set("token", newToken, { path: "/", expires: expires });
    cookies.set("refreshToken", newRefreshToken, { path: "/", expires: expires });

    return newToken;
  } catch (error) {
    return null;
  }
}

async function apiCall<T>(
  method: Method,
  endpoint: string,
  router: Router, 
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const cookies = new Cookies();
  let token = cookies.get("token") ?? null;
  
  try {
    const response = await axios({
      method,
      url: process.env.NEXT_PUBLIC_BASE_URL + `api` + endpoint,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...config,
    });
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        token = await refreshAccessToken();
        if (token) {
          try {
            const response = await axios({
              method,
              url: process.env.NEXT_PUBLIC_BASE_URL + `api` + endpoint,
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
              ...config,
            });
            return {
              data: response.data,
              status: response.status,
              statusText: response.statusText,
            };
          } catch (retryError) {
            await deleteCookie("token");
            await deleteCookie("refreshToken");
            router.push("/");
            const errorMessage = (retryError as any).response?.data?.message || "An unknown error occurred";
            throw new Error(errorMessage);
          }
        } else {
          await deleteCookie("token");
          await deleteCookie("refreshToken");
          router.push("/");
        }
      }
      const errorMessage = error.response.data?.message || "An unknown error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export default apiCall;
