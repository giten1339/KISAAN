"use client";
import React from "react";
import Image from "next/image";
import cauli from "@/assets/images/cauli.png";
import { FaEye, FaTrash } from "react-icons/fa";
import Link from "next/link";

import { useContext } from "react";
import WishlistContext from "@/components/context/WishlistContext";

export default function WishlistItem({ details }) {
   const { removeFromWishlist } = useContext(WishlistContext);
   return (
      <div>
         <hr />
         <div className="flex px-5 my-5 items-center gap-4  ">
            <div className="h-16 w-20  relative">
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
            <div className=" flex justify-between w-1/2">
               <h1 className="text-lg hover:text-main hover:cursor-pointer">
                  {details?.name}
               </h1>

               <div className="flex items-center gap-2">
                  <div className="tooltip" data-tip="view product">
                     <Link href={`/shop/${details?._id}`}>
                        <FaEye className="text-md text-green-700 hover:text-green-600 hover:scale-110 hover:cursor-pointer transition-all duration-200 ease-in-out" />
                     </Link>
                  </div>
                  <div className="tooltip" data-tip="delete product">
                     <FaTrash
                        className="text-md text-red-700 hover:text-red-600 hover:scale-110 hover:cursor-pointer transition-all duration-200 ease-in-out"
                        onClick={() => {
                           removeFromWishlist(details?._id);
                        }}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
