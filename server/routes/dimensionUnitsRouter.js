const Router = require("express");
const router = new Router();
const dimensionUnitsController = require('./controllers/dimensionUnitsController');
const checkRole = require("../middleware/checkRoleMiddleware");



router.post("/", checkRole('ADMIN'),  dimensionUnitsController.create);
router.get("/",  dimensionUnitsController.getAll);
router.delete("/:id", checkRole('ADMIN'), dimensionUnitsController.deleteById);
router.put("/:id", checkRole('ADMIN'), dimensionUnitsController.updateById);

module.exports = router;
