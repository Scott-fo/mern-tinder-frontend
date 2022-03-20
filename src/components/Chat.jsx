import React from 'react'
import "../styles/Chat.css"

const Chat = ({ descendingOrderMessages }) => {
  // console.log("descending msg")
  // console.log(descendingOrderMessages)
  return (
    <div className='chat-window'>
      {descendingOrderMessages?.map((message, _index) => (
        <div key={_index} className="message-container">
          <div className="chat-message-header">
            <div className='img-container'>
              <img className="profile-img" src={message.img} alt={message.name + " profile"} />
            </div>
            <p className='message-name'>{message.name}</p>
          </div>
          <p className='message'>{message.message}</p>
        </div>
      ))}
    </div>
  )
}

export default Chat