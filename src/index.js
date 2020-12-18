const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const foodRoutes = require("./routes/food_routes");
const logger = require("./util/logger");
const rateLimit = require("express-rate-limit");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 3001;
const host = process.env.HOST || "127.0.0.1";
const cors = (request, response, next) => {
  response.header("Acces-Control-Allow-Origin", "*");
  response.header("Acces-Control-Allow-Methods", "GET");
  response.header("Acces-Control-Allow-Headers", "Content-Type");
  next();
};
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10
});

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors);
app.use(morgan("combined", { stream: logger.stream }));
app.use(limiter);
app.use(foodRoutes);

app.listen(port, host, () => {
  console.log(`Server running at ${host}:${port}`);
});

module.exports = app;
