import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import { getProducts } from "@app/actions/serverActions";
import ProductDelete from "@app/components/admin/ProductDelete";

export default async function Products() {
  const products = await getProducts();
  return (
    <>
      <table className="mt-4 w-full table-auto  border-collapse justify-center overflow-hidden rounded-lg text-xl">
        <thead className="bg-slate-800 text-center text-white">
          <tr>
            <th className="px-2 py-4">Last Updated</th>
            <th className="border border-white px-2 py-4">Product</th>
            <th className="border border-white px-2 py-4">Category</th>
            <th className="border border-white px-2 py-4">Quantity</th>
            <th className="border border-white px-2 py-4">Featured</th>
            <th className="border border-white px-2 py-4">Price(Rs.)</th>
            <th className="px-2 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="rounded-lg border-b odd:bg-slate-200 "
            >
              <td className="shadow-b text-center text-sm">
                {product.lastupdate.toLocaleString()}
              </td>

              <td className="px-4 py-2 ">
                <div className="flex items-center">
                  <Link href={"/products/" + product.id}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={150}
                      className="h-30 mr-4 w-20 rounded-md object-cover"
                    />
                  </Link>
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-grey-700 -mt-1 text-lg leading-tight">
                      {product.description}
                    </p>
                  </div>
                </div>
              </td>
              <td className="shadow-b text-center">{product.category}</td>
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
                    className="text-xl text-red-700 "
                  />
                )}
              </td>
              <td className="text-center ">{product.price.toFixed(2)}</td>
              <td className=" px-4 py-2   ">
                <div className="item-center flex flex-col">
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
