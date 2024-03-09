"use client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function displayToast(type = "info", message) {
   switch (type) {
      case "success":
         toast.success(message);
         break;
      case "error":
         toast.error(message);
         break;
      case "info":
         toast.info(message);
         break;

      case "warning":
         toast.warning(message);
         break;
   }
}

export default function Toast({ type, message }) {
   displayToast(type, message);
}
