import ProductCard from "./ProductCard";

const getAllProducts = async () => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, {
      cache: "no-store",
   });
   const data = await res.json();
   return data;
};

export default async function Carousal() {
   const products = await getAllProducts();
   return (
      <>
         <div className="flex justify-center   ">
            <span className="text-3xl text-main group  transition duration-300 cursor-pointer">
               Featured Products
               <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 bg-main"></span>
            </span>
         </div>

         <div className="w-11/12 mx-auto flex">
            <div className="carousel">
               <div className="carousel-item">
                  {products.map((item) => (
                     <ProductCard data={item} key={item._id} />
                  ))}
               </div>
            </div>
         </div>
         <br />
         <br />
         <div className="flex justify-center   ">
            <span className="text-3xl text-main group  transition duration-300 cursor-pointer">
               Recent Products
               <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 bg-main"></span>
            </span>
         </div>
         <div className="w-11/12 mx-auto flex">
            <div className="carousel">
               <div className="carousel-item">
                  {products.map((item) => (
                     <ProductCard data={item} key={item._id} />
                  ))}
               </div>{" "}
            </div>
         </div>
      </>
   );
}
