import React from "react";
import Image from "next/image";
import Link from "next/link";

import ProductDetailsIcon from "@/components/products/ProductDetailsIcon";
import ImageDisplay from "@/components/products/ImageDisplay";

const fetchProduct = async (id) => {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/products?id=${id}`,
      {
         cache: "no-cache",
      }
   );
   const data = await res.json();
   return data;
};

export default async function page({ params: { slug: productId } }) {
   const product = await fetchProduct(productId);

   return (
      <div className="min-h-[90vh] mb-10">
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
                  <ProductDetailsIcon product={product} />
                  <div>
                     <h1 className="text-xl">Product Details</h1>
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Saepe, qui expedita dolor in explicabo illo maiores
                        quasi. Ex, optio harum.
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <br />
         <hr />
         <br />
         {/* farmer details */}
         <div className="flex justify-center my-5  ">
            <span className="text-3xl text-main group  transition duration-300 cursor-pointer">
               Farmer Details
               <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 bg-main"></span>
            </span>
         </div>
         <div className="w-3/4  mx-auto ">
            <div className="flex flex-1 items-center justify-end gap-10">
               <div>
                  <h1 className="text-2xl text-main font-semibold">
                     {product.farmer.name}
                  </h1>
                  <h3>{product.farmer.email}</h3>
               </div>
               <div className="rounded-full">
                  <Image
                     src={product.farmer.image}
                     alt="farmer image"
                     height={200}
                     width={200}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
