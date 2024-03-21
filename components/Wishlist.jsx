import React, { useContext } from 'react';
import collaborativeFiltering from '../algorithms/collaborativeFiltering.js';
import { WishlistContext } from '../context/wishlistContext';

function Wishlist() {
   const { wishlist } = useContext(WishlistContext);
   const recommendations = collaborativeFiltering(wishlist, currentUser);
  // Render your component here, using the recommendations
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