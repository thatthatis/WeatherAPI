const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
const query = req.body.cityName;
const appID = "8a71f652394a2c1c6c0ef551d6xxxxxxx"; 
const units = "Imperial";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appID + "&units=" + units + ""
    https.get(url, function (response) {
    //console.log(response.statusCode);
    response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const humidity = weatherData.main.humidity;
        const icon = weatherData.weather[0].icon;
        const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@4x.png";
        res.write("<h1>The temperature in " + query +  " is " + temp + " degrees Fahrenheit.</h1>");
        res.write("<h2>The weather description is " + description + ".</h2>");
        res.write("<img src=" + iconUrl + ">");
        res.write("<h2>The humidity in " + query +  " is " + humidity + "%.</h2>");
        res.send()
        console.log("Temperature: " + temp);
        console.log("Description: " + description);
        console.log("Humidity: " + humidity);
    })
  })
})

app.listen(3000, function () {
    console.log("Server is running on port 3000.")
});

