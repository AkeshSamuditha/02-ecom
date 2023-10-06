"use client";
import React from "react";
import Image from "next/image";

const layout = ({ children }) => {
  return (
    <main className="m-auto  grid h-screen w-full grid-rows-1 lg:grid-cols-2">
      <section className=" hidden max-h-screen rounded-lg  lg:block">
        <Image
          src="bannerHero.jpg"
          alt="Banner Image"
          height={800}
          width={1300}
          className="h-100% w-full object-cover"
          priority={true}
        />
      </section>
      {children}
    </main>
  );
};

export default layout;
