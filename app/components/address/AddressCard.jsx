import { useProductsContext } from "@app/contexts";

const AddressCard = ({
  address,
  isEdit,
  showInput = true,
  editAddress,
  setEditAddress,
  setShowAddressForm,
}) => {
  const { id, fullname, mobile, flat, area, city, pincode } = address;
  const { currentAddress, setCurrentAddress, updateAddress, deleteAddress } =
    useProductsContext();
  return (
    <label
      className={`flex ${
        id === currentAddress?.id && isEdit ? "bg-gray-100" : "bg-gray-50"
      }  cursor-pointer items-center gap-2 rounded-sm p-4 shadow-sm`}
    >
      {showInput && (
        <input
          type="radio"
          name="address"
          id=""
          className="me-2 accent-current"
          checked={id === currentAddress?.id}
          onChange={() => setCurrentAddress(address)}
        />
      )}
      <div>
        <h3 className="break-all text-lg font-semibold">{fullname}</h3>
        <p className="break-all text-sm text-gray-500">
          {flat},{area}
        </p>
        <p className="break-all text-sm text-gray-500">
          {city},{pincode}
        </p>
        <p className="text-sm text-gray-500">
          Mobile:
          <span className="break-all ps-1 font-semibold">{mobile}</span>
        </p>
      </div>
    </label>
  );
};
export default AddressCard;
