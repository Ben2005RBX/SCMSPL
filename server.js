const express = require("express");
const fetch = require("node-fetch"); // Import node-fetch
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
    // Make an HTTP request to Roblox
    const response = await fetch("https://www.roproxy.com/home", {
      method: "GET",
      headers: {
        Cookie: `.ROBLOSECURITY=${ROBLOSECURITY}`,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      },
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Get the response text
    const text = await response.text();

    // Send the response back to the client
    res.send(text);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});