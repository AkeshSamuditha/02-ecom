"use client";

import React from "react";
import Image from "next/image";

export default function Error() {
  return (
    <div className="h-[60vh] w-full flex flex-col items-center justify-center ">
      <Image
        src="404-error.gif"
        alt="error"
        width={400}
        height={400}
        className="w-full xs:w-[80%] sm:w-1/2"
        quality={100}
      />
      <span className="mt-3 font-sans text-2xl md:text-4xl font-bold uppercase  tracking-wide text-gray-300">
        Nothing Here!
      </span>
    </div>
  );
}
