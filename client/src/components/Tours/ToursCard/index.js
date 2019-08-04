import React from 'react';
import { Link } from 'react-router-dom';

import './tourCard.scss';

const ToursCard = () => {
  return (
    <div className="main">
      <div className="card-container">
        <div className="card">
          <div className="card__header">
            <div className="card__picture">
              <div className="card__picture-overlay"></div>
              <img
                src="/images/img-8.jpg"
                alt="Imagen"
                className="card__picture-img"
              />
            </div>
            <h3 className="heading-tertiary">
              <span>Exploracion maritima</span>
            </h3>
          </div>
          <div className="card__details">
            <h4 className="card__sub-heading">Medio 7-Dias tour</h4>
            <p className="card__text">
              Explora la asombrosa costa de EEUU a pie y en barco.
            </p>
            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="images/sprite.svg#icon-location-pin"></use>
              </svg>
              <span>Miami, USA</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="images/sprite.svg#icon-calendar"></use>
              </svg>
              <span>Junio 2021</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="images/sprite.svg#icon-flag"></use>
              </svg>
              <span>4 paradas</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="images/sprite.svg#icon-user"></use>
              </svg>
              <span>15 personas</span>
            </div>
          </div>
          <div className="card__footer">
            <p>
              <span className="card__footer-price">$ 497</span>
              <span className="card__footer-text"> por persona</span>
            </p>
            <p className="card__rating">
              <span className="card__footer-price">4.8</span>
              <span className="card__footer-text"> rating (6)</span>
            </p>
            <Link to="/details" className="btn btn--green btn--small">
              Detalle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToursCard;
