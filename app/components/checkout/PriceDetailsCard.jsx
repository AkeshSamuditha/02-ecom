const PriceDetailsCard = ({
  totalItems,
  totalPriceOfCart,
}) => {
  const summaryData = [
    { 
      label: "Total Items", 
      value: totalItems },
    {
      label: "Subtotal",
      value: `Rs. ${totalPriceOfCart.toFixed(2)}`,
    },
    {
      label: "Delivery Charges",
      value: "Free",
    },
  ];

  return summaryData.map(({ label, value }) => (
    <div key={label} className=" flex justify-between items-center p-0 ">
      <p className=" text-gray-600">{label}</p>
      <p className="text-lg">{value}</p>
    </div>
  ));
};
export default PriceDetailsCard;
