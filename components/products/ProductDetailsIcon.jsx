"use client";
import { useState, useContext } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import CartContext from "../context/CartContext";

export default function ProductDetailsIcon({ product }) {
   const [quantity, setQuantity] = useState(1);

   const { addToCart } = useContext(CartContext);

   const increaseQuantity = () => {
      setQuantity((prev) => {
         return prev + 1;
      });
   };

   const decreaseQuantity = () => {
      setQuantity((prev) => {
         if (prev > 1) {
            return prev - 1;
         } else {
            return prev;
         }
      });
   };

   return (
      <div className="my-5">
         <div>
            <span className="flex items-center gap-2">
               <button onClick={decreaseQuantity}>
                  <FaMinus className="text-sm hover:text-main hover:cursor-pointer" />
               </button>
               <span className="w-[10px] px-4 border-2 border-sky-500">
                  {quantity}
               </span>
               <button onClick={increaseQuantity}>
                  <FaPlus className="text-sm hover:text-main hover:cursor-pointer" />
               </button>
            </span>
         </div>
         <button
            className={`w-fit my-5 bg-main px-5 py-3 rounded-md text-xl text-white border-2 border-main hover:bg-white hover:text-main transition duration-300 ease-in-out `}
            onClick={() => {
               addToCart(product, quantity);
            }}
         >
            add to cart
         </button>
      </div>
   );
}
