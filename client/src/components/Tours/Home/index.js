import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

/** Components */
import Layout from '../../../hoc/Layout'; //HOC
import ToursCard from '../ToursCard';
import Login from '../../LoginRegister/Login';
import Register from '../../LoginRegister/Register';
import CardDetail from '../CardDetail';

const TourHome = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/tours" component={ToursCard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/details" component={CardDetail} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};

export default TourHome;
