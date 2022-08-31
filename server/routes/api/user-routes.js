const router = require('express').Router()
const { getUserById, getAllUsers, createUser, authenticateLogin, lookupUserByToken, deleteUser } = require('../../controllers/user-controller')
const { addFriend, removeFriend } = require('../../controllers/friend-controller')


//   /api/user/
router.route('/').get(getAllUsers)
router.route('/').post(createUser)

//   /api/user/auth
router.route("/auth").post(authenticateLogin)
//   /api/user/lookup
router.route("/lookup").get(lookupUserByToken)

//   /api/user/:id
router.route('/:userId').get(getUserById)
router.route('/:userId').delete(deleteUser)


//   /api/user/:userId/:friendId     =>   add/remove from user friends list
router.route('/:userId/:friendId').put(addFriend)
router.route('/:userId/:friendId').delete(removeFriend)




module.exports = router;