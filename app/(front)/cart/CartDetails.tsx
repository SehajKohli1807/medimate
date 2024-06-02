"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCartService from "@/lib/hooks/useCart";
import Link from "next/link";
import Image from "next/image";
import { Princess_Sofia } from "next/font/google";

export default function CartDetails() {
  const router = useRouter();
  const { items, itemsPrice, increase, decrease } = useCartService();

  //To prevent error b/w client-side rendering and server-side rendering, we are using this mount component.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  });

  if (!mounted) {
    return <></>;
  }

  return (
    <>
      <h1 className="py-4 text-2xl">Shopping Cart</h1>
      {items.length === 0 ? (
        <div>
          Cart is Empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.unique_index}>
                    <td>
                      <Link
                        href={`/product/${item.unique_index}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          width={50}
                          height={50}
                        ></Image>
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => {
                          decrease(item);
                        }}
                      >
                        -
                      </button>
                      <span className="px-2">{item.qty}</span>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => {
                          increase(item);
                        }}
                      >
                        +
                      </button>
                    </td>
                    <td>Rs. {item.retail_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="card bg-base-300">
              <div className="card-body">
                <ul>
                  <li>
                    <div className="pb-3 text-xl">
                      Subtotal ({items.reduce((a, c) => a + c.qty, 0)}): Rs.
                      {itemsPrice}
                    </div>
                  </li>
                  <li>
                    <button
                      className="btn btn-primary w-full"
                      onClick={() => router.push("/shipping")}
                    >
                      Proceed To Checkout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
