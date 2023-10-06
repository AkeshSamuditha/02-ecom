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
    <div className="flex w-full content-center  items-center justify-center px-5">
      <section className="flex w-full max-w-lg flex-col gap-6 rounded-md bg-white/[0.7] px-10 py-10 shadow-md">
        <div className="flex flex-col gap-2 ">
          <h1 className="mb-3 text-4xl font-bold">Sign up</h1>
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
                className="rounded-md border p-1.5 shadow-sm"
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
                className="rounded-md border p-1.5 shadow-sm"
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
                className="rounded-md border p-1.5 shadow-sm"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </label>
            <label className="relative flex flex-col">
              <input
                required
                name="password"
                placeholder="Password*"
                type={showPassword.password ? "text" : "password"}
                className="rounded-md border p-1.5 shadow-sm"
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
            <label className="relative flex flex-col">
              <input
                required
                name="confirmPassword"
                placeholder="Confirm Password*"
                type={showPassword.confirmPassword ? "text" : "password"}
                className="rounded-md border p-1.5 shadow-sm"
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
            <div className="flex w-full   flex-col items-center gap-4 py-2">
              <button
                type="submit"
                className="btn-primary w-2/3 text-center text-lg"
                disabled={!isDisabled}
              >
                {signingUp ? "Signing up..." : "Create Account"}
              </button>
              <p className="text-sm text-gray-600">
                Already have an account?
                <Link href="/login" className="text-base underline">
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
