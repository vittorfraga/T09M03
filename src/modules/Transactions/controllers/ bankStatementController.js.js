const statementService = require("../services/ bankStatementService.js");

const getUserStatement = async (req, res) => {
  const userId = req.userId;

  try {
    const statement = await statementService.getStatement(userId);

    return res.status(200).json(statement);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = { getUserStatement };
