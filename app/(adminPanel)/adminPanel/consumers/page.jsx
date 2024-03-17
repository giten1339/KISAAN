// Importing necessary modules
import React from "react";
import Image from "next/image";

// Function to fetch consumer data asynchronously
const fetchConsumers = async () => {
   try {
      // Fetching consumer data from the server API
      const data = await fetch(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/users?userType=consumer`,
         { cache: "no-cache" }
      );
      // Parsing the fetched data as JSON
      const consumers = await data.json();
      // Returning the consumer data
      return consumers;
   } catch (error) {
      // Logging any errors that occur during the fetching process
      console.log(error);
   }
};

// Exporting Consumers component
export default async function Consumers() {
   // Fetching consumers data
   const consumers = await fetchConsumers();
   // Initializing count for numbering consumers
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
                  {/* Mapping through each consumer to display their details */}
                  {consumers.map((consumer) => (
                     <tr className="hover" key={consumer._id}>
                        <th>{++count}</th>
                        <td>
                           {/* Displaying consumer image */}
                           <Image
                              src={consumer.image}
                              alt="consumer image"
                              width={50}
                              height={50}
                           />
                        </td>
                        <td>{consumer.name}</td>
                        <td>{consumer.email}</td>
                        <td>{consumer.phone}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
