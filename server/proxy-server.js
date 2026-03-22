const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const WEATHER_APIS = [
  (city, lat, lon) => `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
  (city, lat, lon) => `https://wttr.in/${city}?format=j1`,
];

app.get('/api/weather', async (req, res) => {
  const { city = '', lat, lon } = req.query;
  let lastError;

  for (const api of WEATHER_APIS) {
    try {
      const url = api(city, lat, lon);
      const response = await axios.get(url, { timeout: 4000 });
      return res.json(response.data);
    } catch (error) {
      lastError = error;
    }
  }
  res.status(500).json({ error: 'All weather APIs failed', detail: lastError?.message || lastError });
});

app.listen(PORT, () => {
  console.log(`Weather proxy running on http://localhost:${PORT}`);
});
