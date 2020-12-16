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
  let query = `SELECT cv.FOODID, f.FOODNAME, cn.DESCRIPT, cv.BESTLOC, c2.compunit FROM component_value cv 
              JOIN foodname f ON f.FOODID = cv.FOODID 
              JOIN component_names cn ON cn.THSCODE = cv.EUFDNAME 
              JOIN component c2 ON c2.EUFDNAME = cv.EUFDNAME 
              WHERE f.FOODNAME LIKE ?
              ORDER BY cv.FOODID;`;
  const parameters = "%" + queryParameter + "%";
  query = mysql.format(query, parameters);
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
  selectLike: selectLike
}
