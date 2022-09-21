const { User } = require("../models")
const jwt = require("jsonwebtoken")
const cookie = require("cookie")
const bcrypt = require("bcrypt")
const connection = require("../config/connection")

require("dotenv").config()


const createUser = async (req, res) => {
  try {
    const createUserQuery = await User.create(req.body);
    res.status(200).json({ result: "success", payload: createUserQuery });
  } catch(err) {
    res.status(400).json(err);
  }
}

const getAllUsers = async (req, res) => {
  try {
    const getAllQuery = await User.find({})
      .select('-__v -password')
      .populate('friends', '-__v -password -email')
      .populate('categories')
    res.status(200).json({ result: "success", payload: getAllQuery });
  } catch(err) {
    res.status(400).json({ message: 'No users found' });
  }
}

const getUserById = async (req, res) => {
  try {
    const getByIdQuery = await User.findById(req.params.userId)
      .select('-__v -password')
      .populate('friends', '-__v -password -email')
      .populate('categories')
    res.status(200).json({ result: "success", payload: getByIdQuery })
  } catch(err) {
    res.status(400).json({ result: "fail", message: 'No user found by that id' })
  }
}

const getUserByUsername = async (req, res) => {
  try {
    const getUserByUsernameQuery = await User.findOne({username: req.params.username})
      .select('-__v -password')
      .populate('friends', '-__v -password -email')
      .populate('categories')
    res.status(200).json({ result: "success", payload: getUserByUsernameQuery })
  } catch(err) {
    res.status(400).json({ result: "fail", message: 'No user found by that username' })
  }
}

const deleteUser = async (req, res) => {
  try {
    const deleteUserQuery = await User.findOneAndDelete(req.params.userId);
    res.status(200).json({ result: "successfully deleted user"});
  } catch(err) {
    res.status(400).json(err);
  }
}

const authenticateLogin = async (req, res) => {
  // First see if we have a user with the supplied email address 
  const foundUser = await User.findOne({ email: req.body.email })
  if( !foundUser ) return res.status(401).json({ message: "Login failed." })

  // Now compare the supplied password w/ the hashed password
  const isValid = await bcrypt.compare(req.body.password, foundUser.password)
  if( !isValid ) return res.status(401).json({ message: "Login failed." })

  // If we have a match, we will send back a token (line 43 extracts the password key from the foundUser object)
  const { password, ...modifiedUser } = foundUser

  // Create a token to represent the authenticated user
  const token = jwt.sign({ _id: foundUser._id, username:foundUser.username, email: foundUser.email})

  res
    .status(200)
    .set({ "auth-token": token })
    .json({ result: "success", user: modifiedUser, token: token })
}

const lookupUserByToken = async (req, res) => {
  if( !req.headers || !req.headers.cookie ) return res.status(401).json({msg: "un-authorized"})

  // The node package named cookie will parse cookies for us
  const cookies = cookie.parse(req.headers.cookie)

  // Get the token from the request headers & decode it 
  const token = cookies["auth-token"]  //cookies.authToken
  if( !token ) return res.status(401).json({msg: "un-authorized"})
  
  // Look up the user from the decoded token
  const isVerified = jwt.verify(token)
  if( !isVerified ) return res.status(401).json({msg: "un-authorized"})

  const user = await User.findById(isVerified._id)
  if( !user ) return res.status(401).json({msg: "un-authorized"})

  return res.status(200).json({ result: "success", payload: { userId: user._id, username: user.username, pname: user.pname, email: user.email, categories: user.categories, friends: user.friends } })
}


module.exports = { 
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  authenticateLogin,
  lookupUserByToken,
  deleteUser
}