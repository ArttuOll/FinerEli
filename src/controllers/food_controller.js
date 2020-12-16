const sql = require("../db/food_sql");
const sqlOperations = require("..util/sqlOperations");

async function searchFoods(request, response) {
  const searchFoodDbOperation = sqlOperations.getDbOperation(
    searchFood,
    handleError
  );
  searchFoodDbOperation(request, response);
}

async function searchFood(request, response) {
  const query = request.query;
  const result = await sql.selectLike(query);
  response.json({ statusCode: 200, result: result });
}

function handleError(error, response) {
  console.log("Error searching food from db: ", error.message);
  response.json({ statusCode: 500, message: "Error searching food from db" });
}

module.exports = {
  search: searchFoods
}
