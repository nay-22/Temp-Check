const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000
const KEY = '82c210c089f14395ade204302230612'

app.use(express.json())
app.use(cors());

app.post('/getWeather', async (request, response) => {
    try {
        const weatherData = {};
        const cities = request.body.cities;
        for (const city of cities) {
            try {
                const apiRes = await axios.get(`https://api.weatherapi.com/v1/current.json?q=${city}`, {
                    headers: {
                        'key': KEY
                    }
                });
                const temp_c = apiRes.data.current.temp_c;
                weatherData[city] = `${temp_c}C`;
            } catch (error) {
                console.error(`Error fetching weather data for ${city}: ${error.message}`);
                weatherData[city] = 'N/A';
            }
        }
        console.log(cities);
        response.send({ "weather": weatherData });
    } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
    }
});



app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
})
