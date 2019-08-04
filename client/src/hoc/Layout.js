import React, { Fragment } from 'react';

/** Components */
import Navbar from '../components/Tours/Navbar';
import Footer from '../components/Tours/Footer';

const Landing = props => {
  return (
    <Fragment>
      <Navbar />
      {props.children}
      <Footer />
    </Fragment>
  );
};

export default Landing;
