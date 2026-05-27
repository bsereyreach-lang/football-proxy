const express = require("express")
const axios = require("axios")

const app = express()

const API_KEY = "c4f9df1c85ace48c411d65588bb8a7e5"

app.get("/live", async (req, res) => {
  try {
    const response = await axios.get(
      "https://v3.football.api-sports.io/fixtures?live=all",
      {
        headers: {
          "x-apisports-key": API_KEY
        }
      }
    )

    const matches = response.data.response.map(m => ({
      home: m.teams.home.name,
      away: m.teams.away.name,
      score: `${m.goals.home ?? 0}-${m.goals.away ?? 0}`,
      status: m.fixture.status.short,
      minute: m.fixture.status.elapsed || 0
    }))

    res.json(matches)

  } catch (err) {
    res.json([])
  }
})

app.listen(3000, () => console.log("Server running"))