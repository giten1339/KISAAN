import React from "react";
import Image from "next/image";

const fetchConsumers = async () => {
   try {
      const data = await fetch(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/users?userType=consumer`,
         { cache: "no-cache" }
      );
      const consumers = await data.json();
      return consumers;
   } catch (error) {
      console.log(error);
   }
};

export default async function Consumers() {
   const consumers = await fetchConsumers();
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
                  {consumers.map((consumer) => (
                     <tr className="hover" key={consumer._id}>
                        <th>{++count}</th>
                        <td>
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
