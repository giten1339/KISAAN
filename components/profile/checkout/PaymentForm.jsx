"use client";
import { useContext, useEffect, useState } from "react";
import CartContext from "@/components/context/CartContext";
import CheckoutItem from "@/components/profile/CheckoutItem";
import Image from "next/image";
import { useRouter } from "next/navigation";

import esewa from "@/assets/images/esewa.png";
import fonepay from "@/assets/images/fonepay.png";
import ethereum from "@/assets/images/ethereum.png";

import Esewa from "@/components/payment/Esewa";
import Fonepay from "@/components/payment/Fonepay";
import { submitForm } from "@/components/payment/Fonepay";
import { connectWeb3Metamask, pay } from "@/web3functions/function";

import ShippingForm from "@/components/profile/checkout/ShippingForm";
import ProductCard from "@/components/products/ProductCard";
import { addVerificationDetails } from "@/components/payment/VerificationDetails";

export default function PaymentForm({ userId, products }) {
   const router = useRouter();

   const { cart } = useContext(CartContext);
   const [total, setTotal] = useState();
   const [checkoutClicked, setCheckoutClicked] = useState(false);
   const [shippingSuccess, setShippingSuccess] = useState(false);
   const [shippingId, setShippingId] = useState("");

   //use effect

   useEffect(() => {
      const totalAmount = cart.reduce((acc, item) => {
         const itemTotal = +item.price * +item.quantity;
         return acc + itemTotal;
      }, 0);

      setTotal(totalAmount);
   }, [cart]);

   const cartCheckoutClicked = () => {
      setCheckoutClicked(true);
      //handle payment method
      // shippingSuccess &&
      // document.querySelectorAll("input[type=radio]").forEach((item) => {
      //    if (item.checked) {
      //       if (item.id === "esewa") {
      //          Esewa(total);
      //       } else if (item.id === "fonepay") {
      //          submitForm(total);
      //       } else if (item.id === "ethereum") {
      //          (async () => {
      //             const { instance, accounts } = await connectWeb3Metamask();
      //             const totalInEth = total * 0.0000041; // 1 rupee = 0.0000041 eth
      //             const result = await pay(
      //                instance,
      //                accounts[0],
      //                totalInEth
      //             );
      //             if (result.status) {
      //                router.push(
      //                   `/profile/checkout/successful?RC=successful&blockNumber=${result.blockNumber}`
      //                );
      //             }
      //          })();
      //       }
      //    }
      // });
   };

   useEffect(() => {
      if (shippingSuccess) {
         document.querySelectorAll("input[type=radio]").forEach((item) => {
            if (item.checked) {
               localStorage.setItem("shippingId", shippingId);

               if (item.id === "esewa") {
                  Esewa(total);
               } else if (item.id === "fonepay") {
                  submitForm(total);
               } else if (item.id === "ethereum") {
                  (async () => {
                     const { instance, accounts } = await connectWeb3Metamask();
                     const totalInEth = total * 0.0000041; // 1 rupee = 0.0000041 eth
                     const result = await pay(
                        instance,
                        accounts[0],
                        totalInEth
                     );
                     if (result.status) {
                        //adds verification details to the database
                        await addVerificationDetails(
                           result.blockNumber,
                           userId
                        );

                        router.push(
                           `/profile/checkout/successful?blockNumber=${result.blockNumber}`
                        );
                     }
                  })();
               }
            }
         });
      }
   }, [shippingSuccess, checkoutClicked]);

   return (
      <div>
         <div className="flex gap-3 my-10">
            <div className="w-1/2 px-8 ">
               <h1>Contact Information</h1>
               <h2>Shipping Details</h2>
               <br />
               <ShippingForm
                  checkoutClicked={checkoutClicked}
                  setCheckoutClicked={setCheckoutClicked}
                  setShippingSuccess={setShippingSuccess}
                  setShippingId={setShippingId}
               />
            </div>
            <div className="w-full border-l-2">
               <div className="text-center">
                  <h2 className="text-xl text-main">Payment Details</h2>
                  <div>
                     {cart.map((item) => (
                        <CheckoutItem details={item} key={item._id} />
                     ))}
                  </div>
                  <hr />
                  <div className="payments my-10">
                     <h1 className="text-xl text-main ">Payment Method</h1>
                     <div className="text-left -my-5 mx-5">
                        {/* foenpay */}
                        <div className="flex items-center">
                           <input
                              type="radio"
                              name="radio-1"
                              className="radio radio-success"
                              id="fonepay"
                           />
                           <label htmlFor="fonepay">
                              <Image
                                 src={fonepay}
                                 height={0}
                                 width={0}
                                 alt="fonepay"
                                 style={{
                                    width: "120px",
                                    height: "70px",
                                    objectFit: "contain",
                                 }}
                              />
                           </label>
                        </div>

                        {/* esewa */}
                        {/* <div className="flex items-center">
                           <input
                              type="radio"
                              name="radio-1"
                              className="radio radio-success"
                              id="esewa"
                           />
                           <label htmlFor="esewa">
                              <Image
                                 src={esewa}
                                 alt="esewa"
                                 height={0}
                                 width={0}
                                 style={{
                                    width: "100px",
                                    height: "70px",
                                    objectFit: "contain",
                                 }}
                              />{" "}
                           </label>
                        </div> */}

                        {/* ethereum */}
                        <div className="flex items-center">
                           <input
                              type="radio"
                              name="radio-1"
                              className="radio radio-success"
                              id="ethereum"
                           />
                           <label htmlFor="ethereum">
                              <Image
                                 src={ethereum}
                                 alt="ethereum"
                                 height={0}
                                 width={0}
                                 style={{
                                    width: "100px",
                                    height: "70px",
                                    objectFit: "contain",
                                 }}
                              />{" "}
                           </label>
                        </div>
                     </div>
                  </div>
                  <>
                     <button
                        className={`py-2 px-3 rounded-md bg-main border-2 border-main  text-white transition-all duration-200 ease-in-out hover:bg-slate-200 hover:text-main hover:font-bold ${
                           cart.length == 0 && "bg-gray-400"
                        }`}
                        onClick={cartCheckoutClicked}
                        disabled={cart.length == 0}
                     >
                        checkout
                     </button>
                     <div>
                        <Fonepay
                           total={total}
                           userId={userId}
                           shippingId={shippingId}
                        />
                     </div>
                  </>
               </div>
            </div>{" "}
         </div>
         {/* recommendation */}
         <hr />
         {cart.length > 0 && (
            <>
               <h1 className="text-2xl text-main  text-center my-10">
                  {" "}
                  Similar Products{" "}
               </h1>
               <div className="w-fit mx-auto flex flex-wrap">
                  {products.slice(0, 4).map((item) => (
                     <ProductCard data={item} key={item._id} />
                  ))}
               </div>
            </>
         )}
      </div>
   );
}
