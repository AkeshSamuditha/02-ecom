"use client";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";

import { notify } from "@app/utils/notify";
import { notifyTypes } from "@app/utils/actiontypes";

const SignInPage = () => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  if (session?.status === "authenticated") {
    router?.push("/");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      notify(notifyTypes.ERROR, "Email is required");
      return;
    }

    if (!password) {
      notify(notifyTypes.ERROR, "Password is required");
      return;
    }

    try {
      setLoading(true);

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });
      setEmail("");
      setPassword("");
      setLoading(false);

      if (result?.error) {
        setLoading(false);
        notify(notifyTypes.ERROR, "Invalid email or password");
      }
      if (result?.ok) {
        router.push("/profile");
      }
    } catch (error) {
      setLoading(false);
      notify(notifyTypes.ERROR, "Invalid email or password");
    }
  };

  if (session) {
    router.push("/");
  } else {
    return (
      <div className="flex w-full items-center justify-center px-5">
        <section className="flex w-full max-w-lg flex-col gap-6 rounded-md bg-white/[0.7] px-7 py-10 shadow-md">
          <div className="flex flex-col gap-2">
            <h1 className="mb-3 text-3xl font-bold ">Login to your account</h1>

            <form
              action=""
              className="flex flex-col gap-3"
              onSubmit={handleSubmit}
            >
              {!!error && <p className="text-error text-red-300]"> {error}</p>}

              <label className="flex flex-col">
                Email
                <input
                  type="email"
                  className="rounded-md border p-1.5 shadow-sm"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>
              <label className="flex flex-col">
                Password
                <input
                  type="password"
                  className="rounded-md border p-1.5 shadow-sm"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </label>
              <div className="flex w-full   flex-col items-center gap-4 py-2 ">
                <button
                  className="btn-primary w-2/3 text-center text-lg "
                  disabled={loading || !email || !password}
                >
                  {loading ? "Logging In..." : "Login"}
                </button>
                <Link href="/signup" className="text-gray-600 underline">
                  Create New Account
                </Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
};

export default SignInPage;
