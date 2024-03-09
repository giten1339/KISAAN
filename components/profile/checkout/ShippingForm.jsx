"use client";
import { useEffect } from "react";
import { useFormik } from "formik";

export default function Form({
   checkoutClicked,
   setCheckoutClicked,
   setShippingSuccess,
   setShippingId,
}) {
   //initializing formik
   const { values, handleChange, handleSubmit, errors } = useFormik({
      initialValues: {
         address: "",
         city: "",
         province: "",
         postalCode: "",
      },
      onSubmit: async (values) => {
         // handle form submission here
         const { _id } = await addShippingDetails(values);
         setShippingId(_id);
         console.log("id", _id);

         setCheckoutClicked(false);
         setShippingSuccess(true);
      },
      validate: (values) => {
         const errors = {};

         if (!values.address) {
            errors.address = "Required";
         }
         if (!values.city) {
            errors.city = "Required";
         }
         if (!values.province) {
            errors.province = "Required";
         }
         if (!values.postalCode) {
            errors.postalCode = "Required";
         }
         return errors;
      },
   });

   const addShippingDetails = async (values) => {
      try {
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/shippings`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(values),
            }
         );
         const data = await res.json();
         return data;
      } catch (e) {
         console.log(e);
      }
   };

   //check if the checkout button is clicked in checkout page
   useEffect(() => {
      if (checkoutClicked) {
         handleSubmit();
      }
   }, [checkoutClicked]);

   return (
      <div>
         <form>
            <div className="relative z-0 w-full mb-6 group ">
               <input
                  type="text"
                  name="address"
                  id="address"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none   focus:outline-none focus:ring- peer"
                  placeholder=" "
                  value={values.address}
                  onChange={handleChange}
                  //onBlur={handleBlur}

                  // required
               />
               {errors.address && (
                  <div className="text-red-500">{errors.address}</div>
               )}

               <label
                  htmlFor="address"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
               >
                  Address <span className="text-red-500">*</span>
               </label>
            </div>

            <div className="grid grid-cols-3 gap-4">
               <div className="relative z-0 w-full mb-4 group">
                  <input
                     type="text"
                     name="city"
                     id="city"
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none   focus:outline-none focus:ring- peer"
                     placeholder=" "
                     value={values.city}
                     onChange={handleChange}
                     //onBlur={handleBlur}

                     // required
                  />
                  {errors.city && (
                     <div className="text-red-500">{errors.city}</div>
                  )}

                  <label
                     htmlFor="city"
                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                     City <span className="text-red-500">*</span>
                  </label>
               </div>

               <div className="relative z-0 w-full mb-4 pb-0 group">
                  <select
                     className="block appearance-none w-full bg-white border-gray-500 text-gray-500 border-b-2 px-4 py-[10px] pr-8 leading-tight focus:border-t-0 focus:border-x-0 "
                     name="province"
                     id="province"
                     value={values.province}
                     onChange={handleChange}
                     //onBlur={handleBlur}
                  >
                     <option value="false">select Province</option>
                     <option value={"1"}>Koshi Province</option>
                     <option value={"2"}>Madesh Province</option>
                     <option value={"3"}>Bagmati Province</option>
                     <option value={"4"}>Gandaki Province</option>
                     <option value={"5"}>Lumbini Province</option>
                     <option value={"6"}>Karnali Province</option>
                     <option value={"7"}>Sudurpashchim Province</option>
                  </select>
                  {errors.province && (
                     <div className="text-red-500">{errors.province}</div>
                  )}
               </div>

               <div className="relative z-0 w-full mb-4 group">
                  <input
                     type="number"
                     name="postalCode"
                     id="postalCode"
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none   focus:outline-none focus:ring- peer"
                     placeholder=" "
                     value={values.postalCode}
                     onChange={handleChange}
                     //onBlur={handleBlur}
                     // required
                  />
                  {errors.postalCode && (
                     <div className="text-red-500">{errors.postalCode}</div>
                  )}

                  <label
                     htmlFor="postalCode"
                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                     Postal Code <span className="text-red-500">*</span>
                  </label>
               </div>
            </div>
         </form>
      </div>
   );
}
