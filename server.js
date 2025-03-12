const express = require("express");
const fetch = require("node-fetch").default; // Import node-fetch
const app = express();
const port = process.env.PORT || 8080;

// Route to fetch and return the CSRF token
app.get("/", async (req, res) => {
    try {
        const token = await getCSRFToken(); // Call the getCSRFToken function
        res.json({ csrfToken: token }); // Return the CSRF token as JSON
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message }); // Return error message
    }
});

// Function to fetch the CSRF token
async function getCSRFToken() {
    const ROBLOSECURITY = process.env.ROBLOSECURITY; // Access the cookie from environment variables

    if (!ROBLOSECURITY) {
        throw new Error("Roblox cookie not found in environment variables");
    }
    console.log(ROBLOSECURITY);

    const response = await fetch("https://www.roproxy.com/home", {
        method: "GET",
        headers: {
            Cookie: `.ROBLOSECURITY=${ROBLOSECURITY}`,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const text = await response.text();
    console.log(text);
    // Regex to extract the CSRF token from the page HTML
    const csrfTokenMatch = text.match(/data-token="([^"]+)"/);

    if (csrfTokenMatch) {
        return csrfTokenMatch[1]; // Return the CSRF token
    } else {
        throw new Error("Failed to extract CSRF token");
    }
}

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});