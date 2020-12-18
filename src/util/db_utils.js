const logger = require("../util/logger");

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
  logger.debug(`util.db_utils.executeSql: Executing query: ${query}`);
  return new Promise((resolve, reject) => {
    connection.query(query, parameters, (error, result, fields) => {
      if (error) {
        logger.error(`util.db_utils.executeSql: ${error}`);
        reject(error);
      } else {
        logger.info(`util.db_utils.executeSql: Query returned ${result.length} results`);
        resolve(result);
      }
    });
  });
}

module.exports = {
  getDbOperation: getDbOperation,
  executeSql: executeSql
}
