import React from "react";
import getSessionInfo from "@/utils/SessionInfo";
import Image from "next/image";
import img from "@/assets/images/cauli.png";
import { FaEye } from "react-icons/fa";
import Link from "next/link";

const fetchOrders = async (id) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/orders/${id}?type=farmer`,
         { cache: "no-cache" }
      );
      const data = await res.json();
      return data;
   } catch (error) {
      console.log(error);
   }
};

export default async function Orders() {
   const serverSession = await getSessionInfo();
   const {
      user: { id },
   } = serverSession;

   const orders = await fetchOrders(id);

   let count = 0;
   return (
      <div className="w-11/12 mx-auto">
         <div className="overflow-x-auto">
            <table className="table ">
               {/* head */}
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
                  {orders.map((order) => (
                     <tr className="hover" key={order._id}>
                        <td>{++count}</td>
                        <td>
                           <div className="flex items-center space-x-3">
                              <div className="avatar">
                                 <div className="mask mask-squircle w-12 h-12 relative">
                                    <Image
                                       src={
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
                                 {order.item.name}
                              </div>
                           </div>
                        </td>
                        <td>{order.item.quantity}</td>
                        <td>
                           <ul className="steps">
                              <li className="step step-success text-xs px-1">
                                 Confirmed
                              </li>
                              <li
                                 className={`step text-xs px-1 ${
                                    (order.status == "Dispatched" ||
                                       order.status == "Recieved") &&
                                    "step-success"
                                 }`}
                              >
                                 Dispatched
                              </li>
                              <li
                                 className={`step text-xs px-1 ${
                                    order.status == "Recieved" && "step-success"
                                 }`}
                              >
                                 Recieved
                              </li>
                           </ul>
                        </td>
                        <td>
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
