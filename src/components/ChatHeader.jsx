import React from 'react';
import "../styles/ChatHeader.css";
import { FiLogOut } from "react-icons/fi"
import { CgProfile } from "react-icons/cg"
import { useCookies } from "react-cookie";

const ChatHeader = ({ user }) => {
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  const logout = () => {
    removeCookie("UserId", cookie.UserId);
    removeCookie("AuthToken", cookie.AuthToken);
    window.location.reload();
  }

  return (
    <div className='chat-header'>
        <div className="profile">
            <div className="img-container">
                <img className='profile-img' src={user?.url} alt="photo of user" />
                {/* <CgProfile className='profile-img' /> */}
            </div>
            <h3 className='username'>{user?.first_name}</h3>
        </div>
        <i className='log-out' onClick={logout}><FiLogOut /></i>
    </div>
  )
}

export default ChatHeader