import React, { useState } from 'react';
import AuthModal from '../components/AuthModal';
import Nav from '../components/Nav';
import "../styles/Home.css";
import { useCookies } from "react-cookie";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const authToken = cookie.AuthToken;

  const handleClick = () => {
    if (authToken) {
      removeCookie("UserId", cookie.UserId);
      removeCookie("AuthToken", cookie.AuthToken);
      window.location.reload();
      return;
    }
    
    setShowModal(true);
    setIsSignUp(true);

  }

  const handleLogInClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  }

  return (
    <div className='overlay'>
        <Nav 
          minimal={true} 
          authToken = {authToken} 
          setShowModal={setShowModal} 
          showModal={showModal} 
          setIsSignUp={setIsSignUp}
        />
            <div className='home'>
                <h1 className='primary-title'>Swipe Right</h1>
                <div className="button-container">
                  <button className='primary-button' onClick={handleClick}>
                      {authToken ? "Signout" : "Create Account"}
                  </button>
                  {!authToken && <button className='responsive-login' onClick={handleLogInClick}>
                      Log in
                  </button>}
                </div>
                {showModal && <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />}
            </div>
    </div>
  )
}

export default Home