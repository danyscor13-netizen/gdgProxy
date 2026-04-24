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
    // first we get all of the user's games
    const gameRes = await fetch(
      `https://games.roblox.com/v2/users/${userid}/games`
    );
    const gamesData = await gameRes.json();

    const games = gamesData.data || [];

    let allPasses = [];

    for (const game of games) {
      const universeId = game.id;

      const passRes = await passRes.json();

      if (passData.data) {
        allPasses.push(...passData.data);
      }
    }

    res.json({
      userId,
      totalPasses: allPasses.lenght,
      passes: allPasses
    });
  } catch (err) {
    res.status(500).json({ error: "failed to fetch data" });
  }
});

app.listen(3000, () => console.log("running"));
