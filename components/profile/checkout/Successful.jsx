"use client";
import { useContext, useEffect } from "react";
import CartContext from "@/components/context/CartContext";

export default function Successful() {
   const { cartCheckout, cart } = useContext(CartContext);

   useEffect(() => {
      if (cart.length > 0) {
         const shippingId = localStorage.getItem("shippingId");
         cartCheckout(shippingId);
      }
   }, [cart]);

   return <div></div>;
}
