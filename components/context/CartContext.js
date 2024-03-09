"use client";
import React from "react";
import { createContext, useReducer, useEffect, useState } from "react";
import FarmReducer from "./FarmReducer";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { revalidatePath } from "next/cache";

const CartContext = createContext();

function CartContextProvider({ children, session }) {
   const initialValues = {
      hideRightSidebar: true,
      cart: [],
      hideDropdown: true,
      sidebarType: null,
      registered: null,
   };

   // gets user and cart id from the session
   const cartId = session ? session.user.cart : null;
   const userId = session ? session.user.id : null;

   //for managing global state
   const [state, dispatch] = useReducer(FarmReducer, initialValues);
   const [cartt, setCartt] = useState([]);

   useEffect(() => {
      setCartt(state.cart);
   }, [state.cart]);

   //for managing cart state
   const changeSidebarState = (sidebarType) => {
      try {
         dispatch({
            type: "CHANGE_CART_STATE",
            payload: { hideRightSidebar: !state.hideRightSidebar, sidebarType },
         });
      } catch (error) {
         console.log(error);
      }
   };

   //for managing carts
   const updateDbCart = async (cart) => {
      try {
         const response = await fetch(`/api/carts/${cartId}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ items: cart }),
         });
         return response;
      } catch (error) {
         console.log(error);
      }
   };

   const addToCart = async (item, quantity = 1) => {
      try {
         let cart = state.cart;

         if (!cart.filter((cartItem) => cartItem._id === item._id).length > 0) {
            cart.push({ ...item, quantity });
            dispatch({ type: "MANAGE_CART", payload: cart });
            toast.success("Item added to cart !");

            await updateDbCart(cart);
         } else {
            toast.warn("Item already in cart !");
         }
      } catch (error) {
         console.log(error);
      }
   };

   const removeFromCart = async (id) => {
      let cart = state.cart;
      cart = cart.filter((item) => item._id !== id);
      try {
         dispatch({ type: "MANAGE_CART", payload: cart });
         await updateDbCart(cart);
      } catch (error) {
         console.log(error);
      }
   };

   const updateCart = async (id, quantity) => {
      try {
         let cart = state.cart;
         cart = cart.map((item) => {
            if (item._id === id) {
               return { ...item, quantity: quantity };
            } else {
               return item;
            }
         });
         dispatch({ type: "MANAGE_CART", payload: cart });
         await updateDbCart(cart);
      } catch (error) {
         console.log(error);
      }
   };

   // delete cart
   const deleteCart = async () => {
      try {
         dispatch({ type: "MANAGE_CART", payload: [] });
         await updateDbCart([]);
      } catch (error) {
         console.log(error);
      }
   };

   const initCart = async () => {
      try {
         const response = await fetch(`/api/carts/${cartId}`);
         const data = await response.json();
         dispatch({ type: "MANAGE_CART", payload: data.items });
      } catch (error) {
         console.log(error);
      }
   };

   //for managing dropdown
   const changeDropDownState = () => {
      try {
         dispatch({
            type: "CHANGE_DROPDOWN_STATE",
            payload: !state.hideDropdown,
         });
      } catch (error) {
         console.log(error);
      }
   };

   //for checking out cart
   const cartCheckout = async (shipping) => {
      try {
         // this will deduct product from the inventory
         state.cart.map((item) => {
            (async () => {
               const id = item._id;
               const quantity = item.quantity;
               const res = await fetch(
                  `/api/products/${id}?updateType=checkout`,
                  {
                     method: "PUT",
                     headers: {
                        "content-type": "application/json",
                     },
                     body: JSON.stringify({ quantity }),
                  }
               );
            })();
         });
         // this will create an order
         const res = await fetch(`/api/orders`, {
            method: "POST",
            headers: {
               "content-type": "application/json",
            },
            body: JSON.stringify({
               items: state.cart,
               user: userId,
               shipping,
            }),
         });
         if (res.status == 201) {
            deleteCart();
            revalidatePath("/profile");
         } else {
            toast.error("Register you phone number first !");
         }
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      if (cartId) initCart();
   }, [cartId]);

   return (
      <CartContext.Provider
         value={{
            ...state,
            changeSidebarState,
            addToCart,
            removeFromCart,
            updateCart,
            changeDropDownState,
            cartCheckout,
         }}
      >
         {children}
      </CartContext.Provider>
   );
}

export default CartContext;
export { CartContextProvider };
