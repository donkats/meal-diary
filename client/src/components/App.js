import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { NavItem } from "react-bootstrap";
import { AppContext } from './context';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import UserInfo from './UserInfo';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState({"authentication": false, "id": 0});
  function handleLogout() {
    userHasAuthenticated( {"authentication": false, "id": 0 });
  }
  console.log(isAuthenticated["authentication"], isAuthenticated["id"]);

  return (
  <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
  <Router>
    <div>
      <nav className="sidebar">
        {isAuthenticated["authentication"]
          ? <>
            <UserInfo id={isAuthenticated["id"]}/>
            <Link to={'/'} className="sidebarlink">Home</Link>
            <Link to={'/dashboard'} className="sidebarlink"> Dashboard </Link>
            <Link to={'/analytics'} className="sidebarlink">Analytics</Link>
            <Link to='/'>
              <NavItem onClick={handleLogout}>Logout</NavItem>
            </Link>
            </>
          : <>
            <Link to='/' className="sidebarlink">Home</Link>
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
        <Route exact path='/' component={Home}/>
        <Route path='/analytics'> <Analytics id={isAuthenticated["id"]}/></Route>
        <Route path='/dashboard'> <Dashboard id={isAuthenticated["id"]}/></Route>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
      </Switch>
    </div>
  </Router>
  </AppContext.Provider>
  );
}

export default App;