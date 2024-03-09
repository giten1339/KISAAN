"use client";
import { useState, useEffect } from "react";

import Image from "next/image";

export default function ImageDisplay({ product }) {
   const [mainImage, setMainImage] = useState(
      product.image[0].medium || product.image[0].image
   );
   return (
      <div>
         <div className="relative h-80 w-80 ">
            <Image
               src={mainImage}
               alt="product image"
               fill={true}
               style={{ objectFit: "contain" }}
               placeholder="blur"
               blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCA"
            />
         </div>
         <div className="group-image flex flex-wrap gap-1">
            {product.image.length > 1 &&
               product.image.map((img) => (
                  <div
                     className=" my-1 shadow-md"
                     onMouseEnter={(e) => {
                        setMainImage(img.medium || img.image);
                     }}
                  >
                     <Image
                        src={img.medium || img.image}
                        alt=" image"
                        height={100}
                        width={100}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCA"
                        style={{
                           objectFit: "contain",
                           height: "100px",
                           width: "100px",
                        }}
                     />
                  </div>
               ))}
         </div>
      </div>
   );
}
