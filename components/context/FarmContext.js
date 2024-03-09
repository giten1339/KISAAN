"use client";
import React from "react";
import { createContext, useReducer, useEffect } from "react";
import FarmReducer from "./FarmReducer";

const FarmContext = createContext();

function FarmContextProvider({ children }) {
   const initialValues = {
      session: {
         status: "loading",
         data: {},
      },
      products: [],
   };

   //for managing global state
   const [state, dispatch] = useReducer(FarmReducer, initialValues);

   //for managing global session
   const setSession = (data = {}, status = "unauthenticated") => {
      try {
         dispatch({ type: "CHANGE_SESSION_STATE", payload: { data, status } });
      } catch (error) {
         console.log(error);
      }
   };

   //for managing products
   // this function will be called in the context
   const getAllProducts = async () => {
      try {
         const response = await fetch("/api/products");
         const data = await response.json();
         dispatch({ type: "GET_ALL_PRODUCTS", payload: data });
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllProducts();
   }, []);

   useEffect(() => {
      state.session.data?.user && state.session.data.user?.cart && initCart();
   }, [state.session]);

   return (
      <FarmContext.Provider
         value={{
            ...state,
            setSession,
         }}
      >
         {children}
      </FarmContext.Provider>
   );
}

export default FarmContext;
export { FarmContextProvider };
