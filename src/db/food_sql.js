const mysql = require("mysql");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const connection = mysql.createConnection({
  host: process.env.HOSTNAME,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

function selectLike(queryParameter) {
  let query = `SELECT f.FOODID, f.FOODNAME FROM foodname f
               WHERE f.FOODNAME LIKE "%ruisleipä%"
               ORDER BY f.FOODID;`;
  const parameters = "%" + queryParameter + "%";
  query = mysql.format(query, parameters);
  return new Promise((resolve, reject) => {
    executeSql(query, resolve, reject);
  });
}

function selectFoodComponents(foodId) {
  let query = `SELECT cv.FOODID, cn.DESCRIPT, cv.BESTLOC, c2.compunit FROM component_value cv
                 JOIN component_names cn ON cn.THSCODE = cv.EUFDNAME
                 JOIN component c2 ON c2.EUFDNAME = cv.EUFDNAME WHERE cv.FOODID = 9
                 ORDER BY cn.DESCRIPT;`
  query = mysql.format(query, foodId);
  return new Promise((resolve, reject) => {
    executeSql(query, resolve, reject);
  });
}

function executeSql(query, resolve, reject, parameters = []) {
  console.log("Suoritetaan kysely: ", query);
  connection.query(query, parameters, (error, result, fields) => {
    if (error) {
      console.log("Virhe: ", error);
      reject(error);
    } else {
      console.log("Tulos: ", result);
      resolve(result);
    }
  });
}

module.exports = {
  selectLike: selectLike,
  selectFoodComponents: selectFoodComponents
}
