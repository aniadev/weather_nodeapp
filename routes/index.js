require("dotenv").config();
const axios = require("axios");

const routes = function (app) {
  app.get("/", (req, res) => {
    res.sendFile("./index.html", { root: __dirname });
  });

  app.get("/weather", async (req, res) => {
    const city = req.query?.city;
    const latitude = req.query?.lat;
    const longitude = req.query?.lon;
    const apiKey = process.env.WEATHER_API_KEY;
    try {
      let weatherUrl = "";
      if (city) {
        weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      } else if (latitude && longitude) {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      } else {
        throw Error("No city or coordinates provided");
      }
      console.log(weatherUrl);

      const result = await axios({
        method: "get",
        url: weatherUrl,
      });
      console.log(result);
      if (result?.status === 200) {
        res.json({
          success: true,
          message: "SUCCESS",
          status: 200,
          data: result.data,
        });
      } else {
        console.log(result);
        throw Error(result.status);
      }
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
    }
  });
};

module.exports = routes;
