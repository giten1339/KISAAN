"use client";
import React from "react";
import "@/assets/css/cart.css";
import { useContext } from "react";
import CartContext from "../context/CartContext";
import Cart from "./Cart";
import Wishlist from "./Wishlist";

export default function RightSidebar() {
   const { hideRightSidebar, changeSidebarState, sidebarType } =
      useContext(CartContext);

   return (
      <div className="cart-section">
         <div
            className={`w-1/4 h-[100vh] bg-white fixed z-40 right-0 transition-all duration-300 ease-in-out 
      ${hideRightSidebar && "hide-right-sidebar"} `}
         >
            <div className="flex justify-around mt-10 h-[5%]">
               <div className="font-semibold text-lg ">{sidebarType}</div>
               <div
                  className="font-extrabold text-xl text-right w-fit hover:cursor-pointer"
                  onClick={() => changeSidebarState(null)}
               >
                  ✕
               </div>
            </div>

            <hr />
            {sidebarType === "cart" ? <Cart /> : <Wishlist />}
         </div>
         <div
            className={`w-full h-[100vh] fixed left-0 bg-[rgba(0,0,0,0.5)] z-30 ${
               hideRightSidebar && "hide-overlay"
            }`}
            onClick={() => changeSidebarState(null)}
         ></div>
      </div>
   );
}
