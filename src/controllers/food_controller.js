const sql = require("../db/food_sql");
const sqlOperations = require("../util/sql_operations");

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
    response.json({ statusCode: 200, result: result });
  } else {
    response.json({ statusCode: 400, message: "Search query cannot be empty!" });
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
  const parameters = request.params;
  const result = await sql.selectFoodComponents(parameters);
  response.json({ statusCode: 200, result: result });
}

function handleServerSideError(error, response) {
  console.log("Server-side error", error.message);
  response.json({ statusCode: 500, message: "Server-side error" });
}

module.exports = {
  searchFoods: searchFoods,
  getFoodComponents: getFoodComponents
}
