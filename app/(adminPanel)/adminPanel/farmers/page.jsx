// Importing necessary modules
import React from "react";
import Image from "next/image"; // Importing Image component from Next.js
import { FaEye } from "react-icons/fa"; // Importing FaEye icon from React Icons
import Link from "next/link"; // Importing Link component from Next.js

// Function to fetch farmers data asynchronously
const fetchFarmers = async () => {
   try {
      // Fetching farmers data from the server API
      const data = await fetch(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/users?userType=farmer`
      );
      // Parsing the fetched data as JSON
      const farmers = await data.json();
      // Returning the farmers data
      return farmers;
   } catch (error) {
      // Logging any errors that occur during the fetching process
      console.log(error);
   }
};

// Exporting Farmers component
export default async function Farmers() {
   // Fetching farmers data
   const farmers = await fetchFarmers();
   // Initializing count for numbering farmers
   let count = 0;
   // Rendering the component
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
                  {/* Mapping through each farmer to display their details */}
                  {farmers.map((farmer) => (
                     <tr className="hover" key={farmer._id}>
                        <th>{++count}</th>
                        <td>
                           {/* Displaying farmer image */}
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
                           {/* Rendering a link to view farmer details */}
                           <Link href={`/adminPanel/farmers/`}>
                              {/* Adding eye icon */}
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
