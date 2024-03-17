"use client";
import React, { createContext, useReducer, useEffect } from "react";
import FarmReducer from "./FarmReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Context for managing wishlist state.
 */
const WishlistContext = createContext();

/**
 * Provider component for WishlistContext.
 * @param {Object} props - Component props.
 * @param {Object} props.children - Child components.
 * @param {Object} props.session - User session data.
 */
function WishlistContextProvider({ children, session }) {
   // Initial values for wishlist state
   const initialValues = {
      wishlist: [],
   };

   // Extract wishlist ID from user session
   const wishlistId = session ? session.user.wishlist : null;

   // Reducer for managing wishlist state
   const [state, dispatch] = useReducer(FarmReducer, initialValues);

   /**
    * Updates wishlist in the database.
    * @param {Array} wishlist - Updated wishlist.
    * @returns {Promise<Response>} - Fetch response.
    */
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

   /**
    * Adds an item to the wishlist.
    * @param {Object} item - Item to be added.
    */
   const addToWishlist = async (item) => {
      try {
         let wishlist = state.wishlist;
         if (!wishlist.some((wish) => wish._id === item._id)) {
            wishlist.push(item);
            dispatch({ type: "MANAGE_WISHLIST", payload: wishlist });
            toast.success("Item added to Wishlist !");
            await updateDbWishlist(wishlist);
         } else {
            wishlist = wishlist.filter((wish) => wish._id !== item._id);
            dispatch({ type: "MANAGE_WISHLIST", payload: wishlist });
            toast.success("Item removed from Wishlist !");
            await updateDbWishlist(wishlist);
         }
      } catch (error) {
         console.log(error);
      }
   };

   /**
    * Removes an item from the wishlist.
    * @param {string} id - ID of the item to be removed.
    */
   const removeFromWishlist = async (id) => {
      let wishlist = state.wishlist.filter((item) => item._id !== id);
      try {
         dispatch({ type: "MANAGE_WISHLIST", payload: wishlist });
         await updateDbWishlist(wishlist);
      } catch (error) {
         console.log(error);
      }
   };

   /**
    * Initializes the wishlist.
    */
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


/*
WishlistContext: Creates a React context for managing wishlist-related state and actions.

WishlistContextProvider: A provider component that wraps its children with the wishlist context. It initializes the wishlist state and provides functions to add and remove items from the wishlist.

Initial Values: Defines initial values for the wishlist state.

useReducer: Manages the wishlist state using a reducer function (FarmReducer) and initial values.

updateDbWishlist: Asynchronously updates the wishlist in the database.

addToWishlist: Adds an item to the wishlist, updates the state, and triggers a toast notification.

removeFromWishlist: Removes an item from the wishlist, updates the state, and triggers a toast notification.

initWishlist: Initializes the wishlist by fetching data from the backend API.

useEffect: Calls initWishlist when the component mounts or when the wishlist ID changes.

Context Provider: Provides the wishlist state and functions to its children components using the WishlistContext.Provider.

Overall, this code sets up a robust system for managing wishlist-related state and actions in a React application.







*/