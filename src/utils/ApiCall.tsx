import axios, { AxiosRequestConfig, Method } from "axios";
import Cookies from "universal-cookie";

interface ApiResponse<T> {
  data: any;
  status: number;
  statusText: string;
}

async function apiCall<T>(
  method: Method,
  endpoint: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const cookies = new Cookies();
  const token = cookies.get("token") ?? null;

  try {
    const response = await axios({
      method,
      url: process.env.NEXT_PUBLIC_BASE_URL + `api` + endpoint,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
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
      throw new Error(error.response.data.message || "An error occurred");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export default apiCall;
