const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 120000,
  max: 5,
});

module.exports = limiter;
