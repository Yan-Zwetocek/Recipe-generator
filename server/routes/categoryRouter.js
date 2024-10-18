const Router = require("express");
const router = new Router();
const categoryRouterController = require('./controllers/categoryRouterController');

router.post("/", categoryRouterController.create);
router.get("/", categoryRouterController.getAll);
router.delete("/:id", categoryRouterController.deleteById);
router.put("/:id", categoryRouterController.updateById);

module.exports = router;
