import React, { useState } from 'react';
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
  const [auth, setAuth] = useState({ isAuth: false, id: 0 });

  console.log('logged in:', auth.isAuth, 'id:', auth.id);

  function handleLogout() {
    setAuth({ isAuth: false, id: 0 });
  }

  return (
  <AppContext.Provider value={{ auth, setAuth }}>
  <Router>
    <div>
      <nav className="sidebar">
        {auth.isAuth
          ? <>
            <Redirect to="/dashboard" />
            <UserInfo id={auth.id} />
            <Link to="/dashboard" className="sidebarlink">Dashboard</Link>
            <Link to="/analytics" className="sidebarlink">Analytics</Link>
            <Link to="/">
              <NavItem onClick={handleLogout}>Logout</NavItem>
            </Link>
            </>
          : <>
            <Redirect to="/" />
            <Link to="/" className="sidebarlink">Home</Link>
            <Link to="/login">
              <NavItem>Login</NavItem>
            </Link>
            <Link to="/signup">
              <NavItem>Signup</NavItem>
            </Link>
          </>
        } 
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/analytics">
          <Analytics id={auth.id} />
        </Route>
        <Route path="/dashboard">
          <Dashboard userId={auth.id} isAuth={auth.isAuth} />
        </Route>
        <Route path='/login'>
          <Login auth={auth} setAuth={setAuth} />
        </Route>
        <Route exact path='/signup' component={Signup}/>
      </Switch>
    </div>
  </Router>
  </AppContext.Provider>
  );
}

export default App;