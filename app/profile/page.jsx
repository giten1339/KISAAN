import React from "react";
import getSessionInfo from "@/utils/SessionInfo";
import Image from "next/image";
import img from "@/assets/images/cauli.png";
import PhoneNumber from "@/components/profile/PhoneNumber";

const fetchOrders = async (id) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/orders/${id}?type=user`,
         {
            cache: "no-cache",
         }
      );
      const data = await res.json();
      return data;
   } catch (e) {
      console.log(e);
   }
};

export default async function Profile() {
   const serverSession = await getSessionInfo();

   const {
      user: { image, name, email, id },
   } = serverSession;

   const orders = await fetchOrders(id);

   return (
      <div className="min-h-screen w-4/5 mx-auto mt-4">
         <div className="image flex justify-center flex-col items-center gap-3">
            <Image
               src={image}
               alt="profile image"
               width={100}
               height={100}
               className="rounded-full"
            />
            <span>{name}</span>
            <span>{email}</span>
            <PhoneNumber userId={id} />
         </div>

         {orders.length > 0 && (
            <div>
               <p className="text-center my-5 font-bold text-2xl underline">
                  Orders
               </p>

               <div className="overflow-x-auto">
                  <table className="table table-fixed">
                     {/* head */}
                     <thead>
                        <tr>
                           <th>Name</th>
                           <th>Price</th>
                           <th>Quantity</th>
                           <th>Total </th>
                           <th>Status</th>
                        </tr>
                     </thead>

                     <tbody>
                        {orders.map((order) => (
                           <tr className="hover" key={order._id}>
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
                                             fill={true}
                                             alt="cauli"
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
                              <td>{order.item.price}</td>
                              <td>{order.item.quantity}</td>
                              <td>{order.item.price * order.item.quantity}</td>
                              <td>
                                 <ul className="steps">
                                    <li className="step step-success text-xs px-1">
                                       Confirmed
                                    </li>
                                    <li
                                       className={`step text-xs px-1 ${
                                          (order.status == "Dispatched" ||
                                             order.status == "Received") &&
                                          "step-success"
                                       }`}
                                    >
                                       Dispatched
                                    </li>
                                    <li
                                       className={`step text-xs px-1 ${
                                          order.status == "Received" &&
                                          "step-success"
                                       }`}
                                    >
                                       Received
                                    </li>
                                 </ul>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         )}
      </div>
   );
}
