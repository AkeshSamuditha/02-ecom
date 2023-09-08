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
      }  items-center gap-2 shadow-sm p-4 rounded-sm cursor-pointer`}
    >
      {showInput && (
        <input
          type="radio"
          name="address"
          id=""
          className="accent-current me-2"
          checked={id === currentAddress?.id}
          onChange={() => setCurrentAddress(address)}
        />
      )}
      <div>
        <h3 className="text-lg font-semibold break-all">{fullname}</h3>
        <p className="text-sm text-gray-500 break-all">
          {flat},{area}
        </p>
        <p className="text-sm text-gray-500 break-all">
          {city},{pincode}
        </p>
        <p className="text-sm text-gray-500">
          Mobile:
          <span className="font-semibold ps-1 break-all">{mobile}</span>
        </p>
      </div>
    </label>
  );
};
export default AddressCard;
