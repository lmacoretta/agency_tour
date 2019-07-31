import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './description.scss';

const Description = props => {
  return (
    <Fragment>
      <section className="description">
        <div className="overview-box">
          <h2 className="heading-secundary u-mb-large">Info rapida</h2>
          <div className="content">
            <div className="content__data">
              <svg className="card-icon">
                <use xlinkHref="images/sprite.svg#icon-clock"></use>
              </svg>
              <span className="content-text">Siguiente Fecha</span>
              <span className="content-date">Junio, 2021</span>
            </div>

            <div className="content__data">
              <svg className="card-icon">
                <use xlinkHref="images/sprite.svg#icon-area-graph"></use>
              </svg>
              <span className="content-text">Dificultad</span>
              <span className="content-date">Medio</span>
            </div>

            <div className="content__data">
              <svg className="card-icon">
                <use xlinkHref="images/sprite.svg#icon-user"></use>
              </svg>
              <span className="content-text">Participantes</span>
              <span className="content-date">15 personas</span>
            </div>

            <div className="content__data">
              <svg className="card-icon">
                <use xlinkHref="images/sprite.svg#icon-star-outlined"></use>
              </svg>
              <span className="content-text">Rating</span>
              <span className="content-date">4.8 / 5</span>
            </div>
          </div>
          <div className="guides">
            <h2 className="heading-secundary">Guias del tour</h2>

            <div className="guides__info">
              <img
                src="/images/Users/user-3.jpg"
                alt="Lead guide"
                className="guides__img"
              />
              <span className="content-text">Guia lider</span>
              <span className="content-date">Jennifer Hardy</span>
            </div>

            <div className="guides__info">
              <img
                src="/images/Users/user-17.jpg"
                alt="Lead guide"
                className="guides__img"
              />
              <span className="content-text">Guia Turistica</span>
              <span className="content-date">Carlos Baute</span>
            </div>
          </div>
        </div>

        <div className="description-box">
          <div>
            <h2 className="heading-secundary u-mb-large">
              Sobre The Sea Explorer Tour
            </h2>

            <p className="description__text">
              Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </p>

            <p className="description__text">
              Irure dolor in reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Description.propTypes = {};

export default Description;
