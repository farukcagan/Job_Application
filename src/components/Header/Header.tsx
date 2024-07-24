"use client"
import { openModal } from "@/redux/slices/modalSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import React from "react";
import { useDispatch } from 'react-redux';

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const openRegisterModal = () => {
    dispatch(openModal("register"));
  };

  const openLoginModal = () => {
    dispatch(openModal("login"));
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white text-black shadow-lg z-50">
      <div className="text-xl font-bold ml-4">
        <a href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={70}
            className="hover:opacity-75 transition-opacity duration-300"
          />
        </a>
      </div>
      <div className="mr-4">
        <button onClick={openLoginModal}>
          <span className="mr-4 text-black hover:text-gray-600">
            Login
          </span>{" "}
        </button>
        <button onClick={openRegisterModal}>
          <span  className="text-black hover:text-gray-600">
            Sign Up
          </span>{" "}
        </button>
      </div>
    </header>
  );
};

export default Header;
