"use client";
import { useEffect, useState } from "react";
import "@/assets/css/status.css";

let orderId;

//udpatates the status in the db every time the status is changed
const updateStatus = async (status) => {
   try {
      const res = await fetch(`/api/orders?orderId=${orderId}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(status),
      });
   } catch (error) {
      console.log(error);
   }
};

//gets the status of the order from the db and sets the status
const getStatus = async () => {
   try {
      const res = await fetch(`/api/orders?orderId=${orderId}`, {
         cache: "no-store",
      });
      const [{ status }] = await res.json();
      console.log("status", status);
      if (status === "Dispatched") {
         setStatus(1);
      } else if (status === "Received") {
         setStatus(2);
      }
   } catch (error) {
      console.log(error);
   }
};

const setStatus = (index) => {
   const steps = document.querySelectorAll(".step");
   if (steps[index].classList.contains("step-success")) {
      if (
         steps[index + 1] &&
         steps[index + 1].classList.contains("step-success")
      ) {
         for (let i = steps.length - 1; i > index; i--) {
            steps[i].classList.remove("step-success");
         }
      } else {
         steps[index].classList.toggle("step-success");
      }
   } else {
      for (let i = 1; i <= index; i++) {
         steps[i].classList.add("step-success");
      }
   }

   if (steps[index].classList.contains("step-success")) {
      updateStatus(steps[index].textContent);
   } else {
      updateStatus(steps[index - 1].textContent);
   }
};

export default function OrderStatus({ orderId: idOrder }) {
   useEffect(() => {
      orderId = idOrder;
      getStatus();
   }, []);
   return (
      <ul className="steps">
         <li className="status step text-xs px-1 step-success"> Confirmed</li>
         <li className="status step text-xs px-1" onClick={() => setStatus(1)}>
            Dispatched
         </li>
         <li className="status step text-xs px-1" onClick={() => setStatus(2)}>
            Received
         </li>
      </ul>
   );
}
