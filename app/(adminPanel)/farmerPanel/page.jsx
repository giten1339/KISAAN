import getSessionInfo from "@/utils/SessionInfo";
import PieChart from "@/components/charts/PieChart";
import LineChart from "@/components/charts/LineChart";

const fetchProducts = async (serverSession) => {
   const {
      user: { id },
   } = serverSession;

   const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${id}`,
      { cache: "no-cache" }
   );
   const data = await res.json();
   return data;
};

const fetchOrders = async (serverSession) => {
   const {
      user: { id },
   } = serverSession;

   const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/orders/${id}?type=farmer`,
      {
         cache: "no-cache",
      }
   );
   const data = await res.json();
   return data;
};

export default async function page() {
   const serverSession = await getSessionInfo();

   const orders = await fetchOrders(serverSession);
   const {
      user: { id },
   } = serverSession;

  
   const products = await fetchProducts(serverSession);
   return (
      <div className="flex">
         <div className="pie w-1/3">
            <PieChart products={products} />
         </div>
         <div className="bar w-2/3">
            <LineChart orders={orders} />
         </div>
      </div>
   );
}
