import getSessionInfo from "@/utils/SessionInfo";
import PieChart from "@/components/charts/PieChart";
import LineChart from "@/components/charts/LineChart";
import BarDiagram from "@/components/charts/BarDiagram";

const fetchProducts = async (serverSession) => {
   const {
      user: { id },
   } = serverSession;

   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, {
      cache: "no-cache",
   });
   const data = await res.json();
   return data;
};

const fetchOrders = async () => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/orders`, {
      cache: "no-cache",
   });
   const data = await res.json();
   return data;
};

export default async function page() {
   const serverSession = await getSessionInfo();

   const products = await fetchProducts(serverSession);
   const orders = await fetchOrders(serverSession);
   return (
      <div className="flex flex-col gap-10">
         <div className="flex">
            <div className="pie w-1/3">
               <PieChart products={products} />
            </div>
            <div className="line w-2/3">
               <LineChart orders={orders} />
            </div>
         </div>

         <div className="flex">
            <div className="bar w-1/2">
               <BarDiagram />
            </div>
         </div>
      </div>
   );
}
