"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import binarySearch from "@/algorithms/binarySearch";

export default function ProductDisplay({ products, categories }) {
   const [filteredProducts, setFilteredProducts] = useState(products);
   const [checkedCategory, setCheckedCategory] = useState([]);

   const router = useRouter();

   //
   //for filtering the products according to category
   const filterProducts = (e) => {
      const category = e.target.value;
      if (e.target.checked) {
         setCheckedCategory([...checkedCategory, category]);
      } else {
         setCheckedCategory(
            checkedCategory.filter((item) => item !== category)
         );
      }
   };

   //
   //for checking the category from url
   const searchParams = useSearchParams();
   const categoryParam = searchParams.get("category");
   useEffect(() => {
      if (categoryParam) {
         filterProducts({ target: { value: categoryParam, checked: true } });
      }
   }, []);

   //
   //for filtering the products according to category
   useEffect(() => {
      if (checkedCategory.length == 0) {
         setFilteredProducts(products);
      } else {
         const filtered = products.filter((product) =>
            checkedCategory.includes(product.category.name)
         );
         const rest = products.filter(
            (product) => !checkedCategory.includes(product.category.name)
         );
         setFilteredProducts([...filtered, ...rest]);
      }
   }, [checkedCategory]);

   //
   //for sorting the products according to price
   const changePriceSorting = (e) => {
      const sort = e.target.value;
      if (sort == "high-to-low") {
         const filter = filteredProducts.sort((a, b) => b.price - a.price);
         setFilteredProducts(filter);
      } else if (sort == "low-to-high") {
         const filter = filteredProducts.sort((a, b) => a.price - b.price);
         setFilteredProducts(filter);
      }
      router.refresh();
   };

   //
   //for searching the products when search button is clicked
   const searchItem = (e) => {
      const search = e.target.previousSibling.value;
      const filter = filteredProducts.filter((product) =>
         product.name.toLowerCase().includes(search.toLowerCase())
      );
      const rest = filteredProducts.filter(
         (product) => !product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts([...filter, ...rest]);
      router.refresh();
   };

   return (
      <div>
         <div className="flex gap-8">
            {/* categories */}
            <div className="w-1/4 shadow-xl">
               <div className="mt-10 ml-10">
                  <ul>
                     {categories.map((category) => (
                        <li className="" key={category._id}>
                           <div className="form-control">
                              <label className="label cursor-pointer flex justify-start gap-5  w-fit">
                                 <input
                                    type="checkbox"
                                    className="checkbox checkbox-success"
                                    onChange={filterProducts}
                                    value={category.name}
                                    defaultChecked={
                                       categoryParam == category.name
                                    }
                                 />
                                 <span className="label-text ">
                                    {category.name}
                                 </span>
                              </label>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
            {/* products display */}
            <div className="w-11/12 mx-auto mt-5">
               {/* product filter */}

               <div className="flex  gap-2 mx-2">
                  <div className="flex w-1/2">
                     <input
                        type="text"
                        placeholder="Search"
                        className="px-2 w-full border-2 rounded-sm border-main focus:outline-none focus:ring-1 focus:ring-main transition duration-300 ease-in-out "
                     />
                     <button
                        className="w-fit bg-main  rounded-sm px-2 text-xl text-white border-2 border-main hover:bg-white hover:text-main transition duration-300 ease-in-out"
                        onClick={searchItem}
                     >
                        search
                     </button>
                  </div>

                  <div className="flex w-1/2">
                     <label className="label">
                        <span className="label-text">Sort By</span>
                     </label>
                     <select
                        className="select select-bordered w-full max-w-xs"
                        onChange={changePriceSorting}
                     >
                        <option value={false}>sort by</option>
                        <option value={"high-to-low"}>
                           Price: high to low
                        </option>
                        <option value={"low-to-high"}>
                           Price: Low to High
                        </option>
                     </select>
                  </div>
               </div>

               {/* products */}
               <div className="flex flex-wrap">
                  {filteredProducts.map((item) => (
                     <ProductCard data={item} key={item._id} />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
