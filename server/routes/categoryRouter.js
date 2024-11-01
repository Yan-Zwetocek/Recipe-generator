const Router = require("express");
const router = new Router();
const categoryRouterController = require('./controllers/categoryRouterController');
const checkRole = require("../middleware/checkRoleMiddleware");



router.post("/", checkRole('ADMIN'),  categoryRouterController.create);
router.get("/",  categoryRouterController.getAll);
router.delete("/:id", checkRole('ADMIN'), categoryRouterController.deleteById);
router.put("/:id", checkRole('ADMIN'), categoryRouterController.updateById);

module.exports = router;
