// Importing necessary modules
import React from "react";
import OrderedItem from "@/components/admin/shared/OrderedItem"; // Importing OrderedItem component
import Image from "next/image"; // Importing Image component from Next.js

// Function to fetch order details asynchronously
const fetchOrder = async (orderId) => {
   try {
      // Fetching order details based on order ID
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/orders?id=${orderId}`,
         { cache: "no-cache" } // Setting cache control
      );
      // Parsing the fetched data as JSON
      const order = await res.json();
      // Returning the order details
      return order;
   } catch (error) {
      // Logging any errors that occur during the fetching process
      console.log(error);
   }
};

// Exporting ViewOrder component
export default async function ViewOrder({ params: { slug: orderId } }) {
   // Fetching item, user, and shipping details related to the order
   const { item, user, shipping } = await fetchOrder(orderId);

   // Rendering the component
   return (
      <div>
         {/* Rendering OrderedItem component */}
         <OrderedItem item={item} user={user} orderId={orderId} />
         {/* Farmer's details */}
         <div className="my-10 w-3/4 mx-auto">
            <div className="flex justify-center mb-5">
               <span className="text-xl text-main group  transition duration-300 cursor-pointer">
                  Farmer's Details
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 bg-main"></span>
               </span>
            </div>
            <div className="customer-info flex  gap-20  ">
               <div>
                  {/* Displaying farmer's image */}
                  <Image
                     className="rounded-full"
                     src={item.farmer.image} // Farmer's image source
                     width={150}
                     height={150}
                     alt="customer's image"
                  />
               </div>
               <div>
                  <div className="my-2">
                     <span className="mx-2 ">Name:</span>
                     {item.farmer.name} {/* Displaying farmer's name */}
                  </div>

                  <div className="my-2">
                     <span className="mx-2 ">Email:</span>
                     {item.farmer.email} {/* Displaying farmer's email */}
                  </div>

                  <div className="my-2">
                     <span className="mx-2 ">Phone:</span>
                     {item.farmer.phone} {/* Displaying farmer's phone number */}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
