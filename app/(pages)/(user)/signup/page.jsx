"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Link from "next/link";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { notify } from "@app/utils/notify";
import { notifyTypes } from "@app/utils/actiontypes";

const SignUpPage = () => {
  const router = useRouter();
  const [err, setError] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const isDisabled =
    signingUp ||
    !user.username ||
    !user.email ||
    !user.password ||
    !confirmPassword;

  const signInHandler = async (event) => {
    event.preventDefault();
    setSigningUp(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        setSigningUp(false);
        notify(notifyTypes.ERROR, "Check your credentials");
      }

      notify(notifyTypes.SUCCESS, "Account Created Successfully");
      router.push("/login", {
        sucess: "Account Created Successfully",
      });

    } catch (error) {
      setError(true);
      notify(notifyTypes.ERROR, "Something went wrong");
    } finally {
      setSigningUp(false);
    }
  };

  return (
    <div className="flex items-center content-center  justify-center w-full px-5">
      <section className="px-10 py-10 rounded-md shadow-md bg-white/[0.7] flex flex-col gap-6 w-full max-w-lg">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-4xl font-bold mb-3">Sign up</h1>
          <form
            action=""
            className="flex flex-col gap-3 py-3 "
            onSubmit={signInHandler}
          >
            <label className="flex flex-col">
              <input
                type="text"
                name="firstName"
                required
                placeholder="First Name*"
                className="border rounded-md p-1.5 shadow-sm"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </label>
            <label className="flex flex-col">
              <input
                type="text"
                required
                name="lastName"
                placeholder="Last Name*"
                className="border rounded-md p-1.5 shadow-sm"
                value={user.username}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </label>
            <label className="flex flex-col">
              <input
                type="email"
                name="email"
                required
                placeholder="Email*"
                className="border rounded-md p-1.5 shadow-sm"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </label>
            <label className="flex flex-col relative">
              <input
                required
                name="password"
                placeholder="Password*"
                type={showPassword.password ? "text" : "password"}
                className="border rounded-md p-1.5 shadow-sm"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <span
                className="absolute right-2 top-3 cursor-pointer"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    password: !showPassword.password,
                  })
                }
              >
                {showPassword.password ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </label>
            <label className="flex flex-col relative">
              <input
                required
                name="confirmPassword"
                placeholder="Confirm Password*"
                type={showPassword.confirmPassword ? "text" : "password"}
                className="border rounded-md p-1.5 shadow-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="absolute right-2 top-3 cursor-pointer"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirmPassword: !showPassword.confirmPassword,
                  })
                }
              >
                {showPassword.confirmPassword ? (
                  <AiFillEye />
                ) : (
                  <AiFillEyeInvisible />
                )}
              </span>
              <p
                className={`pt-1 ${
                  user.password &&
                  confirmPassword &&
                  user.password !== confirmPassword
                    ? "visible text-red-600"
                    : "invisible"
                }`}
              >
                Password Mismatch
              </p>
            </label>
            <div className="w-full py-2   flex flex-col gap-4 items-center">
              <button
                type="submit"
                className="btn-primary w-2/3 text-lg text-center"
                disabled={!isDisabled}
              >
                {signingUp ? "Signing up..." : "Create Account"}
              </button>
              <p className="text-gray-600 text-sm">
                Already have an account?
                <Link
                  href="/login"
                  className="underline text-base"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
