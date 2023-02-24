const categoriesService = require("../services/categoriesService");

const listCategories = async (req, res) => {
  try {
    const cateogories = await categoriesService.list();
    res.status(200).json(cateogories);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = listCategories;
