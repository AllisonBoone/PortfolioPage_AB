import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/weather', async (req, res) => {
  const city = req.query.city || "St. John's";
  const apiKey = process.env.OPENWEATHER_API_KEY;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}`
    );
    const weatherData = response.data;
    res.render('weather', { weather: weatherData });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving weather data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
