const { User } = require("../models")


const addFriend = async ({params}, res) => {
  try {
    // find user and update friend array to include new friend
    const addFriendQuery = await User.findOneAndUpdate(
      params.userId,
      { $push: { friends: params.friendId } },
      { new: true })
      .select('-__v -password')
      .populate('friends', '-__v -password -_id -email')
      .populate('categories', '-__v -userId')
      .sort()
    res.status(200).json({ result: "success", payload: addFriendQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to add Friend' });
  }
}

const removeFriend = async ({params}, res) => {
  try {
    // find user and update friend array to uninclude friend
    const removeFriendQuery = await User.findOneAndUpdate(
      params.userId,
      { $pull: { friends: params.friendId } },
      { new: true })
      .select('-__v -password')
      .populate('friends', '-__v -password -_id -email')
      .populate('categories', '-__v -userId')
      .sort()
    res.status(200).json({ result: "success", payload: removeFriendQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to remove friend' });
  }
}


module.exports = { 
  addFriend,
  removeFriend
}