import React from "react";
import "@/assets/css/cart.css";
import Image from "next/image";

export default function CheckoutItems({ details }) {
   return (
      <div>
         <hr />
         <div className="flex px-5 my-5 items-center gap-4 ">
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
            <div className="mx-2 ">
               <h1 className="text-xl hover:text-main hover:cursor-pointer">
                  {details?.name}
               </h1>

               <div className="flex gap-5">
                  <div className=" w-fit ">
                     Rs. {details?.price} * {details.quantity}
                     <br />
                     Total: {+details?.price * +details.quantity}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
