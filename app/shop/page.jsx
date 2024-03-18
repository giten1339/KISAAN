import React from "react";
import "@/assets/css/shop.css"; // Importing the CSS file
import ProductDisplay from "@/components/shop/ProductDisplay"; // Importing the ProductDisplay component

// Function to fetch all products from the API
const getAllProducts = async () => {
   try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, {
         cache: "no-store",
      });
      const data = await res.json();
      return data;
   } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Returning an empty array if there's an error
   }
};

// Function to fetch categories from the API
const getCategories = async () => {
   try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/categories`, {
         cache: "no-store",
      });
      const data = await res.json();
      return data;
   } catch (error) {
      console.error("Error fetching categories:", error);
      return []; // Returning an empty array if there's an error
   }
};

// Page component
export default async function Page() {
   try {
      // Fetching products and categories
      const products = await getAllProducts();
      const categories = await getCategories();

      return (
         <div>
            {/* Banner */}
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

            {/* Product Display component */}
            <ProductDisplay products={products} categories={categories} />
         </div>
      );
   } catch (error) {
      console.error("Error rendering page:", error);
      return <div>Error rendering page. Please try again later.</div>; // Rendering an error message if there's an error
   }
}
