const { Category, User } = require("../models")


const createCategory = async ({params, body}, res) => {
  try {
    // create new category
    const newCategory = await Category.create({ ...body, userId: params.userId})

    // find user and update category array to include created category
    const createCategoryQuery = await User.findByIdAndUpdate(
      params.userId,
      { $push: { categories: { ...newCategory } } },
      { new: true }
    )
    .select('-__v -password')
    .populate('friends', '-__v -password -_id -email')
    .populate('categories', '-__v -userId');

    res.status(200).json({ result: "success", payload: createCategoryQuery });
  } catch(err) {
    res.status(400).json(err);
  }
}

const getCategoryById = async ({params}, res) => {
  try {
    const getCategoryByIdQuery = await Category.findById(params.categoryId)
    res.status(200).json({ result: "success", payload: getCategoryByIdQuery });
  } catch(err) {
    res.status(400).json({ message: 'Could not find specified category' });
  }
}

const updateCategoryById = async ({params, body}, res) => {
  try {
    const updateCategoryByIdQuery = await Category.findOneAndUpdate(
      {_id: params.categoryId},
      {...body, userId: params.userId},
      { new: true })
    res.status(200).json({ result: "success", payload: updateCategoryByIdQuery });
  } catch(err) {
    res.status(400).json({ message: 'Could not find specified category' });
  }
}

const deleteCategory = async ({params}, res) => {
  try {
    const removeCategoryQuery = await Category.findOneAndDelete({_id: params.categoryId})
    res.status(200).json({ result: "success", payload: removeCategoryQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to remove friend' });
  }
}


module.exports = { 
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategory,
}