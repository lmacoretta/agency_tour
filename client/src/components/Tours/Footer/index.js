import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <img
        src="/images/logo-green-small.png"
        alt="Logo"
        className="footer__img"
      />

      <div>
        <div>
          <a href="#" className="footer__link">
            Sobre nosotros
          </a>
          <a href="#" className="footer__link">
            Descargar app
          </a>
          <a href="#" className="footer__link">
            Conviertete en guia
          </a>
          <a href="#" className="footer__link">
            Carreras
          </a>
          <a href="#" className="footer__link">
            Contacto
          </a>
        </div>

        <p className="footer__copyright">&copy; 2019, Leandro Macoretta</p>
      </div>
    </footer>
  );
};

export default Footer;
