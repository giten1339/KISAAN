import React from "react";
import WishlistItem from "./shared/WishlistItem";
import { useContext } from "react";
import WishlistContext from "../context/WishlistContext";
export default function Wishlist() {
   const { wishlist } = useContext(WishlistContext);
   return (
      <div>
         {wishlist.map((item) => (
            <WishlistItem details={item} key={item._id} />
         ))}
      </div>
   );
}
