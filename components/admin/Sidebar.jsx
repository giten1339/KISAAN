import React from "react";
import getSessionInfo from "@/utils/SessionInfo";
import SidebarList from "./SidebarList";

const fetchNumberOfNewOrders = async (id, userType) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/orders/${id}?type=${userType}&count=true`,
         { cache: "no-cache" }
      );
      const data = await res.json();
      return data;
   } catch (error) {
      console.log(error);
   }
};

export default async function Sidebar() {
   const {
      user: { id, userType },
   } = await getSessionInfo();
   const newOrders = await fetchNumberOfNewOrders(id, userType);
   return (
      <div className="h-[90vh] w-1/6 sidebar shadow-xl fixed z-0 py-4">
         <hr />
         <SidebarList userType={userType} newOrders={newOrders} userId={id} />
      </div>
   );
}
