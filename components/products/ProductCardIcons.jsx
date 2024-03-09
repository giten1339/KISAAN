"use client";
import React from "react";
import { FaCartPlus, FaHeart, FaEye } from "react-icons/fa";
import CartContext from "../context/CartContext";
import WishlistContext from "../context/WishlistContext";
import { useContext } from "react";
import Link from "next/link";

export default function productCardIcons({ data }) {
   const { addToCart } = useContext(CartContext);
   const { addToWishlist } = useContext(WishlistContext);

   return (
      <div className="actions flex absolute top-1/2 left-1/4 product-actions gap-3 hover:cursor-pointer ">
         <Link href={`/shop/${data._id}`}>
            <div className=" group rounded-[50%] bg-white hover:bg-main py-3 px-3">
               <FaEye className="text-main group-hover:text-white text-3xl" />
            </div>
         </Link>

         <div
            className="group rounded-full bg-white hover:bg-main py-3 px-3 hover:cursor-pointer"
            onClick={() => {
               addToCart(data);
            }}
         >
            <FaCartPlus className="text-main group-hover:text-white  text-3xl" />
         </div>

         <div
            className="group rounded-[50%] bg-white hover:bg-main py-3 px-3 hover:cursor-pointer"
            onClick={() => {
               addToWishlist(data);
            }}
         >
            <FaHeart className="text-main group-hover:text-white text-3xl" />
         </div>
      </div>
   );
}
