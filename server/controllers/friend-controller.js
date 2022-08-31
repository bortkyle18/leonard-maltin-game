const User = require("../models/User")


const addFriend = async ({params}, res) => {
  try {
    const addFriendQuery = await User.findOneAndUpdate(
      params.userId,
      { $push: { friends: params.friendId } },
      { new: true })
      .select('-__v -password')
      .populate('friends', '-__v -password -_id -email')
      .sort()
    res.status(200).json({ result: "success", payload: addFriendQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to add Friend' });
  }
}

const removeFriend = async ({params}, res) => {
  try {
    const removeFriendQuery = await User.findOneAndUpdate(
      params.userId,
      { $pull: { friends: params.friendId } },
      { new: true })
      .select('-__v -password')
      .populate('friends', '-__v -password -_id -email')
      .sort()
    res.status(200).json({ result: "success", payload: removeFriendQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to create user' });
  }
}


module.exports = { 
  addFriend,
  removeFriend
}