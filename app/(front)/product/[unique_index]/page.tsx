import data from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/Components/Products/AddToCart";

export default function ProductDetails({
  params,
}: {
  params: { unique_index: number };
}) {
  const uniqueIndex = Number(params.unique_index);
  const product = data.products.find((x) => x.unique_index === uniqueIndex);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <>
      <div className="my-2">
        <Link href="/">Back to Products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-8">
        <div className="md:col-span-2">
          <Image
            src={product.images[0]}
            alt={product.images[0]}
            width={60}
            height={60}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          ></Image>
        </div>
        <div className="md:col-span-2">
          <ul className="space-y-4 ">
            <li>
              <h1 className="text-xl">{product.name}</h1>
            </li>
            <li>
              Product available at{" "}
              <Link href={product.medicine_link}>{product.source}</Link>
            </li>
            <li>Quantity: {product.quantity}</li>
            <li>
              Prescription Required:
              {product.prescription_required ? " Yes" : " No"}
            </li>
            <li>
              <div className="divider"></div>
            </li>
            <li>
              Description:{" "}
              <p>
                {product.description === ""
                  ? "No description available"
                  : product.description}
              </p>
            </li>
            <li>Manufactured By: {product.manufacturer}</li>
            <li>
              Salts Present:{" "}
              {product.salts === ""
                ? "Information Not Available"
                : product.salts}
            </li>
            <li>Product Form: {product.form}</li>
          </ul>
        </div>
        <div>
          <div className="card bg-base-300 shadow-xl mt-3 md:mt-0 mb-4">
            <div className="card-body">
              <div className="flex mb-2 justify-between">
                <div>Price</div>
                <div>Rs. {product.retail_price}</div>
              </div>

              <div className="flex mb-2 justify-between">
                <div>Status</div>
                <div>{product.availability ? "In Stock" : "Unavailable"}</div>
              </div>
              {product.availability && (
                <div className="card-actions justify-center">
                  <AddToCart
                    item={{
                      ...product,
                      qty: 0,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
