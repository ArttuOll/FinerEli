const mysql = require("mysql");
const dbUtils = require("../util/db_utils");
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
  const query = `
                SELECT f.FOODID AS food_id,
                       f.FOODNAME AS name
                FROM foodname f
                WHERE f.FOODNAME LIKE ?
                ORDER BY f.FOODID;
                `;
  const parameters = "%" + queryParameter + "%";
  return dbUtils.executeSql(connection, query, [parameters]);
}

function selectFoodComponents(foodId) {
  const query = `
                SELECT cv.FOODID AS foodid,
                        cn.DESCRIPT AS description,
                        cv.BESTLOC AS value,
                        c2.compunit AS unit_abbrev,
                        c3.DESCRIPT AS unit
                FROM component_value cv
                JOIN component_names cn ON cn.THSCODE = cv.EUFDNAME
                JOIN component c2 ON c2.EUFDNAME = cv.EUFDNAME
                JOIN compunit c3 ON c3.THSCODE = c2.COMPUNIT
                WHERE cv.FOODID = ?
                ORDER BY cn.DESCRIPT;
                 `;
  return dbUtils.executeSql(connection, query, [foodId]);
}

module.exports = {
  selectLike: selectLike,
  selectFoodComponents: selectFoodComponents
}
