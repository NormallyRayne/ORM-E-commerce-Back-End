const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

//http://localhost:3001/api/categories
//GET is a READ
router.get("/", async (req, res) => {
  // find all categories
  try {
    //This is like do SELECT * FROM category LEFT JOIN product on product.category_id = category.id
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

//http://localhost:3001/api/categories/1
//GET is a READ
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const id = req.params.id;
    const categoryData = await Category.findByPk(id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});
//http://localhost:3001/api/categories
router.post("/", async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;