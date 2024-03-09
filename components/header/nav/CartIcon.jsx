"use client";
import { FaCartArrowDown, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { useContext, useState } from "react";

import CartContext from "@/components/context/CartContext";
import WishlistContext from "@/components/context/WishlistContext";

export default function Cart({ serverSession }) {
   const { cart, changeSidebarState, changeDropDownState } =
      useContext(CartContext);

   const { wishlist } = useContext(WishlistContext);

   const {
      user: { image },
   } = serverSession;

   return (
      <div className="flex gap-5 items-center">
         <div
            className="relative hover:cursor-pointer nav-link"
            onClick={() => {
               changeSidebarState("wishlist");
            }}
         >
            <FaHeart className="text-2xl text-red-500" />
            <span className="badge badge-sm absolute -top-2 left-3">
               {wishlist.length}
            </span>
         </div>
         <div
            className="relative hover:cursor-pointer nav-link"
            onClick={() => {
               changeSidebarState("cart");
            }}
         >
            <FaCartArrowDown className="text-2xl  " />
            <span className="badge badge-sm absolute -top-2 left-3">
               {cart.length}
            </span>
         </div>
         <Image
            src={image}
            height={40}
            width={40}
            alt="image"
            className="rounded-full hover:cursor-pointer"
            onClick={changeDropDownState}
         />
      </div>
   );
}
