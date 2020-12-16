function getDbOperation(dbOperation, handleError) {
  return async (request, response) => {
    try {
      await dbOperation(request, response);
    } catch (error) {
      handleError(error, response);
    }
  };
}

function executeSql(connection, query, parameters = []) {
  console.log("Suoritetaan kysely: ", query);
  return new Promise((resolve, reject) => {
    connection.query(query, parameters, (error, result, fields) => {
      if (error) {
        console.log("VIRHE: ", error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  getDbOperation: getDbOperation,
  executeSql: executeSql
}
