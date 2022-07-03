const express = require("express");
const cors = require("cors");
const port = 8599;

// import Route
const Route = require("./routes");

const app = express();
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));

Route(app);

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT || port}!`)
);
