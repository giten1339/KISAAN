import React, { useEffect, useState } from 'react';
import collaborativeFiltering from '../../algorithms/collaborativeFiltering';

function Shop() {
   const [recommendations, setRecommendations] = useState([]);
   
   useEffect(() => {
      async function fetchUserData() {
         // Fetch user data from your database
         const users = await fetch('/api/users').then(res => res.json());
         const currentUser = 'user1'; // Replace with the actual current user
         const recommendations = collaborativeFiltering(users, currentUser);
         setRecommendations(recommendations);
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