// "use client";
// import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// const deleteProduct = async (id) => {
//    try {
//       const res = await fetch(`/api/products/${id}`, {
//          method: "DELETE",
//       });
//       if (res.status == 200) {
//          alert("item deleted");
//          revalidatePath("/farmerPanel/products");
//          redirect("/farmerPanel/products");
//       }
//    } catch (err) {
//       console.log(err);
//    }
// };

export default async function TableActions({ id }) {
   const deleteProduct = async () => {
      "use server";
      try {
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${id}`,
            {
               method: "DELETE",
            }
         );
         if (res.status == 200) {
            revalidatePath("/farmerPanel/products");
         }
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className="flex justify-start gap-4">
         <Link href={`/farmerPanel/products/${id}`}>
            <FaEye className="text-blue-500 text-xl hover:cursor-pointer hover:scale-110 active:scale-100 transition-all duration-150 ease-in-out" />
         </Link>{" "}
         <Link href={`/farmerPanel/products/update/${id}`}>
            <FaEdit className="text-gray-500 text-xl hover:cursor-pointer hover:scale-110 active:scale-100 transition-all duration-150 ease-in-out" />
         </Link>{" "}
         <form action={deleteProduct}>
            <button type="submit">
               <FaTrash className="text-red-500 text-xl hover:cursor-pointer hover:scale-110 active:scale-100 transition-all duration-150 ease-in-out" />
            </button>
         </form>{" "}
      </div>
   );
}
