const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

// Access environment variables
const ROBLOSECURITY = process.env.ROBLOSECURITY;


// Route to demonstrate using the Roblox cookie
app.get("/roblox", async (req, res) => {
  if (!ROBLOSECURITY) {
    return res.status(500).json({ error: "Roblox cookie not found" });
  }

  try {
    const response = await fetch("https://www.roblox.com/home", {
      method: "GET",
      headers: {
        Cookie: `.ROBLOSECURITY=${ROBLOSECURITY}`,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      },
    });

    const text = await response.text();
    res.send(text); // Return the response from Roblox
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});