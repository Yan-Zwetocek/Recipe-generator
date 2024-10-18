const Router = require("express");
const router = new Router();
const cuisineRouterController = require('./controllers/cuisineRouterController');

router.post("/", cuisineRouterController.create);
router.get("/", cuisineRouterController.getAll);
router.delete("/:id", cuisineRouterController.deleteById);
router.put("/:id", cuisineRouterController.updateById);

module.exports = router;
