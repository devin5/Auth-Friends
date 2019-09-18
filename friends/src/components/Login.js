import React, { useState } from 'react';
import axios from 'axios';


const URL = "http://localhost:5000/api/login"


 const Login = (props) => {
      const[creds, setCreds] = useState({ username: "" , password: ""});
      
      const handleChange = (event) => {
            setCreds({...creds, [event.target.name]: event.target.value})
      }
      const handleSubmit = (event) => {
            event.preventDefault();
            axios.post("http://localhost:5000/api/login", creds)
            .then( res => {
                  console.log(res)
                  localStorage.setItem('token', res.data.payload);
                  props.history.push('/friends')
            })
            .catch(err => console.log(err))
            setCreds({ username: "" , password: ""})
      }
      

      return(
      <form onSubmit={handleSubmit}>
            <input type='test' name="username" placeholder="username" onChange={handleChange} value={creds.username}/>
            <input type='password' name="password" placeholder="password" onChange={handleChange} value={creds.password}/>
            <button type='submit'>Log In</button>
      </form>
      );
};
export default Login

