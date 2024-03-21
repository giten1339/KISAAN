// A function to compute the Euclidean distance score between two users
function euclideanScore(users, user1, user2) {
  const itemsUser1 = users[user1];
  const itemsUser2 = users[user2];

  // Returns 0 if they have no ratings in common
  const commonItems = Object.keys(itemsUser1).filter(item => itemsUser2[item] !== undefined);
  if (commonItems.length === 0) return 0;

  // Add up the squares of all the differences
  let sumOfSquares = commonItems.reduce((sum, item) => {
    return sum + Math.pow(itemsUser1[item] - itemsUser2[item], 2);
  }, 0);

  return 1 / (1 + Math.sqrt(sumOfSquares));
}

// A function to get recommendations for a user
function getRecommendations(users, user) {
  const totals = {};
  const simSums = {};
  for (let otherUser in users) {
    if (otherUser === user) continue;
    const sim = euclideanScore(users, user, otherUser);
    if (sim <= 0) continue;
    for (let item in users[otherUser]) {
      // Only score items the user hasn't seen yet
      if (users[user][item] === undefined) {
        // Similarity * Score
        totals[item] = totals[item] || 0;
        totals[item] += users[otherUser][item] * sim;
        // Sum of similarities
        simSums[item] = simSums[item] || 0;
        simSums[item] += sim;
      }
    }
  }

  // Create the normalized list
  const rankings = [];
  for (let item in totals) {
    rankings.push({
      item: item,
      score: totals[item] / simSums[item]
    });
  }

  // Return the sorted list
  return rankings.sort((a, b) => b.score - a.score);
}

export default function collaborativeFiltering(users, user) {
  return getRecommendations(users, user);
}