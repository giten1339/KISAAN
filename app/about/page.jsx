import React from "react";
import Image from "next/image";

// Importing the image
import img1 from "@/assets/images/about.jpg";

// Importing the CSS file
import "@/assets/css/about.css";

// Page component
export default function Page() {
   return (
      <div>
         {/* Banner */}
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

         {/* Description about the platform */}
         <div className="w-4/5 mx-auto flex mt-10 gap-5">
            {/* Image */}
            <div style={{ flex: 1 }}>
               <Image
                  src={img1}
                  alt="image 1"
                  className="h-full w-full object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCA"
               />
            </div>
            {/* Text */}
            <div style={{ flex: 1 }} className="text-justify">
              
               Welcome to Kisan, an innovative ecommerce platform connecting farmers with consumers. Founded by a passionate team consisting of Gitindra Chapagain, Hritik Subedi, and Sudhir Lohani, Kisan aims to bridge the gap between agriculture and modern commerce. With expertise in technical architecture, frontend development, and backend management, our team ensures a seamless and user-friendly experience. Kisan isn't just a college project; it's a vision to empower both farmers and consumers by facilitating direct transactions and promoting locally sourced goods. Join us in revolutionizing the agricultural landscape—one harvest at a time. Welcome to Kisan!
            </div>
         </div>
      </div>
   );
}
