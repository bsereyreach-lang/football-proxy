const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 10000;
const API_KEY = process.env.API_KEY;

// API-Football base
const BASE_URL = "https://v3.football.api-sports.io";

/*
========================
 FIXTURES (matches)
========================
*/
app.get("/fixtures", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/fixtures`, {
            headers: {
                "x-apisports-key": API_KEY
            },
            params: {
                league: req.query.league || 39,   // default EPL
                season: req.query.season || 2024  // default season
            }
        });

        res.json(response.data);
    } catch (err) {
        res.status(500).json({
            error: "Failed to fetch fixtures",
            details: err.message
        });
    }
});

/*
========================
 LIVE MATCHES
========================
*/
app.get("/live", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/fixtures`, {
            headers: {
                "x-apisports-key": API_KEY
            },
            params: {
                live: "all"
            }
        });

        res.json(response.data);
    } catch (err) {
        res.status(500).json({
            error: "Failed to fetch live matches",
            details: err.message
        });
    }
});

/*
========================
 HEALTH CHECK
========================
*/
app.get("/", (req, res) => {
    res.send("Football Proxy Server Running ✅");
});

/*
========================
 START SERVER
========================
*/
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
