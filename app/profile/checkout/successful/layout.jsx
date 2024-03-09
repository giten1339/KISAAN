import React from "react";
import { redirect } from "next/navigation";
import getSessionInfo from "@/utils/SessionInfo";

export const metadata = {
   title: "Checkout",
   description: "Checkout",
};

//fetches the verification details from the database
const fetchVerificationDetails = async () => {
   const {
      user: { id: userId },
   } = await getSessionInfo();
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/verification/${userId}`
   );
   return await res.json();
};

export default async function SuccessfulLayout({ searchParams, children }) {
   const verification = await fetchVerificationDetails();
   if (!verification) {
      redirect("/");
   }

   // const { DV, blockNumber } = verification;
   // console.log(verification);

   // if (!DV && !blockNumber) {
   //    redirect("/");
   // }

   return <>{children}</>;
}
