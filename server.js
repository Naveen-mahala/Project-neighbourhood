const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());

// Helper: scoring function
function scoreNeighborhood(user, n) {
  let score = 0;
  // Commute: closer to user value is better
  score -= Math.abs(n.commute - user.commute);
  // Crime: exact match best, then medium, then high
  if (user.crime === n.crime) score += 10;
  else if (user.crime === 'low' && n.crime === 'medium') score += 5;
  else if (user.crime === 'high' && n.crime === 'medium') score += 5;
  // Green spaces
  if (user.green === n.green) score += 8;
  else if (user.green === 'high' && n.green === 'medium') score += 4;
  else if (user.green === 'low' && n.green === 'medium') score += 4;
  // Cost of living
  if (user.cost === n.cost) score += 7;
  else if (user.cost === 'low' && n.cost === 'medium') score += 3;
  else if (user.cost === 'high' && n.cost === 'medium') score += 3;
  // Internet
  if (user.internet === n.internet) score += 6;
  else if (user.internet === 'high' && n.internet === 'medium') score += 3;
  else if (user.internet === 'low' && n.internet === 'medium') score += 3;
  return score;
}

app.post('/api/match', (req, res) => {
  const user = req.body;
  fs.readFile(path.join(__dirname, 'neighborhoods.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Data not found' });
    let neighborhoods = JSON.parse(data);
    neighborhoods.forEach(n => {
      n._score = scoreNeighborhood(user, n);
    });
    neighborhoods.sort((a, b) => b._score - a._score);
    res.json(neighborhoods.slice(0, 3));
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 