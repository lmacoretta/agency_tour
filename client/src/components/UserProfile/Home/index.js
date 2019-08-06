import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import ProfileHOC from '../ProfileHOC'; //hoc
import Setting from '../Setting';
import Reserv from '../Reserv';

const UserProfile = () => {
  return (
    <BrowserRouter>
      <ProfileHOC>
        <Switch>
          <Route exact path="/me" component={Setting} />
          <Route exact path="/me/reserva" component={Reserv} />
        </Switch>
      </ProfileHOC>
    </BrowserRouter>
  );
};

export default UserProfile;
