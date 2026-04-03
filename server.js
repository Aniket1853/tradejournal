const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let trades = [];

// Add trade
app.post('/api/trades', (req, res) => {
  const trade = req.body;

  trade.profit = trade.type === "BUY"
    ? (trade.exit - trade.entry) * trade.lot
    : (trade.entry - trade.exit) * trade.lot;

  trades.push(trade);

  res.json({ message: "Trade added successfully" });
});

// Get trades
app.get('/api/trades', (req, res) => {
  res.json(trades);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
