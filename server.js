
const express = require("express");
const axios = require("axios");

const app = express();

const API_KEY = process.env.RAPIDAPI_KEY;

app.get("/players", async (req, res) => {
    try {
        const response = await axios.get(
            "https://free-api-live-football-data.p.rapidapi.com/football-players-search",
            {
                headers: {
                    "x-rapidapi-key": API_KEY,
                    "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com"
                },
                params: {
                    search: req.query.search || "m"
                }
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

app.listen(process.env.PORT || 3000);
