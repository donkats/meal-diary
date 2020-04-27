import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';

// this is added 
/* <React.StrictMode>
</React.StrictMode>, */

// Use BrowserRouter as our router. 
// This uses the browser’s History API to create real URLs.
// Use the Router to render our App component. 
// This will allow us to create the routes we need inside our App component.
ReactDOM.render(
  
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

