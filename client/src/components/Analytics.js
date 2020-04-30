import React from 'react'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import WeightGraph from './Graphs/WeightGraph';
import CalorieGraph from './Graphs/CalorieGraph';
import CarbGraph from './Graphs/CarbGraph';
import FatGraph from './Graphs/FatGraph';
import ProteinGraph from './Graphs/ProteinGraph';
import '../styles/Analytics.css';

function Analytics(props) {
  const { userId } = props;
  
  return (
    <Router>
      <div className="graph">
        <div className="graph-links">
          <Link to="/weight">Weight</Link>
          •
          <Link to="/calories">Calories</Link>
          •
          <Link to="/macros">Macros</Link>
          {/* <Link to="/carbgraph">Carbs</Link> */}
          {/* •
          <Link to="/fatgraph">Fat</Link>
          •
          <Link to="/proteingraph">Proteins</Link> */}
        </div>
        
      <Switch>
        <Route exact path="/weight">
          <WeightGraph userId={userId} />
        </Route>
        <Route path="/calories">
          <CalorieGraph userId={userId} />
        </Route>
        <Route path="/macros">
          <CarbGraph userId={userId} />
          <FatGraph userId={userId} />
          <ProteinGraph userId={userId} />
        </Route>
        {/* <Route path="/fatgraph">
          <FatGraph userId={userId} />
        </Route>
        <Route path="/proteingraph">
          <ProteinGraph userId={userId} />
        </Route> */}
      </Switch>
      </div>
    </Router>
  );
}

export default Analytics;