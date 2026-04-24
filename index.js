// index.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

app.get("/getpasses", async (req, res) => {
  const userid = req.query.userid;
  if (!userid) {
    return res.status(400).json({ error: "missing userid" });
  }
  try {
    const gameRes = await fetch(`https://games.roblox.com/v2/users/${userid}/games`);
    const gamesData = await gameRes.json();
    const games = gamesData.data || [];

    let allPasses = [];
    for (const game of games) {
      const universeId = game.id;
      const passRes = await fetch(`https://games.roblox.com/v1/games/${universeId}/game-passes?sortOrder=Asc&limit=100`);
      const passData = await passRes.json();
      if (passData.data) {
        allPasses.push(...passData.data);
      }
    }

    res.json({
      userid,
      totalPasses: allPasses.length,
      passes: allPasses
    });
  } catch (err) {
    res.status(500).json({ error: "failed to fetch data" });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("running"));
