import React from "react";
import Image from "next/image";

import OrderStatus from "../OrderStatus";
import ImageDisplay from "../../products/ImageDisplay";

export default function OrderedItem({ item, user, orderId }) {
   return (
      <div>
         <div className=" w-3/4 mx-auto">
            <div className="order flex my-10 gap-20 items-center">
               <div>
                  <ImageDisplay product={item} />
               </div>
               <div className="my-2">
                  <div>
                     {" "}
                     <span className="mx-2 text-main text-5xl font-semibold">
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                     </span>
                  </div>
                  <div className="my-2">
                     <span className="mx-2  text-main text-md font-semibold">
                        Rs. {item.price}
                     </span>
                  </div>
                  <div className="my-2">
                     <span className="mx-2  text-main text-md font-semibold">
                        Quantity:
                     </span>
                     {item.quantity}
                  </div>

                  <div className="my-2">
                     <span className="mx-2 text-main text-md font-semibold">
                        Total:
                     </span>
                     Rs. {item.quantity * item.price}
                  </div>

                  <div className="my-4">
                     <OrderStatus orderId={orderId} />
                  </div>
               </div>
            </div>
            {/*  */}
            <hr />
            {/*  */}
            <div className="my-10">
               <div className="flex justify-center mb-5">
                  {" "}
                  <span className="text-xl text-main group  transition duration-300 cursor-pointer">
                     Consumer's Details
                     <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 bg-main"></span>
                  </span>
               </div>
               <div className="customer-info flex flex-row-reverse gap-20 ">
                  <div>
                     <Image
                        className="rounded-full"
                        src={user.image}
                        width={150}
                        height={150}
                        alt="customer's image"
                     />
                  </div>
                  <div>
                     <div className="my-2">
                        {" "}
                        <span className="mx-2 ">Name:</span>
                        {user.name}
                     </div>

                     <div className="my-2">
                        {" "}
                        <span className="mx-2 ">Email:</span>
                        {user.email}
                     </div>

                     <div className="my-2">
                        {" "}
                        <span className="mx-2 ">Phone:</span>
                        {user.phone || "phone not provided"}
                     </div>

                     {/* <div className="my-2">
                        {" "}
                        <span className="mx-2 ">Address:</span>
                        {shipping?.address || "address not provided"}
                     </div>

                     <div className="my-2">
                        {" "}
                        <span className="mx-2 ">City:</span>
                        {shipping?.city || "address not provided"}
                     </div>

                     <div className="my-2">
                        {" "}
                        <span className="mx-2 ">Postal code:</span>
                        {shipping?.postalCode || "address not provided"}
                     </div>

                     <div className="my-2">
                        {" "}
                        <span className="mx-2 ">Province:</span>
                        {shipping?.province || "address not provided"}
                     </div> */}
                  </div>
               </div>
            </div>{" "}
         </div>
      </div>
   );
}
