// Importing necessary modules
import React from "react";
import getSessionInfo from "@/utils/SessionInfo"; // Importing getSessionInfo function from SessionInfo utility
import Image from "next/image"; // Importing Image component from Next.js
import img from "@/assets/images/cauli.png"; // Importing default image
import { FaEye } from "react-icons/fa"; // Importing FaEye icon from React Icons
import Link from "next/link"; // Importing Link component from Next.js

// Function to fetch orders data asynchronously
const fetchOrders = async (id) => {
   try {
      // Fetching orders data for the logged-in user with specified type
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/orders/${id}?type=farmer`,
         { cache: "no-cache" } // Setting cache control
      );
      // Parsing the fetched data as JSON
      const data = await res.json();
      // Returning the orders data
      return data;
   } catch (error) {
      // Logging any errors that occur during the fetching process
      console.log(error);
   }
};

// Exporting Orders component
export default async function Orders() {
   // Fetching session information
   const serverSession = await getSessionInfo();
   const {
      user: { id },
   } = serverSession;

   // Fetching orders data for the logged-in user
   const orders = await fetchOrders(id);

   // Initializing count for numbering orders
   let count = 0;

   // Rendering the component
   return (
      <div className="w-11/12 mx-auto">
         <div className="overflow-x-auto">
            <table className="table ">
               {/* Table head */}
               <thead>
                  <tr>
                     <th></th>
                     <th>Name</th>
                     <th>Quantity</th>
                     <th>Status</th>
                     <th>Actions</th>
                  </tr>
               </thead>

               <tbody>
                  {/* Mapping through each order to display its details */}
                  {orders.map((order) => (
                     <tr className="hover" key={order._id}>
                        <td>{++count}</td>
                        <td>
                           {/* Displaying item image and name */}
                           <div className="flex items-center space-x-3">
                              <div className="avatar">
                                 <div className="mask mask-squircle w-12 h-12 relative">
                                    <Image
                                       src={
                                          // Using item image or default image if not available
                                          order.item.image[0].medium ||
                                          order.item.image[0].image ||
                                          img
                                       }
                                       alt="cauli"
                                       fill={true}
                                       style={{ position: "absolute" }}
                                    />
                                 </div>
                              </div>
                              <div>
                                 <div className="font-bold"></div>
                                 {order.item.name} {/* Displaying item name */}
                              </div>
                           </div>
                        </td>
                        <td>{order.item.quantity}</td> {/* Displaying item quantity */}
                        <td>
                           {/* Displaying order status as steps */}
                           <ul className="steps">
                              {/* Step for confirmed status */}
                              <li className="step step-success text-xs px-1">
                                 Confirmed
                              </li>
                              {/* Step for dispatched status */}
                              <li
                                 className={`step text-xs px-1 ${
                                    (order.status == "Dispatched" ||
                                       order.status == "Recieved") &&
                                    "step-success"
                                 }`}
                              >
                                 Dispatched
                              </li>
                              {/* Step for received status */}
                              <li
                                 className={`step text-xs px-1 ${
                                    order.status == "Recieved" && "step-success"
                                 }`}
                              >
                                 Received
                              </li>
                           </ul>
                        </td>
                        <td>
                           {/* Link to view order details */}
                           <Link href={`/farmerPanel/orders/${order._id}`}>
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
