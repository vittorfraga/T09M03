const { Router } = require("express");
const login = require("../controllers/createSessionController");

const sessionRouter = Router();

sessionRouter.post("/login", login);

module.exports = sessionRouter;
