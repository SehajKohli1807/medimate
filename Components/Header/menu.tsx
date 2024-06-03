"use client";

import useCartService from "@/lib/hooks/useCart";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SearchIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";

const Menu = () => {
  const { items } = useCartService();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div>
      <ul className="flex items-stretch">
        <li>
          <form
            // onSubmit={submitHandler}
            className="mx-auto  hidden  justify-center md:flex py-2 px-3"
          >
            <input
              //   onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="rounded-tr-none rounded-br-none p-1 text-sm   focus:ring-0"
              placeholder="Search products"
            />
            <button
              className="rounded rounded-tl-none rounded-bl-none bg-amber-300 p-1 text-sm dark:text-black"
              type="submit"
              id="button-addon2"
            >
              <SearchIcon className="h-5 w-5"></SearchIcon>
            </button>
          </form>
        </li>
        <li>
          <Link className="btn btn-ghost rounded-btn" href="/cart">
            Cart
            {mounted && items.length != 0 && (
              <div className="badge badge-secondary">
                {items.reduce((a, c) => a + c.qty, 0)}
                {""}
              </div>
            )}
          </Link>
        </li>
        <li>
          <button className="btn btn-ghost rounded-btn" type="button">
            Sign In
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
