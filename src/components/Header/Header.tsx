"use client";

import { deleteCookie } from "@/app/api/login/route";
import { useAuth } from "@/hooks/useAuth";
import { clearUser } from "@/redux/slices/authSlice";
import { openModal } from "@/redux/slices/modalSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    setProfileImage(localStorage.getItem("profileImage"));
  }, []);

  const openRegisterModal = () => {
    dispatch(openModal("register"));
  };

  const openLoginModal = () => {
    dispatch(openModal("login"));
  };

  const handleLogoutClick = async () => {
    await deleteCookie("token");
    dispatch(clearUser());
    localStorage.clear();
    router.push("/");
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
      {!auth ? (
        <div className="mr-4">
          <button onClick={openLoginModal}>
            <span className="mr-4 text-black hover:text-gray-600">Login</span>
          </button>
          <button onClick={openRegisterModal}>
            <span className="text-black hover:text-gray-600">Sign Up</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="mr-4">
            <button>
              <span className="mr-4 text-blue-500">Jobs List</span>
            </button>
            <button onClick={handleLogoutClick}>
              <span className="text-black hover:text-gray-600">Logout</span>
            </button>
            <span className="ml-4">{email?.replace(/"/g, "")}</span>
          </div>
          <div className="ml-4">
            <Image
              src={profileImage?.replace(/"/g, "") || ""} 
              alt="Profile Picture"
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
