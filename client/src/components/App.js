import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Analytics from './Analytics';

class App extends Component {
  // state = { users: [] }

  // async componentDidMount() {
  //   const response = await fetch('/users')
  //   const users = await response.json()

  //   this.setState({ users: users })
  // }

  render() {
    return (
    <Router>
        <div>
          <nav className="sidebar">
            <Link to={'/'} className="sidebarlink"> Dashboard </Link>
            <Link to={'/analytics'} className="sidebarlink">Analytics</Link>
          </nav>
          <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/analytics' component={Analytics} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;