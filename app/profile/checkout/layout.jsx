import React from "react";
import { redirect } from "next/navigation";
import getSessionInfo from "@/utils/SessionInfo";

export const metadata = {
   title: "Checkout",
   description: "Checkout",
};

export default async function CheckoutLayout({ children }) {
   const serverSession = await getSessionInfo();
   if (!serverSession) {
      redirect("/");
   }
   return <div>{children}</div>;
}
