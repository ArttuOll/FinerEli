function getDbOperation(dbOperation, handleError) {
  return async (request, response) => {
    try {
      await dbOperation(request, response);
    } catch (error) {
      handleError(error, response);
    }
  };
}

module.exports = {
  getDbOperationCallback: getDbOperation
}
