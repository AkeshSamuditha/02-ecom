"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";

import { RiAccountPinBoxLine } from "react-icons/ri";

export const LoginButton = () => {
  return (
    <button onClick={signIn}>
      <span className="text-lg">Login</span>
    </button>
  );
};

export const MiniLoginButton = () => {
  return (
    <button onClick={signIn}>
      {
        <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
          <RiAccountPinBoxLine className="me-3 text-lg" /> Login
        </span>
      }
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button onClick={signOut}>
      <div className="text-xl">logout </div>
    </button>
  );
};

export const MiniLogoutButton = () => {
  return (
    <button onClick={signOut}>
      {
        <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
          <RiAccountPinBoxLine className="me-3 text-lg" /> Logout
        </span>
      }
    </button>
  );
};
