import React, { Fragment } from 'react';

/** Components */
import Navbar from '../components/Tours/Navbar';

const Landing = props => {
  return (
    <Fragment>
      <Navbar />
      {props.children}
    </Fragment>
  );
};

export default Landing;
