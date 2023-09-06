"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

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

    try {
      setLoading(true);
      setEmail("");
      setPassword("");

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });
      setLoading;
      if (result?.error) {
        setLoading(false);
        setError("Invalid email or password");
      }
      if (result?.ok) {
        router.push("/profile");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  if (session) {
    router.push("/");
  } else {
    return (
      <div className="flex items-center justify-center w-full px-5">
        <section className="px-7 py-10 rounded-md shadow-md bg-white/[0.7] flex flex-col gap-6 w-full max-w-lg">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold mb-3 ">Login to your account</h1>

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
                  className="border rounded-md p-1.5 shadow-sm"
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
                  className="border rounded-md p-1.5 shadow-sm"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </label>
              <div className="w-full py-2   flex flex-col gap-4 items-center ">
                <button
                  className="btn-primary w-2/3 text-lg text-center "
                  disabled={loading || !email || !password}
                >
                  {loading ? "Logging In..." : "Login"}
                </button>
                {/* <button
                  className="btn-secondary w-2/3 text-sm md:text-base text-center"
                  onClick={() => {
                    setPassword("test");
                    setEmail("test@test.com");
                  }}
                >
                  Login as a Guest
                </button> */}
                <Link href="/signup" className="underline text-gray-600">
                  Create New Account
                </Link>
              </div>
            </form>
          </div>
        </section>
      </div>
      // <div>
      //   <form
      //     className="p-2 border-2 border-gray-500 rounded-lg"
      //     onSubmit={handleSubmit}
      //   >
      //     <h1>Sign In</h1>
      //     {!!error && <p className="text-error">ERROR: {error}</p>}
      //     <input
      //       type="text"
      //       className="p-2 border-2 border-gray-500 rounded-lg"
      //       placeholder="email"
      //       value={email}
      //       onChange={(e) => {
      //         setEmail(e.target.value);
      //       }}
      //     />
      //     <input
      //       type="password"
      //       className="p-2 border-2 border-gray-500 rounded-lg"
      //       placeholder="**********"
      //       value={password}
      //       onChange={(e) => {
      //         setPassword(e.target.value);
      //       }}
      //     />
      //     <button className="btn" type="submit">
      //       Sign In
      //     </button>
      //   </form>
      //   <div>
      //     <div>
      //       <Link href="/signup">Signup Here</Link>
      //     </div>
      //   </div>
      // </div>
    );
  }
};

export default SignInPage;
