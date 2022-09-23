import React, {useState} from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Friends = (props) => {
  const friendList = props.user.friends;
  const [friendSearch, setFriendSearch] = useState("")
  const [friendData, setFriendData] = useState([])
  const [addFriendMessage, setAddFriendMessage] = useState({ type: "", msg: "" });
  const [removeFriendMessage, setRemoveFriendMessage] = useState({ type: "", msg: "" });

  const handleFindFriend = async (event) => {
    event.preventDefault();

    const response = await fetch(`/api/user/${friendSearch}`);
    const parsedResponse = await response.json();
    if (parsedResponse && parsedResponse.result === "success") {
      setFriendData(parsedResponse.payload);
    }
  }

  const handleAddFriend = async (friend) => {
    const friendDataToSave = {
      _id: friend._id,
      username: friend.username
    };

    setAddFriendMessage({ type: "", msg: "" });
    const addFriend = await fetch(`../api/user/${props.user._id}/${friend._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(friendDataToSave),
    });
    const addFriendResult = await addFriend.json();

    if (addFriendResult.result !== "success") {
      setAddFriendMessage({
        type: "danger",
        msg: "We were unable to add friend to your friend list"
      });
    }
    setFriendData([])
    window.location.reload()
  }

  const handleRemoveFriend = async (friendId) => {
    const removeFriend = await fetch(`../api/user/${props.user._id}/${friendId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    const removeFriendResult = await removeFriend.json();

    if (removeFriendResult.result !== "success") {
      setRemoveFriendMessage({
        type: "danger",
        msg: "We were unable to remove friend from your friend list"
      });
    }
    window.location.reload()
  }

  return (
    <>
      {friendList.map((friend) => {
        return (
          <Card key={friend._id} className="cardStack flex-row justify-content-center">
            <div className='flex-row justify-content-center categoryCard text-center'>
              {friendList.length > 0 && (
                <>
                  <Link to={`../Profile/${friend.username}`}  className='friendFound'>
                    <Card.Title>{friend.username}</Card.Title>
                  </Link>
                  <Button
                    className="btn-block"
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveFriend(friend._id)}
                    >
                      Remove Friend
                  </Button>
                </>
              )}
            
              {removeFriendMessage.msg.length > 0 && (
                <Alert
                  variant={removeFriendMessage.type}
                  style={{ marginTop: "2em" }}
                >
                  {removeFriendMessage.msg}
                </Alert>
              )}
            </div>
          </Card>
        )
      })}

      <Form onSubmit={handleFindFriend}>
        <p>Search Friends by Username Below:</p>
        <Form.Control
          name="friendSearch"
          value={friendSearch}
          onChange={(e) => setFriendSearch(e.target.value)}
          type="text"
          size="lg"
          placeholder="Friend Username"
          required
        />

        <Button type="submit" size="lg"
          disabled={!friendSearch}
          className="btn-block"
          id="success-btn"
          variant="none">
          Find Friend
        </Button>
        
        {addFriendMessage.msg.length > 0 && (
          <Alert
            variant={addFriendMessage.type}
            style={{ marginTop: "2em" }}
          >
            {addFriendMessage.msg}
          </Alert>
        )}
      </Form>

      {friendData.username && (
        <Card className="cardStack flex-row justify-content-center">
          <div className='flex-row justify-content-center categoryCard text-center'>
            <Link to={`/Profile/${friendData.username}`} className='friendFound'>
              <Card.Title>{friendData.username}</Card.Title>
            </Link>
          </div>
          <div className='flex-row justify-content-center text-center'>
            <Button
              className="btn-block"
              id="success-btn"
              variant='none'
              onClick={() => handleAddFriend(friendData)}
              >
                Add Friend
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default Friends;