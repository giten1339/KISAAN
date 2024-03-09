"use client";
import React from "react";
import "@/assets/css/cart.css";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import CartContext from "../context/CartContext";
import CartItem from "./shared/CartItem";
import Button from "../shared/Button";

export default function Cart() {
   const { cart, changeSidebarState } = useContext(CartContext);

   const [total, setTotal] = useState(0);

   const { push } = useRouter();
   const cartCheckoutClicked = () => {
      changeSidebarState();
      push("/profile/checkout");
   };

   useEffect(() => {
      setTotal(
         cart.reduce((acc, item) => {
            return acc + item.price * item.quantity;
         }, 0)
      );
   }, [cart]);

   return (
      <div className="cart-content  h-[95%] ">
         <div className="items h-4/5 bg-white custom-scrollbar">
            {cart?.map((item) => (
               <CartItem details={item} key={item._id} />
            ))}
         </div>

         <div className="flex  items-center justify-around bg-slate-200 h-fit py-10">
            <div className="text-xl font-bold px-5 text-main">
               Total &nbsp;: &nbsp; {total}
            </div>
            <div>
               {/* <button
                  className="py-2 px-3 rounded-md bg-main border-2 border-main  text-white transition-all duration-200 ease-in-out hover:bg-slate-200 hover:text-main hover:font-bold"
                  onClick={cartCheckout}
               >
                  checkout
               </button> */}
               <div onClick={cartCheckoutClicked}>
                  <Button
                     text="checkout"
                     type="button"
                     additionalClass="py-2 px-3 rounded-md bg-main border-2 border-main  text-white transition-all duration-200 ease-in-out hover:bg-slate-200 hover:text-main hover:font-bold"
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
