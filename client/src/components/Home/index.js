//En este componente van a ir todos los componentes de la Home principal, por el momento voy hacer solo el header ya que me voy a dedicar hacer otra secciones. En un futuro la implementaré.

import React, { Fragment } from 'react';

/** Componets */
import Header from './Header/Header';

const Landing = () => {
  return (
    <Fragment>
      <Header />
    </Fragment>
  );
};

export default Landing;
