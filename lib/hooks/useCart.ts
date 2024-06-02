import { create } from "zustand";
import { round2 } from "../utilis";
import { OrderItem } from "../models/OrderModel";
import { persist } from "zustand/middleware";

type Cart = {
  items: OrderItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
};

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
};

// //Zustand: Accepts nothing and return initial State
// export const cartStore = create<Cart>(() => initialState);

//To Store Data also in Local Storage we use presist (key:cartStore)
export const cartStore = create<Cart>()(
  persist(() => initialState, {
    name: "cartStore",
  })
);

//useCartService Hook
export default function useCartService() {
  const { items, itemsPrice, taxPrice, shippingPrice, totalPrice } =
    cartStore();
  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    increase: (item: OrderItem) => {
      const exist = items.find((x) => x.unique_index === item.unique_index);
      const updatedCartitems = exist
        ? items.map((x) =>
            x.unique_index === item.unique_index
              ? { ...exist, qty: exist.qty + 1 }
              : x
          )
        : [...items, { ...item, qty: 1 }];

      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartitems);
      cartStore.setState({
        items: updatedCartitems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
    decrease: (item: OrderItem) => {
      const exist = items.find((x) => x.unique_index === item.unique_index);
      if (!exist) {
        return;
      }

      const updatedCartitems =
        exist.qty === 1
          ? items.filter((x: OrderItem) => x.unique_index !== item.unique_index)
          : items.map((x) =>
              x.unique_index === item.unique_index
                ? { ...exist, qty: exist.qty - 1 }
                : x
            );
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartitems);
      cartStore.setState({
        items: updatedCartitems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
  };
}

//To calculate total price
const calcPrice = (items: OrderItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + item.retail_price * item.qty, 0)
    ),
    shippingPrice = round2(itemsPrice > 1000 ? 0 : 1000),
    taxPrice = round2(Number(0.15 * itemsPrice)),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};
