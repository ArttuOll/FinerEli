const express = require("express");
const foodController = require("../controllers/food_controller");

const router = express.Router();

/*
 * Reitti ruokien etsimiselle nimellä
*/
router.route("/food").get(foodController.searchFoods);
/*
 * Reitti ruokien komponenttien etsimiselle ruoan id:llä
*/
router.route("/food/:id").get(foodController.getFoodComponents);

module.exports = router;
