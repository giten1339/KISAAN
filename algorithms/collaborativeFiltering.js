// collaborativeFiltering.js
// A function to compute the Euclidean distance score between two users
function euclideanScore(itemsUser1, itemsUser2) {
  const commonItems = Object.keys(itemsUser1).filter(item => itemsUser2[item] !== undefined);
  if (commonItems.length === 0) return 0;

  let sumOfSquares = commonItems.reduce((sum, item) => {
    return sum + Math.pow(itemsUser1[item] - itemsUser2[item], 2);
  }, 0);

  return 1 / (1 + Math.sqrt(sumOfSquares));
}

// A function to get recommendations for a user
export function getRecommendations(users, currentUser) {
  const currentUserItems = users.find(user => user.userId === currentUser)?.items || {};
  const totals = {};
  const simSums = {};

  users.forEach(otherUser => {
    if (otherUser.userId === currentUser) return;
    const sim = euclideanScore(currentUserItems, otherUser.items);
    if (sim <= 0) return;
    Object.keys(otherUser.items).forEach(item => {
      if (!currentUserItems[item]) {
        totals[item] = (totals[item] || 0) + otherUser.items[item] * sim;
        simSums[item] = (simSums[item] || 0) + sim;
      }
    });
  });

  const rankings = Object.keys(totals).map(item => ({
    item,
    score: totals[item] / simSums[item]
  }));

  return rankings.sort((a, b) => b.score - a.score);
}
