import Link from "next/link";
import { getProducts } from "@app/actions/serverActions";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import ProductDelete from "@app/components/admin/ProductDelete";

export default async function Products() {
  const products = await getProducts();
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
          {products.map(product => (
            <tr
              key={product.id}
              className="border-b odd:bg-slate-200 rounded-lg "
            >
              <td className="text-center shadow-b text-sm">{product.lastupdate.toLocaleString()}</td>

              <td className="px-4 py-2 ">
                  <div className="flex items-center">
                <Link href={"/products/" + product.id}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={150}
                      className="w-20 h-30 object-cover rounded-md mr-4"
                    />
                </Link>
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-grey-700 text-lg leading-tight -mt-1">{product.description}</p>
                    </div>
                  </div>
              </td>
              <td className="text-center shadow-b">{product.category}</td>
              <td className="text-center">{product.quantity}</td>
              <td className="text-center">
                {product.isfeatured ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-xl text-green-700"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-red-700 text-xl "
                  />
                )}
              </td>
              <td className="text-center ">{product.price.toFixed(2)}</td>
              <td className=" px-4 py-2   ">
                <div className="flex flex-col item-center">
                  <div className="text-center">
                    <Link href={"/admin/products/edit/" + product.id}>
                      <FontAwesomeIcon 
                        icon={faPenToSquare}
                        className="text-base text-green-700 hover:text-green-600"
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
