import React from "react";
import Image from "next/image";
import Link from "next/link";

import ImageDisplay from "@/components/products/ImageDisplay";

const fetchProduct = async (productId) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/products?id=${productId}`,
         { cache: "no-cache" }
      );
      const product = await res.json();
      return product;
   } catch (error) {
      console.log(error);
   }
};

export default async function View({ params: { slug: productId } }) {
   const product = await fetchProduct(productId);
   return (
      <div className=" w-3/4 mx-auto">
         {/* product details */}
         <div className="flex justify-center my-5  ">
            <span className="text-3xl text-main group  transition duration-300 cursor-pointer">
               Product Details
               <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 bg-main"></span>
            </span>
         </div>
         <div className="w-3/4 mx-auto">
            <div className="flex flex-1  gap-10 ">
               {/* product images */}
               <div>
                  <ImageDisplay product={product} />
               </div>

               <div className="details">
                  <h1 className="text-3xl font-semibold uppercase text-main font-serif my-3">
                     {product.name}
                  </h1>
                  <h3 className="text-lg font-semibold text-main">
                     Rs. {product.price}
                  </h3>
                  <h3>
                     Tags :{" "}
                     {product.tags.map((tag) => (
                        <Link href="#" className="hover:text-main">
                           {" "}
                           {tag} ,
                        </Link>
                     ))}
                  </h3>
                  <h3>
                     Category :{" "}
                     <Link href="#" className="hover:text-main">
                        {product.category.name}
                     </Link>
                  </h3>
                  <br />
                  <div>
                     <h1 className="text-xl">Product Details</h1>
                     <p>{product.description || "No description available"}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
