import { BsArrowDownRightCircle } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Banner = ({ catRef }) => {
  const navigate = useRouter();

  return (
    <main className=" flex justify-between items-center py-1 mb-5  relative">
      <section className="max-w-xl mx-auto sm:mx-0  w-full py-2  lg:w-1/3 ">
        <h1 className="text-7xl sm:text-9xl lg:text-8xl font-bold tracking-wide text-left text-gray-800 py-3 w-full font-satisfy">
          <span className="block text-pink-600 py-2 ">Discover</span>
          <span className="block text-purple-800 py-2">Unmatched</span>
          <span className="block text-blue-900 py-2">Elegance</span>
        </h1>

        <p className="py-3 text-lg text-left text-gray-700 font-light">
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
            className="p-3 flex items-center"
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
      <section className="hidden w-1/2 lg:flex justify-center rounded-md">
        <Image
          src="bannerImg.jpg?updatedAt=1693002479527"
          alt="Sample image"
          width={600}
          height={600}
          className="p-2 object-contain"
        />
      </section>
    </main>
  );
};

export default Banner;
