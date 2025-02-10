const Router = require("express");
const router = new Router();
const userController = require('./controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", userController.registration );
router.post("/login", userController.login);
router.post("/logout", authMiddleware, userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
// router.get("/auth", userController.authCheck)
router.put("/:id", authMiddleware, userController.updateUser)



module.exports = router;
