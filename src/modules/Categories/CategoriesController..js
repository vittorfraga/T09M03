const categoriesService = require("./CategoriesService");

const listCategories = async (req, res) => {
  try {
    const cateogories = await categoriesService.list();
    res.status(200).json(cateogories);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = { listCategories };
