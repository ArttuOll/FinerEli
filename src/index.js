const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
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

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors);

app.listen(port, host, () => {
  console.log(`Server running at ${host}:${port}`);
});
