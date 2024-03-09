import React from "react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//form
import From from "@/components/admin/products/Form";

export default async function UpdateProudct({ params: { slug } }) {
   //

   const fetchCategories = async () => {
      try {
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/categories`
         );
         const data = await res.json();
         return data;
      } catch (err) {
         console.log(err);
      }
   };

   const fetchProduct = async (id) => {
      try {
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/products?id=${id}`,
            {
               cache: "no-cache",
            }
         );
         const data = await res.json();
         return data;
      } catch (err) {
         console.log(err);
      }
   };

   //

   const submitForm = async (data) => {
      "use server";
      // const productId = data.get("productId");

      const product = {
         name: data.get("productName"),
         tags: data.get("tags").split(","),
         price: data.get("price"),
         quantity: data.get("quantity"),
         category: data.get("category"),
         image: JSON.parse(data.get("imageData")),
      };

      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${slug}?updateType=update`,
         {
            method: "PUT",
            body: JSON.stringify(product),
            headers: {
               "Content-Type": "application/json",
            },
         }
      );

      if (res.status == 200) {
         revalidatePath(`/farmerPanel/products`);
         redirect(`/farmerPanel/products`);
      }
   };

   //

   const product = await fetchProduct(slug);
   const categories = await fetchCategories();
   return (
      <From categories={categories} submitForm={submitForm} product={product} />
   );
}
