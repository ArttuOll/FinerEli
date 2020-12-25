const sql = require("../db/food_sql");
const sqlOperations = require("../util/db_utils");
const logger = require("../util/logger");

/*
 * Hakee ruokia tietokannasta käyttäjän hakusanan perusteella.
 * @exports
*/
async function searchFoods(request, response) {
  const searchFoodDbOperation = sqlOperations.getDbOperation(
    queryFoods,
    handleServerSideError
  );
  searchFoodDbOperation(request, response);
}

async function queryFoods(request, response) {
  const queryParameter = request.query.q;
  logger.debug(`controllers.food_controller.queryFoods: Searching with query: ${queryParameter}`);
  if (queryParameter) {
    const result = await sql.selectLike(queryParameter);
    response.status(200).send({ result: result });
  } else {
    logger.info("controllers.food_controller.queryFoods: Refusing to perform empty query");
    response.status(400).send({ message: "Search query cannot be empty!" });
  }
}

/*
 * Hakee ruoan komponentit tietokannasta ruoan id:n perusteella.
 * @exports
*/
async function getFoodComponents(request, response) {
  const foodComponentsOperation = sqlOperations.getDbOperation(
    queryComponents,
    handleServerSideError
  );
  foodComponentsOperation(request, response);
}

async function queryComponents(request, response) {
  const foodId = request.params.id;
  logger.debug(`controllers.food_controller.queryFoods: Searching components for id ${foodId}`);
  const result = await sql.selectFoodComponents(foodId);
  response.status(200).send({ result: result });
}

function handleServerSideError(error, response) {
  logger.error(`controllers.food_controller.handleServerSide: Error searching db: ${error}`);
  response.status(500).send({ message: "Server-side error" });
}

module.exports = {
  searchFoods: searchFoods,
  getFoodComponents: getFoodComponents
}
