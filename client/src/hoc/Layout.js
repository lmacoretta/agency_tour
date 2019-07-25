import React from 'react';

import './layout.scss';

/** Components */
import Header from '../components/Tours/Header';

const Landing = props => {
  return (
    <div className="container">
      <Header />
      {props.children}
    </div>
  );
};

export default Landing;
