import React, { Fragment } from 'react';

import './header.scss';

const Header = () => {
  return (
    <Fragment>
      <header className="header">
        <div className="logo-box">
          <img src="/images/logo-white.png" alt="" className="logo" />
        </div>

        <div className="text-box">
          <h1 className="heading-primary">
            <span className="heading-primary-main">Al aire libre</span>
            <span className="heading-primary-sub">es donde la vida sucede</span>
          </h1>
        </div>

        <div className="btn-box">
          <a href="#" className="btn btn-white btn-animated">
            Descubre nuestros tours
          </a>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
