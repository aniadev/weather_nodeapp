require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

function counterConnection() {
  const data = fs.readFileSync("./src/logs/site-data.json", "utf8");
  const siteData = JSON.parse(data);
  let newData = {
    title: "Weather App",
    counter: siteData.counter + 1,
  };
  fs.writeFileSync("./src/logs/site-data.json", JSON.stringify(newData));
  console.log(JSON.stringify(newData));
}

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
      counterConnection();
      const result = await axios({
        method: "get",
        url: weatherUrl,
      });
      // console.log(result);
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

  app.get("/logs", (req, res) => {
    try {
      const data = fs.readFileSync("./src/logs/site-data.json", "utf8");
      const siteData = JSON.parse(data);
      res.json({
        success: true,
        message: "SUCCESS",
        status: 200,
        data: siteData,
      });
    } catch (error) {
      console.log(">>> / file: index.js / line 65 / error", error);
      res.json({
        success: false,
        status: 249,
        message: "SERVER ERROR",
      });
    }
  });
};

module.exports = routes;
