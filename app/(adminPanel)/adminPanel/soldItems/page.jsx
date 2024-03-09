import React from "react";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

const fetchSoldItems = async () => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/orders?status=Received`,
         { cache: "no-cache" }
      );
      const orders = await res.json();
      return orders;
   } catch (e) {
      console.log(e);
   }
};

export default async function SoldItems() {
   const orders = await fetchSoldItems();

   let count = 0;

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
                  {orders.map((order) => (
                     <tr className="hover" key={order._id}>
                        <th>{++count}</th>
                        <td>{order.item.name}</td>
                        <td>{order.user.name}</td>
                        <td>{order.item.farmer.name}</td>
                        <td>{order.item.price}</td>
                        <td>{order.item.quantity}</td>
                        <td>
                           <Link href={`/adminPanel/soldItems/${order._id}`}>
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
