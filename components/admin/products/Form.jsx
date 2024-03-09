"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { ProductSchema } from "@/models/yup/Product";
import ImageUpload from "./ImageUpload";

export default function From({ categories, submitForm, product = false }) {
   //submit
   const [images, setImages] = useState([]);
   const [imageData, setImageData] = useState([]);
   const [oldImages, setOldImages] = useState(product?.image || []);

   //formik initialized
   const { values, handleBlur, handleChange } = useFormik({
      initialValues: {
         productName: product?.name || "",
         tags: product?.tags?.join(", ") || "",
         quantity: product?.quantity || "",
         price: product?.price || "",
         category: product?.category?._id || "",
         description: product?.description || "",
      },
      // validationSchema: ProductSchema,
   });

   const uploadImages = async () => {
      try {
         let imageList = [];
         await Promise.all(
            images.map(async (image) => {
               const imageResponse = await fetch(image);
               const imageBlob = await imageResponse.blob();

               const formData = new FormData();
               formData.append("image", imageBlob);
               const imgbbRes = await fetch(
                  `https://api.imgbb.com/1/upload?key=c8d17bc39c6ea98676f5d7d2d882285d`,
                  {
                     method: "POST",
                     body: formData,
                  }
               );
               const imgbbParsed = await imgbbRes.json();

               imageList.push({
                  image: imgbbParsed.data.image?.url || null,
                  thumb: imgbbParsed.data.thumb?.url || null,
                  medium: imgbbParsed.data.medium?.url || null,
                  delete_url: imgbbParsed.data.delete_url,
               });
            })
         );
         setImageData(JSON.stringify([...oldImages, ...imageList])); // ya halka changes heru lyaunu parne xa
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      if (imageData.length > 0) {
         document.getElementById("submit-button").click();
      }
   }, [imageData]);

   return (
      <div className=" w-5/12 relative top-10 mx-auto border-solid border-2 border-sky-500 px-10 py-6 rounded-lg  shadow-2xl mb-20">
         <form action={submitForm}>
            <div className="relative z-0 w-full mb-6 group ">
               <input
                  type="text"
                  name="productName"
                  id="productName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none   focus:outline-none focus:ring- peer"
                  placeholder=" "
                  value={values.productName}
                  onChange={handleChange}
                  //onBlur={handleBlur}

                  // required
               />
               <label
                  htmlFor="productName"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
               >
                  Product Name{" "}
               </label>
            </div>

            <div className="relative z-0 w-full mb-6 group my-8">
               <input
                  type="text"
                  name="tags"
                  id="tags"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none   focus:outline-none focus:ring- peer"
                  placeholder=" "
                  value={values.tags}
                  onChange={handleChange}
                  //onBlur={handleBlur}

                  // required
               />
               <label
                  htmlFor="tags"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
               >
                  Tags{" "}
               </label>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6 my-8">
               <div className="relative z-0 w-full mb-4 group">
                  <input
                     type="number"
                     name="quantity"
                     id="quantity"
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none   focus:outline-none focus:ring- peer"
                     placeholder=" "
                     value={values.quantity}
                     onChange={handleChange}
                     //onBlur={handleBlur}

                     // required
                  />
                  <label
                     htmlFor="quantity"
                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                     Quantity
                  </label>
               </div>

               <div className="relative z-0 w-full mb-4 group">
                  <input
                     type="number"
                     name="price"
                     id="price"
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none   focus:outline-none focus:ring- peer"
                     placeholder=" "
                     value={values.price}
                     onChange={handleChange}
                     //onBlur={handleBlur}
                     // required
                  />
                  <label
                     htmlFor="price"
                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                     Price
                  </label>
               </div>
            </div>

            <div className="relative z-0 w-full mb-6 group">
               <select
                  className="block appearance-none w-full bg-white border-gray-500 text-gray-500 border-b-2 px-4 py-2 pr-8 leading-tight focus:border-t-0 focus:border-x-0 "
                  name="category"
                  id="category"
                  value={values.category}
                  onChange={handleChange}
                  //onBlur={handleBlur}
               >
                  <option value={product?.category?._id || false}>
                     {product?.category?.name || "select category"}
                  </option>
                  {categories.map(
                     (category) =>
                        category._id !== product?.category?._id && (
                           <option value={category._id} key={category._id}>
                              {category.name}
                           </option>
                        )
                  )}
               </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                     className="fill-current h-4 w-4"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                  >
                     <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
               </div>
            </div>

            <div className="relative z-0 w-full mb-4 group">
               <textarea
                  className="textarea w-full h-24  border-gray-500"
                  placeholder="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
               ></textarea>
            </div>

            <div className="relative z-0 w-full mb-6 group">
               <ImageUpload
                  setImages={setImages}
                  oldImages={oldImages}
                  setOldImages={setOldImages}
               />
            </div>

            <div>
               <textarea
                  name="imageData"
                  id=""
                  cols="30"
                  rows="10"
                  defaultValue={`${imageData}`}
                  className="hidden"
               ></textarea>
            </div>

            <button
               type="button"
               className="text-white bg-main hover:text-main border-main border-2 mt-4 hover:text-bold hover:bg-white py-2 px-3 rounded-md w-full transition-all duration-200 ease-in-out box-border"
               onClick={uploadImages}
            >
               Submit
            </button>
            <button type="submit" className="hidden" id="submit-button">
               Submit
            </button>
         </form>
      </div>
   );
}
