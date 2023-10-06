import Image from "next/image";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="flex h-[60vh] w-full flex-col items-center justify-center  gap-3 ">
      <Image
        width={200}
        height={200}
        src="empty-shopping-bag.png"
        alt="empty Cart"
        className="mt-5 h-36 -rotate-12 drop-shadow-lg"
      />

      <div className="text-center">
        <h2 className="text-2xl font-bold">Hey, it feels so light!</h2>
        <p className="text-sm text-gray-400">
          There is nothing in your Cart. Let us add some items.
        </p>
      </div>

      <Link href="/products">
        <div className="btn-rounded-secondary gb mt-5 text-sm">Explore</div>
      </Link>
    </div>
  );
};

export default EmptyCart;
