// shop.jsx
import React, { useEffect, useState } from 'react';
import { getRecommendations } from '../../algorithms/collaborativeFiltering';

function Shop() {
   const [recommendations, setRecommendations] = useState([]);
   
   useEffect(() => {
      async function fetchUserData() {
         try {
            // Fetch user data from your backend API
            const users = await fetch('/api/users').then(res => res.json());
            const currentUser = getCurrentUserId; // Replace with the actual current user
            const recommendations = getRecommendations(users, currentUser);
            setRecommendations(recommendations);
         } catch (error) {
            console.error('Error fetching user data:', error);
         }
      }
      
      fetchUserData();
   }, []);

   return (
      <div>
         <h2>Recommended for you</h2>
         {recommendations.map((item) => (
            <div key={item.item}>{item.item}</div>
         ))}
      </div>
   );
}

export default Shop;
