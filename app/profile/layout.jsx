import React from "react";
import { redirect } from "next/navigation";
import getSessionInfo from "@/utils/SessionInfo";

export const metadata = {
   title: "Profile",
   description: "Profile",
};

export default async function ProfileLayout({ children }) {
   const serverSession = await getSessionInfo();
   if (!serverSession) {
      redirect("/");
   }
   return <div>{children}</div>;
}
