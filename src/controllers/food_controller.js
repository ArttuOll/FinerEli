const sql = require("../db/food_sql");
const sqlOperations = require("../util/db_utils");

async function searchFoods(request, response) {
  const searchFoodDbOperation = sqlOperations.getDbOperation(
    queryFoods,
    handleServerSideError
  );
  searchFoodDbOperation(request, response);
}

async function queryFoods(request, response) {
  const queryParameter = request.query.q;
  if (queryParameter) {
    const result = await sql.selectLike(queryParameter);
    response.status(200).send({ result: result });
  } else {
    response.status(400).send({ message: "Search query cannot be empty!" });
  }
}

async function getFoodComponents(request, response) {
  const foodComponentsOperation = sqlOperations.getDbOperation(
    queryComponents,
    handleServerSideError
  );
  foodComponentsOperation(request, response);
}

async function queryComponents(request, response) {
  const parameters = request.params.id;
  const result = await sql.selectFoodComponents(parameters);
  response.status(200).send({ result: result });
}

function handleServerSideError(error, response) {
  console.log("Server-side error", error.message);
  response.status(500).send({ message: "Server-side error" });
}

module.exports = {
  searchFoods: searchFoods,
  getFoodComponents: getFoodComponents
}
