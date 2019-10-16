import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import FriendsForm from "./FriendsForm";
import { Link } from "react-router-dom";

const URL = "http://localhost:5000/api/friends";

const Friends = props => {
  const [friends, setFriends] = useState([]);
  const [form, setForm] = useState(false);
  const Form = props => {
    const [item, setItem] = useState({
      name: props.name,
      email: props.email,
      age: props.age
    });

    const handleChange = event => {
      setItem({ ...item, [event.target.name]: event.target.value });
    };
    const handleSubmit = event => {
      event.preventDefault();
      axiosWithAuth()
        .put(`${URL}/${props.id}`, item)
        .then(res => {
          console.log("Post Event: ", res);
          setFriends(res.data);
          // props.history.push("/userportfolio");
        })
        .catch(err => {
          console.log("Post Event Error: ", err.respone);
          // alert("failed to update event");
        });

      setItem({ name: "", email: "", age: "" });
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder={props.name}
          value={item.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder={props.email}
          value={item.email}
          onChange={handleChange}
        />
        <input
          name="age"
          placeholder={props.age}
          value={item.age}
          onChange={handleChange}
        />
        <button type="submit">update</button>
      </form>
    );
  };

  const addFriend = friend => {
    axiosWithAuth()
      .post(URL, friend)
      .then(res => setFriends(res.data))
      .catch(err => console.log(err));
  };
  const deleteFriend = id => {
    console.log("i am in delete a freind");
    axiosWithAuth()
      .delete(`${URL}/${id}`)
      .then(res => setFriends(res.data))
      .catch(err => console.log(err));
  };
  const updateFriend = () => {
    setForm(!form);
  };

  const logOut = event => {
    localStorage.removeItem("token");
    console.log("i am event", event);
    props.history.push("/");
  };

  useEffect(() => {
    axiosWithAuth()
      .get(URL)
      .then(res => {
        setFriends(res.data);
      })
      .catch(err => console.log(err.response));
  }, []);

  return (
    <div>
      <h2>Friends</h2>
      {/* <Link to={"/"}> */}
      <button onClick={logOut}>log out</button>
      {/* </Link> */}
      {/* <button onClick={logOut}>log out</button> */}
      <FriendsForm submitFriend={addFriend} />
      <button onClick={updateFriend}>upDate Friends</button>
      <div className="cards">
        {friends.map(i => {
          return (
            <div className="card" key={i.id}>
              <h3>{i.name}</h3>
              <br />
              <h3>{i.age}</h3>
              <h3>{i.email}</h3>
              <button onClick={() => deleteFriend(i.id)}>delete</button>

              {form && (
                <Form id={i.id} name={i.name} age={i.age} email={i.email} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Friends;
