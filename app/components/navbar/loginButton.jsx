import React from "react";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <button onClick={signIn}>
      <span className="text-lg">Login</span>
    </button>
  );
};

export default LoginButton;
