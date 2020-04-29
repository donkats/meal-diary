import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { NavItem } from 'react-bootstrap';
import { AppContext } from './context';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import UserInfo from './UserInfo';

function App() {
  const stored = JSON.parse(localStorage.getItem('auth'));
  const [auth, setAuth] = useState(stored || { isAuth: false, userId: 0, goal: 0 });

  function handleLogout() {
    setAuth({ isAuth: false, userId: 0, goal: 0 });
    localStorage.clear()
  }

  useEffect(() => {
    if (auth.isAuth) {
      localStorage.setItem('auth', JSON.stringify(auth));
    }
  }, [auth])

  return (
  <AppContext.Provider value={{ auth, setAuth }}>
  <Router>
    <div className="app">
      {auth.isAuth
        ? <>
          <Redirect to="/dashboard" />
          <div className="sidebar">
            <h1 className="title">MealDiary</h1>
            <UserInfo userId={auth.userId} />
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/">
              <NavItem onClick={handleLogout}>Logout</NavItem>
            </Link>
          </div>
            </>
          : <>
            <Redirect to="/" />
            <nav className="sidebar">
              <Link to="/">Home</Link>
              <Link to="/login">
                <NavItem>Login</NavItem>
              </Link>
              <Link to="/signup">
                <NavItem>Signup</NavItem>
              </Link>
            </nav>
          </>
        }
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/analytics">
          <Analytics userId={auth.userId} />
        </Route>
        <Route path="/dashboard">
          <Dashboard userId={auth.userId} isAuth={auth.isAuth} goal={auth.goal} />
        </Route>
        <Route path='/login'>
          <Login setAuth={setAuth} goal={auth.goal}/>
        </Route>
        <Route path='/signup'>
          <Signup setAuth={setAuth}/>
        </Route>
      </Switch>
    </div>
  </Router>
  </AppContext.Provider>
  );
}

export default App;