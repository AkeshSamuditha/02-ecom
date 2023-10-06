"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between text-blue-900">
      <h2>
        Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex gap-1 overflow-hidden rounded-lg bg-gray-300 text-black">
        {/* <Image
          src={session?.user?.image}
          alt=""
          width={30}
          height={30}
          className="w-6 h-6"
        /> */}

        <span className="px-2">{session?.user?.name}</span>
      </div>
    </div>
  );
}
