const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 10000;
const API_KEY = process.env.API_KEY;

// Base API-Football URL
const BASE_URL = "https://v3.football.api-sports.io";

// Get fixtures
app.get("/fixtures", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/fixtures`, {
            headers: {
                "x-apisports-key": API_KEY
            }
        });

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch fixtures" });
    }
});

// Live matches
app.get("/live", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/fixtures?live=all`, {
            headers: {
                "x-apisports-key": API_KEY
            }
        });

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch live matches" });
    }
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
