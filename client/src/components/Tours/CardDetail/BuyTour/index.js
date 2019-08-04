import React from 'react';

import './cta.scss';

const BuyTour = () => {
  return (
    <section className="section__cta">
      <div className="cta">
        <div className="cta__logo">
          <img
            src="/images/logo-green-round.png"
            alt="Logo"
            className="cta__img"
          />
        </div>

        <div className="cta__content">
          <div>
            <h2 className="heading-secundary cta__title">
              ¿Que estas esperando?
            </h2>
            <p className="cta__text">
              7 dias, 1 aventura. Recuerdos inifinitos. Haz tu sueño realidad!
            </p>
          </div>
          <div>
            <a href="#" className="btn btn--green">
              Comprar el tour ahora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyTour;
