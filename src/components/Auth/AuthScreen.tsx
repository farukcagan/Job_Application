"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import { AppDispatch, RootState } from "@/redux/store";
import { closeModal, openModal } from "@/redux/slices/modalSlice";
import { setUser } from "@/redux/slices/authSlice";
import { getTokenAndSetCookie } from "@/app/api/login/route";
import { useRouter } from "next/navigation";

const AuthModal: React.FC = () => {
  const { isOpen, type } = useSelector((state: RootState) => state.modal);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await getTokenAndSetCookie(
        formData.email,
        formData.password,
        `/${type}`
      );

      dispatch(
        setUser({
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );
      dispatch(closeModal());

      router.push("/job-list");
    } catch (err) {
      console.error(err);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: (err as any).response.data.message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
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
          {type === "register" ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
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
              {loading
                ? "Loading..."
                : type === "register"
                ? "Sign Up"
                : "Sign In"}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          {type === "register" ? (
            <>
              <span className="text-gray-700">Already have an account?  </span>
              <span
                onClick={() => dispatch(openModal("login"))}
                className="text-indigo-600 cursor-pointer"
              >
                Sign In
              </span>
            </>
          ) : (
            <>
              <span className="text-gray-700">Don't have an account? </span>
              <span
                onClick={() => dispatch(openModal("register"))}
                className="text-indigo-600 cursor-pointer"
              >
                Sign Up
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
