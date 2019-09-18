import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axiosWithAuth'
import FriendsForm from './FriendsForm'

const URL = "http://localhost:5000/api/friends";

const Friends = props => {
  const [friends, setFriends] = useState([]);

  const addFriend = friend => {
        axiosWithAuth().post(URL, friend)
        .then(res => setFriends(res.data))
        .catch(err => console.log(err))
  }

  useEffect(() => {
    axiosWithAuth()
      .get(URL)
      .then(res => {
        setFriends(res.data)
      })
      .catch(err => console.log(err.respone));
  }, []);

  return (
    <div>
      <h2>Friends</h2>
      <FriendsForm submitFriend={addFriend}/>
      {friends.map(i => {
            return <div key={i.id}> <h3 >{i.name}</h3>
                              <h3>{i.age}</h3>
                              <h3>{i.email}</h3>
            

            </div>
      })}
    </div>
  );
};
export default Friends;
