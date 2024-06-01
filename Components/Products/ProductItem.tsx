import { Product } from "@/lib/models/ProductModel";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="card bg-base-300 shadow-xl mb-4 mt-4">
      <figure>
        <Link href={`/product/${product.unique_index}`}>
          <Image
            src={product.images[0]}
            alt={product.images[0]}
            width={300}
            height={300}
            className="object-cover h-64 w-full"
          />
        </Link>
      </figure>
      <div className="card-body">
        <Link href={`/product/${product.unique_index}`}>
          <h2 className="card-title font-normal">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.source}</p>
        <div className="card-actions flex items-center justify-between">
          <span className="text-2xl">Rs.{product.retail_price}</span>
        </div>
      </div>
    </div>
  );
}
