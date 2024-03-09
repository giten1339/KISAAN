import PaymentForm from "@/components/profile/checkout/PaymentForm";

import getSessionInfo from "@/utils/SessionInfo";

const getAllProducts = async () => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, {
      cache: "no-store",
   });
   const data = await res.json();
   return data;
};

export default async function Checkout() {
   const products = await getAllProducts();

   const serverSession = await getSessionInfo();
   const {
      user: { id },
   } = serverSession;
   return <PaymentForm userId={id} products={products} />;
}
