/*
 FinerEli - an extended Fineli API
 Copyright (C) 2020 Arttu Olli

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

/*
 * @author Arttu Olli
 * Defines an Express server and its configuration
*/

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

const port = process.env.PORT;
const host = process.env.HOST;
const cors = (request, response, next) => {
  response.header("Acces-Control-Allow-Origin", "*");
  response.header("Acces-Control-Allow-Methods", "GET");
  response.header("Acces-Control-Allow-Headers", "Content-Type");
  next();
};
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: process.env.RATELIMITINMINUTE
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
