import React, { useEffect, useState } from 'react'
import Chat from './Chat'
import ChatInput from './ChatInput'
import "../styles/ChatDisplay.css"
import axios from 'axios'

const ChatDisplay = ({ user, clickedUser }) => {
  
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [usersMessages, setUsersMessages] = useState(null);
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null);

  const getUsersMessages = async () => {
    try {
      await axios.get("http://localhost:8000/messages", { params: { userId: userId, correspondingUserId: clickedUserId}}).then((response) => setUsersMessages(response.data));
    } catch (err) {
      console.log(err);
    }
  }

  const getClickedUsersMessages = async () => {
    try {
      await axios.get("http://localhost:8000/messages", { params: { userId: clickedUserId, correspondingUserId: userId}}).then((response) => setClickedUsersMessages(response.data));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUsersMessages();
    getClickedUsersMessages();
    console.log("chat display use effect")
  }, [clickedUser])

  const messages = [];

  usersMessages?.forEach(message => {
    const formattedMessage = {};
    formattedMessage["name"] = user?.first_name;
    formattedMessage["img"] = user?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  })

  clickedUsersMessages?.forEach(message => {
    const formattedMessage = {};
    formattedMessage["name"] = clickedUser?.first_name;
    formattedMessage["img"] = clickedUser?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  })

  const descendingOrderMessages = messages?.sort((a, b) => a?.timestamp?.localeCompare(b?.timestamp));
  

  return (
    <div className='chat-display'>
        <Chat descendingOrderMessages={descendingOrderMessages} />
        <ChatInput user={user} clickedUser={clickedUser} getUsersMessages={getUsersMessages} getClickedUsersMessages={getClickedUsersMessages} />
    </div>
  )
}

export default ChatDisplay