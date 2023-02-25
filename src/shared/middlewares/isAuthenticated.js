const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({ message: "Token  não encontrado!" });

  if (!process.env.SECRET)
    return res.status(500).json({ message: "SECRET não encontrado!" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET);

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = isAuthenticated;
