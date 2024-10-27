const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const recipeRouter = require("./recipeRouter");
const commentRouter = require("./commentRouter");
const ingredientRouter = require("./ingredientRouter");
const recipeStepsRouter = require("./recipeStepsRouter");
const ratingRouter = require("./ratingRouter");
const cuisineRouter = require("./cuisineRouter");
const categoryRouter = require("./categoryRouter");
const { body } = require("express-validator");
router.use(
  "/user",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 32 }),
  userRouter
);

router.use("/recipe", recipeRouter);
router.use("/comment", commentRouter);
router.use("/ingredient", ingredientRouter);
router.use("/recipeSteps", recipeStepsRouter);
router.use("/ratingRouter", ratingRouter);
router.use("/cuisineRouter", cuisineRouter);
router.use("/categoryRouter", categoryRouter);
module.exports = router;
