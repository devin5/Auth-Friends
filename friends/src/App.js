import React from 'react';
import Login from './components/Login';
import Friends from './components/Friends';
import './App.css';
import { Route, Link, Redirect } from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => {
  return <Route {...rest} render={props => {
    if(localStorage.getItem('token')){
      return <Component {...props} />
    }
    else{
      return <Redirect to="/login"/>
    }
  }} />
}

function App() {
  return (
    <div className="App">
      <Route path="/login" component={Login} />
      <ProtectedRoute path="/friends" component={Friends} />
    
    </div>
  );
}

export default App;
