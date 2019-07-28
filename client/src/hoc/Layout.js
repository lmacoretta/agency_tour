import React, { Fragment } from 'react';

/** Components */
import Header from '../components/Tours/Header';

const Landing = props => {
  return (
    <Fragment>
      <Header />
      {props.children}
    </Fragment>
  );
};

export default Landing;
