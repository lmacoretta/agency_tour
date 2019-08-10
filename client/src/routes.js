import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/authAction';

/** Components */
import Home from './components/Home';
import TourHome from './components/Tours/Home';

//Tengo que comprobar si el usuario está autentificado en el inicio de mi aplicacion.
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser()); //Puedo despachar porque accedo directamente desde el store. Tiene ese metodo.
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/tours" component={TourHome} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
