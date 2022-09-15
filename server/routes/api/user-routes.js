const router = require('express').Router()
const { createUser, getAllUsers, getUserById, getUserByUsername, deleteUser, authenticateLogin, lookupUserByToken } = require('../../controllers/user-controller')
const { addFriend, removeFriend } = require('../../controllers/friend-controller')


//   /api/user/
router.route('/').get(getAllUsers)
router.route('/').post(createUser)

//   /api/user/auth
router.route("/auth").post(authenticateLogin)
//   /api/user/lookup
router.route("/lookup").get(lookupUserByToken)

//   /api/user/:id
router.route('/:userId').delete(deleteUser)

//   /api/user/:username
router.route('/:username').get(getUserByUsername)


//   /api/user/:userId/:friendId     =>   add/remove from user friends list
router.route('/:userId/:friendId').put(addFriend)
router.route('/:userId/:friendId').delete(removeFriend)




module.exports = router;