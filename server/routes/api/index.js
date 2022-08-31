const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const userRoutes = require('./user-routes');


router.use('/category', categoryRoutes);
router.use('/user', userRoutes);


module.exports = router;