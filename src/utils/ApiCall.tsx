import { deleteCookie } from "@/app/api/login/route";
import axios, { AxiosRequestConfig, Method } from "axios";
import { Router } from "next/router";
import Cookies from "universal-cookie";

interface ApiResponse<T> {
  data: any;
  status: number;
  statusText: string;
}

async function apiCall<T>(
  method: Method,
  endpoint: string,
  router: Router, 
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const cookies = new Cookies();
  const token = cookies.get("token") ?? null;
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
        await deleteCookie("token");
        router.push("/");
      }
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export default apiCall;
