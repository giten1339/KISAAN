"use client";
import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import "@/assets/css/cart.css";
import cauli from "@/assets/images/cauli.png";
import { FaPlus, FaMinus } from "react-icons/fa";
import CartContext from "../../context/CartContext";

export default function CartItem({ details }) {
   //states
   const [quantity, setQuantity] = useState(details.quantity);

   //context
   const { removeFromCart, updateCart } = useContext(CartContext);

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

   useEffect(() => {
      updateCart(details._id, quantity);
   }, [quantity]);

   return (
      <div>
         <hr />
         <div className="flex px-5 my-5 items-center gap-4 ">
            <span
               className="font-semibold text-sm h-fit w-fit hover:cursor-pointer hover:scale-125"
               onClick={() => {
                  removeFromCart(details._id);
               }}
            >
               ✕
            </span>
            <div className="h-16 w-20 relative">
               <Image
                  src={
                     details.image[0].medium || details.image[0].image || cauli
                  }
                  alt="item image"
                  fill={true}
                  style={{
                     position: "absolute",
                     objectFit: "cover",
                     borderRadius: "5px",
                  }}
               />
            </div>
            <div className="mx-2">
               <h1 className="text-xl hover:text-main hover:cursor-pointer">
                  {details?.name}
               </h1>

               <div className="flex gap-5">
                  <div className=" w-24 ">
                     Total : {+details?.price * +quantity}
                  </div>
                  <div className="flex items-center gap-2">
                     <button onClick={decreaseQuantity}>
                        <FaMinus className="text-sm hover:text-main hover:cursor-pointer" />
                     </button>
                     <span className="w-[10px] px-4 border-2 border-sky-500 text-center">
                        {quantity}
                     </span>
                     <button onClick={increaseQuantity}>
                        <FaPlus className="text-sm hover:text-main hover:cursor-pointer" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
