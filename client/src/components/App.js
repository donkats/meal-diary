import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import "./App.css";
//new lines 3 and 4
import { AppContext } from './context';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Home from './Home';
import Login from './Login';
import UserInfo from './UserInfo';

// function App() {
//   return (
//     <div className="App container">
//       <Navbar fluid collapseOnSelect>
//         <Navbar.Header>
//           <Navbar.Brand>
//             <Link to="/">Scratch</Link>
//           </Navbar.Brand>
//           <Navbar.Toggle />
//         </Navbar.Header>
//       </Navbar>
//     </div>
//   );
// }

// export default App;

function App() {
  // state = { users: [] }

  // async componentDidMount() {
  //   const response = await fetch('/users')
  //   const users = await response.json()

  //   this.setState({ users: users })
  // }
  const [isAuthenticated, userHasAuthenticated] = useState({"authentication": false, "id": 0});
  function handleLogout() {
    userHasAuthenticated( {"authentication": false, "id": 0 });
  }
  console.log(isAuthenticated["authentication"], isAuthenticated["id"]);
  const id = isAuthenticated.id;
  return (
  <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
  <Router>
    <div>
      <nav className="sidebar">
        {isAuthenticated["authentication"]
          ? <>
            <UserInfo />
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
        <Route path='/analytics' component={Analytics} />
        <Route path='/dashboard'> <Dashboard id={id}/> /></Route>
        
        <Route exact path='/login' component={Login}/>
      </Switch>
    </div>
  </Router>
  </AppContext.Provider>
  );
}

export default App;