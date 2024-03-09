import React from "react";
import Link from "next/link";

export default function Button({
   additionalClass = "px-5 py-3",
   text,
   link = "#",
   hover = false,
   type = "link",
}) {
   if (type === "link") {
      return (
         <div>
            {hover ? (
               <Link href={link}>
                  <div
                     className={`w-fit bg-main  text-xl text-white border-2 border-main hover:bg-white hover:text-main transition duration-300 ease-in-out  ${additionalClass} `}
                  >
                     {text}
                  </div>
               </Link>
            ) : (
               <Link href={link}>
                  <div
                     className={`w-fit bg-main text-xl text-white border-2 border-main transition duration-300 ease-in-out ${additionalClass}  `}
                  >
                     {text}
                  </div>
               </Link>
            )}
         </div>
      );
   } else if (type === "button") {
      return (
         <div
            className={`w-fit bg-main  text-xl text-white border-2 border-main hover:bg-white hover:text-main transition duration-300 ease-in-out  ${additionalClass} hover:cursor-pointer`}
         >
            {text}
         </div>
      );
   }
}
