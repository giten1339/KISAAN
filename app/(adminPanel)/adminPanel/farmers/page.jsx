import React from "react";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import Link from "next/link";

const fetchFarmers = async () => {
   try {
      const data = await fetch(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/users?userType=farmer`
      );
      const farmers = await data.json();
      return farmers;
   } catch (error) {
      console.log(error);
   }
};

export default async function Farmers() {
   const farmers = await fetchFarmers();
   let count = 0;
   return (
      <div className="w-11/12 mx-auto">
         <div className="overflow-x-auto">
            <table className="table">
               <thead>
                  <tr>
                     <th></th>
                     <th>Image</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Phone</th>
                  </tr>
               </thead>
               <tbody>
                  {farmers.map((farmer) => (
                     <tr className="hover" key={farmer._id}>
                        <th>{++count}</th>
                        <td>
                           <Image
                              src={farmer.image}
                              alt="farmer image"
                              width={50}
                              height={50}
                           />
                        </td>
                        <td>{farmer.name}</td>
                        <td>{farmer.email}</td>
                        <td>{farmer.phone}</td>
                        <td>
                           {/* <TableActions id={farmer._id} /> */}
                           <Link href={`/adminPanel/farmers/`}>
                              <FaEye className="text-blue-500 text-2xl hover:cursor-pointer hover:scale-110 active:scale-100 transition-all duration-150 ease-in-out" />
                           </Link>{" "}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
