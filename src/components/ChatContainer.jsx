import React, { useEffect, useState } from 'react'
import ChatDisplay from './ChatDisplay'
import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'
import "../styles/ChatContainer.css"

const ChatContainer = ({ user }) => {
  // console.log("chat container matches");
  // console.log(user.matches);
  const [clickedUser, setClickedUser] = useState(null);

  return (
    <div className='chat-container'>

        <ChatHeader user = {user} />
        <div>
            <button className='option' onClick={() => setClickedUser(null)}>Matches</button>
            <button className='option' disabled={!clickedUser}>Chat</button>
        </div>
        {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser}/>}
        {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
    </div>
  )
}

export default ChatContainer