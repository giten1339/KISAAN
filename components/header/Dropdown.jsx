"use client";
import React from "react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import CartContext from "@/components/context/CartContext";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dropdown({ session }) {
   const { hideDropdown, changeDropDownState } = useContext(CartContext);
   const [signoutClicked, setSignoutClicked] = useState(false);

   const { push } = useRouter();

   useEffect(() => {
      if (signoutClicked) {
         signOut();
         push("/");
      }
   }, [signoutClicked]);

   if (session) {
      const {
         user: { userType },
      } = session;
      return (
         <div className={`drop-down ${hideDropdown && "hide-dropdown"}`}>
            <ul className="text-white" onClick={changeDropDownState}>
               <Link href="/profile">
                  <li className="dropdown-list">Profile</li>
               </Link>
               {userType === "farmer" && (
                  <Link href="/farmerPanel">
                     {" "}
                     <li className="dropdown-list">Farmer Panel</li>
                  </Link>
               )}
               {userType === "admin" && (
                  <Link href={"/adminPanel"}>
                     <li className="dropdown-list">Admin Panel</li>
                  </Link>
               )}
               <li
                  className="dropdown-list bg-[rgba(242,76,61,0.5)] hover:bg-[rgb(242,76,61)]"
                  onClick={() => {
                     setSignoutClicked(true);
                  }}
               >
                  Logout
               </li>
            </ul>
         </div>
      );
   } else {
      return <div></div>;
   }
}
