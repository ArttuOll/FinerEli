const express = require("express");
const foodController = require("../controllers/food_controller");

const router = express.Router();

router.route("/food").get(foodController.searchFoods);
router.route("/food/:id").get(foodController.getFoodComponents);

module.exports = router;
