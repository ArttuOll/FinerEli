function buildInsertQuery(parameters) {
  let sql = "INSERT IGNORE INTO ??(";
  const numberOfFields = Math.ceil(parameters.length / 2);
  sql = appendToStringNTimes(sql, numberOfFields, " ??,", " ??)");

  sql += " VALUES (";
  const numberOfValues = parameters.length / 2;
  sql = appendToStringNTimes(sql, numberOfValues, " ?,", " ?)");
  return sql;
}

function appendToStringNTimes(string, times, base, end) {
  while (times > 0) {
    if (times === 1) {
      string += end;
    } else {
      string += base;
    }
    times--;
  }
  return string;
}

function buildSelectQuery(parameters) {
  let sql = "SELECT * FROM ?? WHERE 1=1";

  /*
   Jaetaan kahdella, koska tarkoitus on laskea WHERE-lausekkeiden
   tunnisteiden määrä, mutta taulukko where sisältää sekä where-lausekkeiden tunnisteet että
   arvot.
   */
  let whereClauses = parameters.length / 2;
  while (whereClauses > 0) {
    sql += " AND ?? = ?";
    whereClauses--;
  }
  return sql;
}

module.exports = {
  buildInsertQuery: buildInsertQuery,
  buildSelectQuery: buildSelectQuery
}
