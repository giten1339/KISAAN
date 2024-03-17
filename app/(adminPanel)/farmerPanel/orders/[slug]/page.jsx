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
   // Fetching item and user details related to the order
   const { item, user } = await fetchOrder(orderId);
   
   // Rendering the component
   return (
      <div>
         {/* Rendering OrderedItem component */}
         <OrderedItem item={item} user={user} orderId={orderId} />
      </div>
   );
}
