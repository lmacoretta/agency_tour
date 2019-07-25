import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/** Components */
import Home from './components/Home';
//import Layout from './hoc/Layout'; //HOC

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
