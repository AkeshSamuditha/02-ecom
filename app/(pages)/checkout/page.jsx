"use client";
import { useEffect, useState } from "react";
import { useLocation, useRouter } from "next/navigation";

import SummaryCard from "@app/components/checkout/SummaryCard";
import Address from "@app/components/address/Address";
import Modal from "@app/components/checkout/Modal";

import { useCartContext } from "@app/contexts/index";

const Checkout = () => {
  const navigate = useRouter();
  const { cart } = useCartContext();

  const [showModal, setShowModal] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // const location = useLocation();
  // console.log(location);

  // useEffect(() => {
  //   if (location?.state !== "cart" || !cart.length) {
  //     navigate.push("/");
  //   }
  // }, [cart.length, location?.state, navigate]);

  return (
    <>
      <div className="md:min-h-[80vh] flex justify-center items-center py-3">
        <main className="grid md:grid-cols-2 gap-10 w-full">
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            setIsOrderPlaced={setIsOrderPlaced}
          />
          <section className="p-7 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-6 w-full h-min">
            <Address />
          </section>
          <SummaryCard setShowModal={setShowModal} />
        </main>
      </div>
    </>
  );
};

export default Checkout;
