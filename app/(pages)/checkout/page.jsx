"use client";
import { useState } from "react";

import SummaryCard from "@app/components/checkout/SummaryCard";
import Address from "@app/components/address/Address";

const Checkout = () => {
  const [showModal, setShowModal] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center py-3 md:min-h-[80vh]">
        <main className="grid w-full gap-10 md:grid-cols-2">
          {/* <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            setIsOrderPlaced={setIsOrderPlaced}
          /> */}
          <section className="flex h-min w-full flex-col gap-6 rounded-md bg-white/[0.7] p-7 shadow-sm">
            <Address />
          </section>
          <SummaryCard setShowModal={setShowModal} />
        </main>
      </div>
    </>
  );
};

export default Checkout;
