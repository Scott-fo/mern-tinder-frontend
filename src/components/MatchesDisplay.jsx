import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../styles/MatchesDisplay.css"
import { useCookies } from "react-cookie";

const MatchesDisplay = ({ matches, setClickedUser }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const matchedUserIds = matches?.map(({ user_id }) => user_id);
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const userId = cookie.UserId;
  // console.log("matched ids in display")
  // console.log(matchedUserIds)

  const getMatches = async() => {
    try {
      await axios.get("https://scottfo-tinder.herokuapp.com/matches", { params: { userIds: JSON.stringify(matchedUserIds)}}).then((response) => setMatchedProfiles(response.data));
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (matchedUserIds !== undefined) {
      getMatches()
    }
    console.log("matches display use effect")
  }, [matches])

  // Use this to only be able to message people who have matched you as well. This is difficult for users to see in testing so I have left it out
  // To implement, replaced matchedProfiles?.map with mutualMatches?.map 
  // const mutualMatches = matchedProfiles?.filter((matchedProfiles) => matchedProfiles?.matches?.filter(profile => profile.user_id == userId).length > 0)

  return (
    <div>
      <div className='matches-display'>
        {matchedProfiles?.map((match, _index) => (
          <div key ={_index} className="match-card" onClick={() => setClickedUser(match)}>
            <div className="img-container">
              <img className="profile-img" src={match?.url} slt={match?.first_name + " profile"}/>
            </div>
            <h3 className='username'>{match?.first_name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MatchesDisplay
