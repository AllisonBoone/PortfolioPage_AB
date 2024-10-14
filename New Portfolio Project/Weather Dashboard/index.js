import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/weather', async (req, res) => {
  const city = req.query.city || "St. John's";
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`
    );
    const weatherDate = response.data;
    res.render('weather', { weather: weatherData });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving weather data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
