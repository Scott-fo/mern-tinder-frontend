import React, { useState } from 'react';
import "../styles/AuthModal.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AuthModal = ({ setShowModal, isSignUp }) => {

  const [ email, setEmail ] = useState(null);
  const [ password, setPassword ] = useState(null);
  const [ confirmPassword, setConfirmPassword ] = useState(null);
  const [ error, setError ] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  let navigate = useNavigate();

  const handleClick = () => {
      setShowModal(false);
  }


  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          if (isSignUp && (password !== confirmPassword)) {
              setError("Passwords do not match");
              return;
          } else {
            //   console.log(email)
              const response = await axios.post(`https://scottfo-tinder.herokuapp.com/${isSignUp ? "signup" : "login"}`, { email, password });

              setCookie("UserId", response.data.userId);
              setCookie("AuthToken", response.data.token);

              if (response.status === 201) {
                  if(isSignUp) {
                      navigate("/onboarding");
                  } else {
                      navigate("/dashboard");
                  }
              }
              
              window.location.reload();
          }
      } catch (error) {
          console.log(error);
      }
  }

  return (
    <div className='auth-modal'>
        <div className='close-icon' onClick = {handleClick}>X</div>
        <h2>{isSignUp ? "Create account" : "Log in"}</h2>
        <p>By clicking Log In, you agree to our terms. Learn how we process your data in our privacy policy.</p>
        <form className='sign-up' onSubmit = {handleSubmit}>
            <input
                className='sign-up-input'
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className='sign-up-input'
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
            />
            {isSignUp && <input
                className='sign-up-input'
                type="confirmPassword"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                required={true}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />}
            <input className='submit-button' type="submit" value={isSignUp ? "SUBMIT" : "LOG IN"}/>
            <p>
                {error}
            </p>
        </form>
        <hr />
        <h2>GET THE APP</h2>
    </div>
  )
}

export default AuthModal