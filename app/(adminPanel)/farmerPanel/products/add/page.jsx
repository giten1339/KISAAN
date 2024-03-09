import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//form
import From from "@/components/admin/products/Form";

const fetchCategories = async () => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/categories`,
         { cache: "no-cache" }
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

   const image = `${data.get("imageData")}`;
   const serverSession = await getServerSession(authOptions);
   const tags = data.get("tags").split(",");
   const product = {
      name: data.get("productName"),
      tags,
      price: data.get("price"),
      quantity: data.get("quantity"),
      category: data.get("category"),
      image: JSON.parse(image),
      description: data.get("description"),
      farmer: serverSession.user.id,
   };

   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(product),
      headers: {
         "Content-Type": "application/json",
      },
   });

   if (res.status == 201) {
      revalidatePath(`/farmerPanel/products`);
      redirect(`/farmerPanel/products`);
   }
};

export default async function AddProduct() {
   const serverSession = await getServerSession(authOptions);

   const categories = await fetchCategories();
   return <From categories={categories} submitForm={submitForm} />;
}
