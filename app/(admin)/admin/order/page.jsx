// Have to update

import Link from "next/link";
import { getOrders } from "@app/actions/serverActions";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ProductDelete from "@app/components/admin/ProductDelete";

export default async function Orders() {
  const orders = await getOrders();
  return (
    <>
      <table className="rounded-lg text-xl justify-center  overflow-hidden table-auto w-full border-collapse mt-4">
        <thead className="bg-slate-800 text-white text-center">
          <tr>
            <th className="py-4 px-2">Last Updated</th>
            <th className="py-4 px-2 border border-white">Product</th>
            <th className="py-4 px-2 border border-white">Category</th>
            <th className="py-4 px-2 border border-white">Quantity</th>
            <th className="py-4 px-2 border border-white">Featured</th>
            <th className="py-4 px-2 border border-white">Price(Rs.)</th>
            <th className="py-4 px-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((product) => (
            <tr
              key={product.id}
              className="border-b odd:bg-slate-200 rounded-lg "
            >
              <td className="text-center shadow-b">{product.lastupdate}</td>

              <td className="px-4 py-2 ">
                <Link href={"/orders/" + product.id}>
                  <div className="flex items-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={150}
                      className="w-20 h-30 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-gray-600">{product.description}</p>
                    </div>
                  </div>
                </Link>
              </td>
              <td className="text-center shadow-b">{product.category}</td>
              <td className="text-center  ">{product.quantity}</td>
              <td className="text-center">
                {product.isfeatured ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-500 text-xl"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-red-500 text-xl"
                  />
                )}
              </td>
              <td className="text-center ">{product.price.toFixed(2)}</td>
              <td className=" px-4 py-2   ">
                <div className="flex flex-col item-center gap-3">
                  <div className=" mr-2  text-center">
                    <Link href={"/admin/orders/edit/" + product.id}>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        size="lg"
                        style={{ color: "#29b50d" }}
                      />
                    </Link>
                  </div>
                  <ProductDelete {...product} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
