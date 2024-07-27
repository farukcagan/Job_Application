import axios from "axios";
import Cookies from "universal-cookie";

const cookies: any = new Cookies();

export async function getTokenAndSetCookie(
  email: any,
  password: any,
  url: string,
): Promise<any> {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + `api` + url,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      },
    );

    const token = response.data.accessToken;
    const refreshToken = response.data.refreshToken;

    console.log(token, refreshToken);
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);

    cookies.set("token", token, { path: "/", expires: expires });
    cookies.set("refreshToken", refreshToken, { path: "/", expires: expires });


    localStorage.setItem("email", response.data.user.email);
    localStorage.setItem("profileImage", response.data.user.profileImage);


    return response;
  } catch (error) {
    throw error;
  }
}

export function deleteCookie(name: string) {
  cookies.remove(name, { path: "/" });
}
