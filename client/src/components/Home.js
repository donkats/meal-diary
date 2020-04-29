import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import '../styles/Home.css';

export default function Home(props) {
  const { auth, setAuth } = props;

  return (
      <div className="home">
        <h1>Welcome to <span className="title">MealDiary</span></h1>
        <p><Link to="/login">Login</Link> or <Link to="/signup">Sign up</Link></p>

        <Switch>
          <Route path='/login'>
            <Login setAuth={setAuth} goal={auth.goal}/>
          </Route>
          <Route path='/signup'>
            <Signup setAuth={setAuth}/>
          </Route>
        </Switch>
      </div>
  );
}