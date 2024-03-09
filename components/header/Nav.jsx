import React from "react";
import Link from "next/link";
import Image from "next/image";

import "@/assets/css/nav.css";
import logo from "@/assets/images/farm.png";
import SignInBtn from "./nav/SignInBtn";
import CartIcon from "./nav/CartIcon";
import Dropdown from "./Dropdown";

import getSessionInfo from "@/utils/SessionInfo";

export default async function Nav() {
   const ServerSession = await getSessionInfo();
   return (
      <>
         <div className="h-20"> </div>
         <div className="fixed top-0 w-full h-10 z-20">
            <div className="bg-main z-20 relative ">
               <div className="flex justify-between w-4/5 mx-auto h-20 items-center">
                  <div className=" ">
                     <Link href="/">
                        {" "}
                        <Image src={logo} alt="logo" width={140} />
                     </Link>
                  </div>
                  <ul className="flex gap-5 items-center">
                     <li className="nav-link">
                        <Link href="/">Home</Link>{" "}
                     </li>
                     <li className="nav-link">
                        <Link href="/about">About</Link>{" "}
                     </li>
                     <li className="nav-link">
                        <Link href="/shop">Shop</Link>{" "}
                     </li>
                     <li className="">
                        {ServerSession ? (
                           <CartIcon serverSession={ServerSession} />
                        ) : (
                           <SignInBtn />
                        )}
                     </li>
                  </ul>
               </div>
            </div>
            <Dropdown session={ServerSession} />
         </div>
      </>
   );
}
