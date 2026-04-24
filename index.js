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
    let allPasses = [];
    let cursor = "";

    do {
      const url = `https://inventory.roblox.com/v1/users/${userid}/assets/collectibles?assetType=GamePass&limit=100${cursor ? "&cursor=" + cursor : ""}`;
      const res2 = await fetch(url);
      const data = await res2.json();
      if (data.data) allPasses.push(...data.data);
      cursor = data.nextPageCursor || "";
    } while (cursor);

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
