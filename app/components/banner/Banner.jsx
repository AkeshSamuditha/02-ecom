import { BsArrowDownRightCircle } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Banner = ({ catRef }) => {
  const navigate = useRouter();

  return (
    <main className="relative mb-5 flex items-center justify-between py-1">
      <section className="mx-auto w-full max-w-xl  py-2 sm:mx-0  lg:w-1/3 ">
        <h1 className="w-full py-3 text-left font-satisfy text-7xl font-bold tracking-wide text-gray-800 sm:text-9xl lg:text-8xl">
          <span className="block py-2 text-pink-600 ">Discover</span>
          <span className="block py-2 text-purple-800">Unmatched</span>
          <span className="block py-2 text-blue-900">Elegance</span>
        </h1>

        <p className="py-3 text-left text-lg font-light text-gray-700">
          <span className="block">
            Explore the Essence of Distinctive Style
          </span>
        </p>

        <section className="flex items-center">
          <button
            className="btn-primary text-sm md:text-base"
            onClick={() => navigate.push("/products")}
          >
            Start Shopping
          </button>
          <button
            className="flex items-center p-3"
            onClick={() =>
              catRef.current.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            <span className="mx-2 text-sm md:text-base">Explore More</span>{" "}
            <BsArrowDownRightCircle className="text-lg" />
          </button>
        </section>
      </section>
      <section className="hidden w-1/2 justify-center rounded-md lg:flex">
        <Image
          src="bannerImg.jpg?updatedAt=1693002479527"
          alt="Sample image"
          width={600}
          height={600}
          className="object-contain p-2"
        />
      </section>
    </main>
  );
};

export default Banner;
