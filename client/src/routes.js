import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/** Components */
import Home from './components/Home';
import TourHome from './components/Tours/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/tours" component={TourHome} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
