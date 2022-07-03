const routes = function (app) {
  app.get("/", (req, res) => {
    res.sendFile("./index.html", { root: __dirname });
  });
};

module.exports = routes;
