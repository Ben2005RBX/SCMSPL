const express = require("express");
const fetch = require("node-fetch").default; // Use .default for node-fetch v3+
const app = express();
const port = process.env.PORT || 8080;

// Access environment variables
const ROBLOSECURITY = process.env.ROBLOSECURITY;

// Route to demonstrate using the Roblox cookie
app.get("/", async (req, res) => {
  if (!ROBLOSECURITY) {
    return res.status(500).json({ error: "Roblox cookie not found" });
  }

  try {
    const response = await fetch("https://www.roproxy.com/home", {
      method: "GET",
      headers: {
        Cookie: `.ROBLOSECURITY=${ROBLOSECURITY}`,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const text = await response.text();
    res.send(text); // Return the response from Roblox
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});