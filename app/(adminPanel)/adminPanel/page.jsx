// Importing getSessionInfo function from SessionInfo utility
import getSessionInfo from "@/utils/SessionInfo";
// Importing components for different types of charts
import PieChart from "@/components/charts/PieChart";
import LineChart from "@/components/charts/LineChart";
import BarDiagram from "@/components/charts/BarDiagram";

// Function to fetch products data asynchronously
const fetchProducts = async (serverSession) => {
   // Extracting user ID from server session
   const {
      user: { id },
   } = serverSession;

   // Fetching products data from the server API
   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, {
      cache: "no-cache", // Setting cache control
   });
   // Parsing the fetched data as JSON
   const data = await res.json();
   // Returning the products data
   return data;
};

// Function to fetch orders data asynchronously
const fetchOrders = async () => {
   // Fetching orders data from the server API
   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/orders`, {
      cache: "no-cache", // Setting cache control
   });
   // Parsing the fetched data as JSON
   const data = await res.json();
   // Returning the orders data
   return data;
};

// Exporting page function
export default async function page() {
   // Fetching session information
   const serverSession = await getSessionInfo();

   // Fetching products and orders data
   const products = await fetchProducts(serverSession);
   const orders = await fetchOrders(serverSession);

   // Returning JSX to render the page
   return (
      <div className="flex flex-col gap-10">
         <div className="flex">
            {/* Rendering PieChart component */}
            <div className="pie w-1/3">
               <PieChart products={products} />
            </div>
            {/* Rendering LineChart component */}
            <div className="line w-2/3">
               <LineChart orders={orders} />
            </div>
         </div>

         <div className="flex">
            {/* Rendering BarDiagram component */}
            <div className="bar w-1/2">
               <BarDiagram />
            </div>
         </div>
      </div>
   );
}
