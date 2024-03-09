"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import "@/assets/css/sidebar.css";

import { usePathname } from "next/navigation";

const updateSeen = async (userId, userType) => {
   try {
      //id=user id & type=user type
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/orders/${userId}?type=${userType}&count=true`,
         {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      const data = await res.json();
      return data;
   } catch (error) {
      console.log(error);
   }
};

export default function SidebarList({ userType, newOrders, userId }) {
   const pathname = usePathname();
   const itemName = pathname.split("/")[2]?.toLowerCase() || "dashboard";

   if (newOrders > 0 && itemName === "orders") {
      updateSeen(userId, userType);
   }

   useEffect(() => {
      const sidebarItems = document.querySelectorAll(".sidebar-item");
      sidebarItems.forEach((item) => {
         const classname = item.className.split(" ");
         if (classname.includes(itemName)) {
            item.classList.add("active");
         } else {
            item.classList.remove("active");
         }
      });
   }, [itemName]);

   return (
      <div>
         <ul className="w-full ">
            {userType === "farmer" && (
               <>
                  <Link href="/farmerPanel">
                     <li className="sidebar-item dashboard">Dashboard</li>
                  </Link>
                  <Link href="/farmerPanel/products">
                     <li className="sidebar-item products">Products</li>
                  </Link>
                  <Link href="/farmerPanel/orders">
                     <li className="sidebar-item orders">
                        Orders
                        {newOrders > 0 && (
                           <span className="counter">{newOrders}</span>
                        )}
                     </li>
                  </Link>
               </>
            )}

            {userType === "admin" && (
               <>
                  <Link href="/adminPanel">
                     <li className="sidebar-item active dashboard">
                        Dashboard
                     </li>
                  </Link>
                  <Link href={"/adminPanel/orders"}>
                     <li className="sidebar-item orders">
                        Orderes
                        {newOrders > 0 && (
                           <span className="counter">{newOrders}</span>
                        )}
                     </li>
                  </Link>
                  <Link href="/adminPanel/soldItems">
                     <li className="sidebar-item solditems"> Sold Items </li>
                  </Link>
                  <Link href="/adminPanel/consumers">
                     <li className="sidebar-item consumers">Consumers</li>
                  </Link>
                  <Link href="/adminPanel/farmers">
                     <li className="sidebar-item farmers">Farmers</li>
                  </Link>
               </>
            )}
         </ul>
      </div>
   );
}
