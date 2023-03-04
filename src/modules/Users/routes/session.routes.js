const { Router } = require("express");
const limiter = require("../../../shared/middlewares/rateLimit");
const login = require("../controllers/createSessionController");

const sessionRouter = Router();

//sessionRouter.use("/login", limiter);

sessionRouter.post("/login", login);

module.exports = sessionRouter;
