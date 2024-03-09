import React from "react";
import "@/assets/css/shop.css";
import ProductDisplay from "@/components/shop/ProductDisplay";

const getAllProducts = async () => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, {
      cache: "no-store",
   });
   const data = await res.json();
   return data;
};

const getCategories = async () => {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/categories`,
      {
         cache: "no-store",
      }
   );
   const data = await res.json();
   return data;
};

export default async function page() {
   const products = await getAllProducts();
   const categories = await getCategories();

   return (
      <div>
         {/* banner */}
         <div className={`w-full h-96 bg-img`}>
            <div className="text-white z-[19] relative pt-10 px-10">
               <p className="text-xl w-1/2 mt-3">
                  Eat food that is grown, not made. Nourish your body with the
                  goodness nature provides.
               </p>
               <div className="text-3xl w-fit absolute h-full left-1/2 top-56 transform -translate-x-1/2 -translate-y-1/2">
                  SHOP
               </div>
            </div>
         </div>

         {/* products  and  filter*/}
         <ProductDisplay products={products} categories={categories} />
      </div>
   );
}
