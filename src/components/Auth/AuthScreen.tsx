"use client";

import { closeModal, openModal } from "@/redux/slices/modalSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import apiCall from "@/utils/ApiCall";
import { setUser } from "@/redux/slices/authSlice";

const AuthModal: React.FC = () => {
  const { isOpen, type } = useSelector((state: RootState) => state.modal);
  const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const REGISTER_ENDPOINT = "/register";
  const LOGIN_ENDPOINT = "/login";

  const registerUser = async (userData: { email: string; password: string }) => {
    const response = await apiCall("POST", REGISTER_ENDPOINT, { data: userData });  
    return response;
  };

  const loginUser = async (userData: { email: string; password: string }) => {
    const response = await apiCall("POST", LOGIN_ENDPOINT, { data: userData });
    return response;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userData = { email, password };
      const response = type === "register" ? await registerUser(userData) : await loginUser(userData);
      dispatch(setUser({
        user: response.data.user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      }));
      dispatch(closeModal());     
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleClose}
      ></div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-2 p-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold mb-4">
          {type === "register" ? "Kayıt Ol" : "Giriş Yap"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-posta
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Şifre
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 w-full mt-1 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? "Yükleniyor..." : (type === "register" ? "Kayıt Ol" : "Giriş Yap")}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-6 text-center">
          {type === "register" ? (
            <>
              <span className="text-gray-700">
                Zaten bir hesabınız var mı?{" "}
              </span>
              <span
                onClick={() => dispatch(openModal("login"))}
                className="text-indigo-600 cursor-pointer"
              >
                Giriş Yap
              </span>
            </>
          ) : (
            <>
              <span className="text-gray-700">Hesabınız yok mu? </span>
              <span
                onClick={() => dispatch(openModal("register"))}
                className="text-indigo-600 cursor-pointer"
              >
                Kayıt Ol
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
