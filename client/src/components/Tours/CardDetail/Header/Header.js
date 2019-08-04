import React, { Fragment } from 'react';

import './header.scss';

const Header = () => {
  return (
    <Fragment>
      <section className="section__header">
        <div className="header__text-box">
          <h1 className="heading-primary">Exploracion Maritima Tour</h1>
        </div>

        <div className="card-data">
          <div className="card__icon-container">
            <svg className="card-icon">
              <use xlinkHref="images/sprite.svg#icon-clock"></use>
            </svg>
            <span>7, dias</span>
          </div>

          <div className="card__icon-container">
            <svg className="card-icon">
              <use xlinkHref="images/sprite.svg#icon-location-pin"></use>
            </svg>
            <span>Miami, USA</span>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Header;
