import React from "react";
import OrderedItem from "@/components/admin/shared/OrderedItem";
import Image from "next/image";

const fetchOrder = async (orderId) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/orders?id=${orderId}`,
         { cache: "no-cache" }
      );
      const order = await res.json();
      return order;
   } catch (error) {
      console.log(error);
   }
};

export default async function ViewOrder({ params: { slug: orderId } }) {
   const { item, user, shipping } = await fetchOrder(orderId);

   return (
      <div>
         <OrderedItem item={item} user={user} orderId={orderId} />
         {/*  */}
         <div className="my-10 w-3/4 mx-auto">
            <div className="flex justify-center mb-5">
               {" "}
               <span className="text-xl text-main group  transition duration-300 cursor-pointer">
                  Farmer's Details
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 bg-main"></span>
               </span>
            </div>
            <div className="customer-info flex  gap-20  ">
               <div>
                  <Image
                     className="rounded-full"
                     src={item.farmer.image}
                     width={150}
                     height={150}
                     alt="customer's image"
                  />
               </div>
               <div>
                  <div className="my-2">
                     {" "}
                     <span className="mx-2 ">Name:</span>
                     {item.farmer.name}
                  </div>

                  <div className="my-2">
                     {" "}
                     <span className="mx-2 ">Email:</span>
                     {item.farmer.email}
                  </div>

                  <div className="my-2">
                     {" "}
                     <span className="mx-2 ">Phone:</span>
                     {item.farmer.phone}
                  </div>
               </div>
            </div>
         </div>{" "}
      </div>
   );
}
