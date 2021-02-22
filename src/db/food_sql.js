const mysql = require("mysql");
const dbUtils = require("../util/db_utils");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

/*
 * Koko ohjelman käyttämä tietokantayhteys. Tietokannan on oltava
 * MySQL/MariaDB-tietokanta.
 * @exports
 */
const connection = mysql.createConnection({
  host: process.env.HOSTNAME,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

/*
 * Hakee tietokannasta ruokia käyttäjän antaman hakusanan perusteella. Hakusana
 * voi esiintyä missä tahansa kohtaa ruoan nimeä. Tulokset palautetaan ruokien
 * id:n mukaan järjestettynä.
 * @exports
 */
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

/*
 * Hakee tietokannasta ruoan komponentit ruoan id:n perusteella. Eri
 * komponentteja on yhteensä 74 ja ne on järjestetty komponentin luokan
 * perusteella.
 * @exports
 */
function selectFoodComponents(foodId) {
  const query = `
                SELECT cv.FOODID AS foodid,
                        cn.DESCRIPT AS description,
                        cv.BESTLOC AS value,
                        c2.compunit AS unit_abbrev,
                        c2.CMPCLASSP AS component_class,
                        c3.DESCRIPT AS unit
                FROM component_value cv
                JOIN component_names cn ON cn.THSCODE = cv.EUFDNAME
                JOIN component c2 ON c2.EUFDNAME = cv.EUFDNAME
                JOIN compunit c3 ON c3.THSCODE = c2.COMPUNIT
                WHERE cv.FOODID = ?
                ORDER BY c2.CMPCLASSP;
                 `;
  return dbUtils.executeSql(connection, query, [foodId]);
}

module.exports = {
  selectLike: selectLike,
  selectFoodComponents: selectFoodComponents,
  connection: connection,
};
