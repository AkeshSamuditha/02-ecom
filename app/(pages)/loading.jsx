import React from "react";
// import Image from "next/image";
const Loader = () => {
  return (
    <div className="text-loader font-kalam flex flex-col gap-1 items-center">
      {/* <span>
        <Image
          height={100}
          width={100}
          src="loading.gif"
          alt="loading..."
          className="opacity-[0.25]"
        />
      </span> */}
      <div className="text-container font-kalam">
        <span className="letter ">P</span>
        <span className="letter">U</span>
        <span className="letter">L</span>
        <span className="letter">S</span>
        <span className="letter">E</span>
      </div>
    </div>
  );
};

export default Loader;
