import React from "react";
import Image from "next/image";

import CauliFlower from "@/assets/images/cauli.png";
import "@/assets/css/product-card.css";
import ProductCardIcons from "./ProductCardIcons";

export default function ProductCard({ data }) {
   return (
      <div className="mx-2 my-8">
         <div className="w-80 shadow-md hover:shadow-2xl relative product-card">
            <div className=" flex items-center w-11/12 h-72 mx-auto  relative ">
               <Image
                  src={
                     data.image[0].medium || data.image[0].image || CauliFlower
                  }
                  alt={`${data.name} image`}
                  fill={true}
                  style={{ objectFit: "contain" }}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCA"
               />
            </div>
            <div className="content bg-[#fefffe] text-center py-10">
               <h3 className="font-semibold hover:text-main hover:cursor-pointer ">
                  {data.name}
               </h3>
               <p>
                  <span className="font-bold text-2xl my-2 primary-text">
                     Rs. {data.price}
                  </span>
                  <br />
                  <span className="text-md font-medium">
                     {data.quantity} Kg
                  </span>
               </p>
            </div>
            <ProductCardIcons data={data} />
         </div>
      </div>
   );
}
