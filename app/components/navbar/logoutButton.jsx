import React from "react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button onClick={signOut}>
      <div className="text-xl">logout </div>
    </button>
  );
};

export default LogoutButton;
