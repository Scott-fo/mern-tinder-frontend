import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import ChatContainer from '../components/ChatContainer';
import "../styles/Dashboard.css";
import axios from "axios";
import { useCookies } from "react-cookie";


const Dashboard = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const [lastDirection, setLastDirection] = useState()
  const [user, setUser] = useState({});
  const [userByGender, setUserByGender] = useState(null)
  const userId = cookie.UserId;

  const getUser = async () => {
    try {
      await axios.get("https://scottfo-tinder.herokuapp.com/user", { params: { userId }}).then((response) => setUser(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  const getUserByGender = async () => {
    try {
      await axios.get("https://scottfo-tinder.herokuapp.com/gendered-users", { params: { gender : user?.gender_interest }}).then((response) => setUserByGender(response.data));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser()
    getUserByGender()
    console.log("dashboard use effect")
  }, [user.gender_interest])

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("https://scottfo-tinder.herokuapp.com/addmatch", { userId, matchedUserId });
      getUser();
    } catch (err) {
      console.log(err);
    }
  }

  // console.log(user)

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updateMatches(swipedUserId)
    }
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const matchedUserIds = user?.matches?.map(({ user_id }) => user_id).concat(userId);
  // console.log("matched ids")
  // console.log(matchedUserIds)
  const filteredUsers = userByGender?.filter(userByGender => !matchedUserIds.includes(userByGender.user_id));
  // console.log("filtered users")
  // console.log(filteredUsers)
  return (
    <div>

      {user && <div className='dashboard'>
        <ChatContainer user = { user } />
        <div className='swipe-container'>
          {filteredUsers && <div className="card-container">
            {filteredUsers.map((user) =>
              <TinderCard className='swipe' key={user.user_id} onSwipe={(dir) => swiped(dir, user.user_id)} onCardLeftScreen={() => outOfFrame(user.first_name)}>
                <div style={{ backgroundImage: 'url(' + user.url + ')' }} className='card'>
                  <h3>{user.first_name}</h3>
                </div>
                <div className='swipe-info'>
                  {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                </div>
              </TinderCard>
            )}

          </div>}
        </div>
      </div>}
    </div>
  )
}

export default Dashboard
