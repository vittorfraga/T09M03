const { Router } = require("express");
const createUser = require("../controllers/createUserController");

const usersRouter = Router();

usersRouter.post("/usuario", createUser);

module.exports = usersRouter;
