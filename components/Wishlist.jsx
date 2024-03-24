// wishlist.jsx
import React, { useContext, useEffect, useState } from 'react';
import { getRecommendations } from '../algorithms/collaborativeFiltering.js';
import { WishlistContext } from '../context/wishlistContext';

function Wishlist() {
   const { wishlist } = useContext(WishlistContext);
   const [recommendations, setRecommendations] = useState([]);
   const currentUser = getCurrentUserId; 
   
   useEffect(() => {
      const recommendations = getRecommendations(wishlist, currentUser);
      setRecommendations(recommendations);
   }, [wishlist, currentUser]);

   return (
      <div>
         {wishlist.map((item) => (
            <WishlistItem details={item} key={item._id} />
         ))}
         <h2>Recommended for you</h2>
         {recommendations.map((item) => (
            <WishlistItem details={item} key={item._id} />
         ))}
      </div>
   );
}

export default Wishlist;
