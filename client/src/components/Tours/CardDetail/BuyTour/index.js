import React from 'react';
import { Link } from 'react-router-dom';

const BuyTour = () => {
  const isAuthenticated = true;

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
            {isAuthenticated ? (
              <Link href="#" className="btn btn--green">
                Reservar el tour ahora
              </Link>
            ) : (
              <Link href="#" className="btn btn--green">
                Inicie sesión para reservar
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyTour;
