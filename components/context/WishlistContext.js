"use client";
import React from "react";
import { createContext, useReducer, useEffect } from "react";
import FarmReducer from "./FarmReducer";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WishlistContext = createContext();

function WishlistContextProvider({ children, session }) {
   const initialValues = {
      wishlist: [],
   };

   const wishlistId = session ? session.user.wishlist : null;

   //for managing global state
   const [state, dispatch] = useReducer(FarmReducer, initialValues);

   //for managing carts
   const updateDbWishlist = async (wishlist) => {
      try {
         const response = await fetch(`/api/wishlists/${wishlistId}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ items: wishlist }),
         });
         return response;
      } catch (error) {
         console.log(error);
      }
   };

   const addToWishlist = async (item) => {
      try {
         let wishlist = state.wishlist;
         if (!wishlist.filter((wish) => wish._id === item._id).length > 0) {
            wishlist.push(item);
            dispatch({ type: "MANAGE_WISHLIST", payload: wishlist });
            toast.success("Item added to Wishlist !");

            await updateDbWishlist(wishlist);
         } else {
            // toast.warn("Item already in cart !");
            wishlist = wishlist.filter((wish) => wish._id !== item._id);
            dispatch({ type: "MANAGE_WISHLIST", payload: wishlist });
            toast.success("Item removed from Wishlist !");

            await updateDbWishlist(wishlist);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const removeFromWishlist = async (id = 1) => {
      let wishlist = state.wishlist;
      wishlist = wishlist.filter((item) => item._id !== id);
      console.log(wishlist);
      try {
         dispatch({ type: "MANAGE_WISHLIST", payload: wishlist });
         await updateDbWishlist(wishlist);
      } catch (error) {
         console.log(error);
      }
   };

   const initWishlist = async () => {
      try {
         const response = await fetch(`/api/wishlists/${wishlistId}`);
         const data = await response.json();

         dispatch({ type: "MANAGE_WISHLIST", payload: data.items });
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      if (wishlistId) initWishlist();
   }, [wishlistId]);

   return (
      <WishlistContext.Provider
         value={{
            ...state,
            addToWishlist,
            removeFromWishlist,
         }}
      >
         {children}
      </WishlistContext.Provider>
   );
}

export default WishlistContext;
export { WishlistContextProvider };
