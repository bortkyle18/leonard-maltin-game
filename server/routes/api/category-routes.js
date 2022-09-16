const router = require('express').Router()
const { createCategory, getCategoryById, updateCategoryById, deleteCategory } = require('../../controllers/category-controller')


//   /api/category/:userId
router.route('/:userId').post(createCategory)

//   /api/category/:categoryId
router.route('/:categoryId').get(getCategoryById)
router.route('/:categoryId').put(updateCategoryById)
router.route('/:categoryId').delete(deleteCategory)


module.exports = router;