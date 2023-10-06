"use client";
import React from "react";
import Image from "next/image";

const layout = ({ children }) => {
  return (
    <main className="grid  grid-rows-1 lg:grid-cols-2 w-full h-screen m-auto">
      <section className=" hidden lg:block max-h-screen  rounded-lg">
        <Image
          src="bannerHero.jpg"
          alt="Banner Image"
          height={800}
          width={1300}
          className="w-full h-100% object-cover"
          priority={true}
        />
      </section>
      {children}
    </main>
  );
};

export default layout;
