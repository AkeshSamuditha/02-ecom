import React, { useState } from "react";

import { useProductsContext } from "@app/contexts";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";

const Address = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { addressList, currentAddress } = useProductsContext();

  return (
    <>
      <h1 className="text-2xl font-bold">Address</h1>
      {showAddressForm ? (
        <AddressForm
          setShowAddressForm={setShowAddressForm}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
        />
      ) : (
        <>
          <div className="flex justify-between">
            <div className="flex flex-col items-start">
              <button
                className="btn-rounded-primary text-sm"
                onClick={() => {
                  setShowAddressForm(true);
                }}
              >
                + Add New Address
              </button>
            </div>
            {addressList.length > 0 && !isEdit && (
              <div className="flex flex-col items-start">
                <button
                  className="btn-rounded-secondary text-sm"
                  onClick={() => {
                    setIsEdit(true);
                    setShowAddressForm(true);
                    setSelectedAddress(currentAddress);
                  }}
                >
                  <span>&#9998;</span>
                  Edit
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              {addressList.length === 0 ? (
                <p className="text-center text-zinc-500">
                  You have not selected any address to ship
                </p>
              ) : (
                addressList.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    editAddress={selectedAddress}
                    setEditAddress={setSelectedAddress}
                    isEdit={isEdit}
                  />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Address;
