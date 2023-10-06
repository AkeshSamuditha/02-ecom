"use client";

import Image from "next/image";

export default function Error() {
  return (
    <div className="flex h-[60vh] w-full flex-col items-center justify-center ">
      <Image
        src="404-error.gif"
        alt="error"
        width={400}
        height={400}
        className="xs:w-[80%] w-full sm:w-1/2"
        quality={100}
      />
      <span className="mt-3 font-sans text-2xl font-bold uppercase tracking-wide  text-gray-300 md:text-4xl">
        Nothing Here!
      </span>
    </div>
  );
}
