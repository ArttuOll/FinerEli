const dbUtils = require("../util/db_utils");
const foodSql = require("../db/food_sql");

const query = `
              SELECT f.FOODID AS food_id,
                      f.FOODNAME AS name
              FROM foodname f
              WHERE f.FOODNAME LIKE "%ruisleipä%"
              ORDER BY f.FOODID;
              `;

describe("Db Connection Test", () => {
  describe("Execute Sql Query", () => {
    it("Should connect to db and perform a query without errors", () => {
      return dbUtils.executeSql(foodSql.connection, query).then(result => {
        result.should.be.an("array");
        result.length.should.be.eql(46);
      });
    });
  });
});
