const sql = require("../db/food_sql");
const sqlOperations = require("../util/sql_operations");

async function searchFoods(request, response) {
  const searchFoodDbOperation = sqlOperations.getDbOperation(
    searchFood,
    handleServerSideError
  );
  searchFoodDbOperation(request, response);
}

async function searchFood(request, response) {
  const query = request.query.q;
  if (query) {
    const result = await sql.selectLike(query);
    response.json({ statusCode: 200, result: result });
  } else {
    response.json({ statusCode: 400, message: "Search query cannot be empty!" });
  }
}

function handleServerSideError(error, response) {
  console.log("Error searching food from db: ", error.message);
  response.json({ statusCode: 500, message: "Error searching food from db" });
}

module.exports = {
  search: searchFoods
}
