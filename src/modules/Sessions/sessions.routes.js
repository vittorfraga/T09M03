const { Router } = require("express");

const limiter = require("../../shared/middlewares/rateLimit");
const sessionsController = require("./SessionsController");

const sessionRouter = Router();

sessionRouter.use("/login", limiter);

sessionRouter.post("/login", sessionsController.login);

module.exports = sessionRouter;
