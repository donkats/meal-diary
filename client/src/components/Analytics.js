import React from 'react'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import WeightGraph from './Graphs/WeightGraph';
import CalorieGraph from './Graphs/CalorieGraph';
import CarbGraph from './Graphs/CarbGraph';
import FatGraph from './Graphs/FatGraph';
import ProteinGraph from './Graphs/ProteinGraph';

function Analytics(props) {
  const { userId } = props;
  
  return (
    <div className="graphAnalytics">
      <Router>
        <Link to="/weightgraph">Weight</Link> 
        <Link to="/caloriegraph">Calories</Link>
        <Link to="/carbgraph">Carbs</Link>
        <Link to="/fatgraph">Fat</Link>
        <Link to="/proteingraph">Proteins</Link>
      <Switch>
        <Route exact path="/weightgraph">
          <WeightGraph userId={userId} />
        </Route>
        <Route path="/caloriegraph">
          <CalorieGraph userId={userId} />
        </Route>
        <Route path="/carbgraph">
          <CarbGraph userId={userId} />
        </Route>
        <Route path="/fatgraph">
          <FatGraph userId={userId} />
        </Route>
        <Route path="/proteingraph">
          <ProteinGraph userId={userId} />
        </Route>
      </Switch>
  </Router>
    </div>
  );
}

export default Analytics;