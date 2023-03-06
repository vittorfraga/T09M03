const { Router } = require("express");
const isAuthenticated = require("../../shared/middlewares/isAuthenticated");
const UsersController = require("././UsersController");

const usersRouter = Router();

usersRouter.post("/usuario", UsersController.createUser);
usersRouter.get("/usuario", isAuthenticated, UsersController.getUserProfile);
usersRouter.put("/usuario", isAuthenticated, UsersController.updateUserProfile);

module.exports = usersRouter;
