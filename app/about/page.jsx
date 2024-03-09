import React from "react";
import Image from "next/image";

import img1 from "@/assets/images/about.jpg";

import "@/assets/css/about.css";

export default function page() {
   return (
      <div>
         <div className={`w-full h-96 bg-img`}>
            <div className="text-white z-[19] relative pt-10 px-10">
               <p className="text-lg w-1/2">
                  Eat food that is grown, not made. Nourish your body with the
                  goodness nature provides.
               </p>
               <div className="text-3xl w-fit absolute h-full left-1/2 top-56 transform -translate-x-1/2 -translate-y-1/2">
                  ABOUT
               </div>
            </div>
         </div>

         {/* description about the platform */}
         {/* <div className="flex flex-col justify-center items-center mt-10">
            <div className="text-4xl font-bold">ABOUT US</div>
            <div className="w-1/2 text-center mt-5">
               We are a team of passionate individuals who believe in the
               importance of good food and the impact it has on our lives. We
               want to make it easier for people to access healthy and
               nutritious food, and to support local farmers and producers.
            </div>
         </div> */}

         <div className="w-4/5 mx-auto flex mt-10 gap-5">
            <div style={{ flex: 1 }}>
               <Image
                  src={img1}
                  alt="image 1"
                  className="h-full w-full object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCA"
               />
            </div>
            <div style={{ flex: 1 }} className="text-justify">
               We are a team of passionate individuals who believe in the
               importance of good food and the impact it has on our lives. We
               want to make it easier for people to access healthy and
               nutritious food, and to support local farmers and producers.
            </div>
         </div>
      </div>
   );
}
