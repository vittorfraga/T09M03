const { query, validationResult } = require("express-validator");

const queryValidator = [
  query("filtro").optional().isArray(),
  query("filtro.*")
    .optional()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/)
    .trim()
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    next();
  },
];

module.exports = queryValidator;
