import React, { useState } from "react";

const FriendsForm = props => {
  const [item, setItem] = useState({ name: "", email: "", age: "" });
  const handleChange = event =>
    setItem({ ...item, [event.target.name]: event.target.value });

  const handleSubmit = event => {
    event.preventDefault();
    props.submitFriend(item);
    setItem({ name: "", email: "", age: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="name"
        value={item.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="email"
        value={item.email}
        onChange={handleChange}
      />
      <input
        name="age"
        placeholder="age"
        value={item.age}
        onChange={handleChange}
      />
      <button type="submit">add Friend</button>
    </form>
  );
};
export default FriendsForm;
