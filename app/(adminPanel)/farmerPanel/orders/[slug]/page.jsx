import React from "react";

import OrderedItem from "@/components/admin/shared/OrderedItem";
import Image from "next/image";

const fetchOrder = async (orderId) => {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/orders?id=${orderId}`,
         { cache: "no-cache" }
      );
      const order = await res.json();
      return order;
   } catch (error) {
      console.log(error);
   }
};

export default async function ViewOrder({ params: { slug: orderId } }) {
   const { item, user } = await fetchOrder(orderId);
   return (
      <div>
         <OrderedItem item={item} user={user} orderId={orderId} />
      </div>
   );
}
