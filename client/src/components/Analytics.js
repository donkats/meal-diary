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
          <Link to="/analytics/calories">Calories</Link>
          •
          <Link to="/analytics/weight">Weight</Link>
          •
          <Link to="/analytics/macros">Macros</Link>
        </div>
        
        
      <Switch>
        <Route path="/analytics/calories">
          <CalorieGraph userId={userId} />
        </Route>
        <Route exact path="/analytics/weight">
          <WeightGraph userId={userId} />
        </Route>
        <Route path="/analytics/macros">
          <CarbGraph userId={userId} />
          <FatGraph userId={userId} />
          <ProteinGraph userId={userId} />
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default Analytics;