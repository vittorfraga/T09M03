const { Router } = require("express");
const isAuthenticated = require("../../../shared/middlewares/isAuthenticated");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userProfileController");

const profileRouter = Router();

profileRouter.use(isAuthenticated);

profileRouter.get("/usuario", getUserProfile);
profileRouter.put("/usuario", updateUserProfile);

module.exports = profileRouter;
