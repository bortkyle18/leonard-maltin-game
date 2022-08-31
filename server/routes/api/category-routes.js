const router = require('express').Router()
const { createCategory, getCategories, getCategoryById, updateCategoryById, deleteCategory } = require('../../controllers/category-controller')


//   /api/category/
router.route('/:userId').get(getCategories)
router.route('/:userId').post(createCategory)

//   /api/category/:categoryId
router.route('/:userId/:categoryId').get(getCategoryById)
router.route('/:userId/:categoryId').put(updateCategoryById)
router.route('/:userId/:categoryId').delete(deleteCategory)


module.exports = router;