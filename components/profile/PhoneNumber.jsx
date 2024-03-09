"use client";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import OtpInput from "react-otp-input";

import app from "@/utils/firebase/initialize";
import {
   getAuth,
   RecaptchaVerifier,
   signInWithPhoneNumber,
} from "firebase/auth";

export default function PhoneNumber({ userId }) {
   //states
   const [phone, setPhone] = useState();
   const [phoneNumber, setPhoneNumber] = useState();
   const [loading, setLoading] = useState(true);
   const [otpConfirmation, setOtpConfirmation] = useState();

   const [validPhone, setValidPhone] = useState(false);

   const [otp, setOtp] = useState();
   const [otpSent, setOtpSent] = useState(false);

   //firebase
   //recaptcha
   const auth = getAuth(app);

   useEffect(() => {
      const phoneRegex = /^(\977)(\d{3})(\d{7})$/;
      if (phoneRegex.test(phone)) {
         setValidPhone(true);
      } else {
         setValidPhone(false);
      }
   }, [phone]);

   const sendOtp = async () => {
      try {
         let recaptchaVerifier = await new RecaptchaVerifier(
            "recaptcha-container",
            {},
            auth
         );
         let confirmation = await signInWithPhoneNumber(
            auth,
            `+${phone}`,
            recaptchaVerifier
         );
         setOtpConfirmation(confirmation);
         setOtpSent(true);
      } catch (e) {
         console.log(e);
      }
   };

   const verifyOtp = async () => {
      try {
         let res = await otpConfirmation.confirm(otp);

         if (res) {
            registerPhone();
         }
      } catch (e) {
         toast.error("Invalid OTP");
         console.log(e);
      }
   };
   //firebase

   const registerPhone = async () => {
      try {
         // const formattedPhoneNumber = phone.replace(
         //    /^(\+977)(\d{3})(\d{7})$/,
         //    "$1-$2$3"
         // );

         const res = await fetch(`/api/users/${userId}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone }),
         });
         if (res.status == 200) {
            setPhoneNumber(phone);
            toast.success("Phone number registered successfully");
         }
      } catch (e) {
         console.log(e);
      }
   };

   const fetchPhone = async (id) => {
      try {
         const res = await fetch(`/api/users/${id}`);
         const data = await res.json();
         setPhoneNumber(data.phone);
         setLoading(false);
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      (async () => {
         await fetchPhone(userId);

         // setPhone(phone);
      })();
   }, []);

   return (
      <div>
         {loading && <span className="loading loading-dots loading-md"></span>}
         {phoneNumber !== "false" ? (
            <span>{phoneNumber}</span>
         ) : (
            <div>
               {!otpSent ? (
                  <div className="text-center">
                     <div>Please register your phone number.</div>
                     <div className="flex gap-2 my-3">
                        <PhoneInput
                           country={"np"}
                           value={phone}
                           onChange={setPhone}
                        />

                        <button
                           disabled={!validPhone}
                           className={`bg-main py-1 px-2 rounded-md text-white w-full ${
                              !validPhone && "bg-slate-300 opacity-80"
                           }`}
                           onClick={sendOtp}
                        >
                           submit
                        </button>
                     </div>
                     <div id="recaptcha-container"></div>
                  </div>
               ) : (
                  <div className="flex flex-col  items-center my-3">
                     <div>Please enter the otp sent to your phone </div>
                     <div className="flex gap-2 my-3">
                        <OtpInput
                           value={otp}
                           onChange={setOtp}
                           numInputs={6}
                           renderSeparator={<span>-</span>}
                           inputStyle={{
                              border: "1px solid #000000",
                              borderRadius: "5px",
                              padding: "2px",
                           }}
                           renderInput={(props) => <input {...props} />}
                           shouldAutoFocus={true}
                        />
                        <button
                           className="bg-main py-1 px-2 rounded-md text-white w-full"
                           onClick={verifyOtp}
                        >
                           submit
                        </button>
                     </div>
                  </div>
               )}
            </div>
         )}
      </div>
   );
}
