import TableActions from "@/components/admin/shared/TableActions";
import getSessionInfo from "@/utils/SessionInfo";
import Link from "next/link";

const fetchProducts = async (id) => {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${id}`,
      {
         cache: "no-cache",
      }
   );
   const data = await res.json();
   return data;
};

export default async function Products() {
   const serverSession = await getSessionInfo();
   const {
      user: { id },
   } = serverSession;

   let count = 0;
   const products = await fetchProducts(id);
   return (
      <div className="w-11/12 mx-auto">
         <div className="text-right w-3/4 mx-auto mt-3">
            <Link
               className="py-1 px-3 rounded-md bg-main text-white border-2  border-main hover:text-main hover:bg-white transition-all duration-150 ease-in"
               href={"/farmerPanel/products/add"}
            >
               add
            </Link>
         </div>
         <div className="overflow-x-auto">
            <table className="table">
               <thead>
                  <tr>
                     <th></th>
                     <th>Product</th>
                     <th>Category</th>
                     <th>Price</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {products.map((product) => (
                     <tr className="hover" key={product._id}>
                        <th>{++count}</th>
                        <td>{product.name}</td>
                        <td>{product.category.name}</td>
                        <td>{product.price}</td>
                        <td>
                           <TableActions id={product._id} />
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
