import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import { redirect } from "next/navigation";

import getSessionInfo from "@/utils/SessionInfo";

export default async function AdminLayout({ children }) {
   const serverSession = await getSessionInfo();
   if (!serverSession) {
      redirect("/");
   }
   const {
      user: { userType },
   } = serverSession;

   if (userType === "farmer" || userType === "admin") {
      return (
         <div className="min-h-[90vh] flex mb-10">
            <Sidebar />
            <div className="w-5/6 ml-64">{children}</div>
         </div>
      );
   } else {
      redirect("/");
   }
}
