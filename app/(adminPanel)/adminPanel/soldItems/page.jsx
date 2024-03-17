// Importing necessary modules
import React from "react";
import Link from "next/link"; // Importing Link component from Next.js
import { FaEye } from "react-icons/fa"; // Importing FaEye icon from React Icons

// Function to fetch sold items data asynchronously
const fetchSoldItems = async () => {
   try {
      // Fetching sold items data from the server API with status 'Received'
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/orders?status=Received`,
         { cache: "no-cache" } // Setting cache control
      );
      // Parsing the fetched data as JSON
      const orders = await res.json();
      // Returning the sold items data
      return orders;
   } catch (e) {
      // Logging any errors that occur during the fetching process
      console.log(e);
   }
};

// Exporting SoldItems component
export default async function SoldItems() {
   // Fetching sold items data
   const orders = await fetchSoldItems();
   // Initializing count for numbering sold items
   let count = 0;
   // Rendering the component
   return (
      <div className="w-11/12 mx-auto">
         <div className="overflow-x-auto">
            <table className="table">
               <thead>
                  <tr>
                     <th></th>
                     <th>Item</th>
                     <th>Consumer</th>
                     <th>Farmer</th>
                     <th>Price</th>
                     <th>Quantity</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {/* Mapping through each sold item to display their details */}
                  {orders.map((order) => (
                     <tr className="hover" key={order._id}>
                        <th>{++count}</th>
                        <td>{order.item.name}</td> {/* Displaying item name */}
                        <td>{order.user.name}</td> {/* Displaying consumer name */}
                        <td>{order.item.farmer.name}</td> {/* Displaying farmer name */}
                        <td>{order.item.price}</td> {/* Displaying item price */}
                        <td>{order.item.quantity}</td> {/* Displaying item quantity */}
                        <td>
                           {/* Rendering a link to view sold item details */}
                           <Link href={`/adminPanel/soldItems/${order._id}`}>
                              {/* Adding eye icon */}
                              <FaEye className="text-blue-500 text-2xl hover:cursor-pointer hover:scale-110 active:scale-100 transition-all duration-150 ease-in-out" />
                           </Link>{" "}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
