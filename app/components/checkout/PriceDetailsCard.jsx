const PriceDetailsCard = ({
  totalItems,
  actualPriceOfCart,
  totalPriceOfCartProducts,
}) => {
  totalItems = 5;
  actualPriceOfCart = 1000;
  totalPriceOfCartProducts = 900;
  const summaryData = [
    { label: "Total Products", value: totalItems },
    {
      label: "Subtotal",
      value: `Rs.${actualPriceOfCart}`,
    },
    {
      label: "Discount",
      value: `-Rs${actualPriceOfCart - totalPriceOfCartProducts}`,
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
