import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

/** Components */
import Layout from '../../../hoc/Layout';

const TourHome = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Layout />
      </Switch>
    </BrowserRouter>
  );
};

export default TourHome;
