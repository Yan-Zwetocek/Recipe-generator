const Router = require("express");
const router = new Router();
const cuisineRouterController = require("./controllers/cuisineRouterController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), cuisineRouterController.create);
router.get("/", cuisineRouterController.getAll);
router.delete("/:id", checkRole("ADMIN"), cuisineRouterController.deleteById);
router.put("/:id", checkRole('ADMIN'),  cuisineRouterController.updateById);

module.exports = router;
