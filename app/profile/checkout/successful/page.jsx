import React from "react";
import { redirect } from "next/navigation";
import getSessionInfo from "@/utils/SessionInfo";

import Successful from "@/components/profile/checkout/Successful";

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

//delete verification details from the database
const deleteVerificationDetails = async () => {
   const {
      user: { id: userId },
   } = await getSessionInfo();
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/verification/${userId}`,
      {
         method: "DELETE",
      }
   );
   return await res.json();
};

export default async function SuccessPage({ searchParams }) {
   const verification = await fetchVerificationDetails();
   const { shippingId, blockNumber } = searchParams;

   const deleteVerification = await deleteVerificationDetails();

   return (
      <>
         <Successful />
         {verification ? (
            <div className="flex flex-col items-center justify-center h-screen">
               <h1 className="text-3xl font-bold text-center text-green-500">
                  Your payment was successful!
               </h1>
               {blockNumber && (
                  <p className="text-center">
                     Your transaction hash is:{" "}
                     <span className="font-bold">{blockNumber}</span>
                  </p>
               )}
            </div>
         ) : (
            <div className="flex flex-col items-center justify-center h-screen">
               <h1 className="text-3xl font-bold text-center text-red-500">
                  Your payment was unsuccessful!
               </h1>
            </div>
         )}
      </>
   );
}
