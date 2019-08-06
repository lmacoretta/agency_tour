import React from 'react';
import { Link } from 'react-router-dom';

const ProfileMenu = () => {
  const links = [
    {
      name: 'Ajustes',
      to: '/me'
    },

    {
      name: 'Mis reservas',
      to: '/me/reserva'
    },

    {
      name: 'Mis comentarios',
      to: '/me/mis_comentarios'
    },

    {
      name: 'Facturacion',
      to: '/me/facturacion'
    }
  ];

  return (
    <nav className="profile__nav">
      <ul className="profile__list u-margin-top-small">
        {links.map(item => (
          <li className="profile__item">
            <Link to={item.to} className="profile__link">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="legal">&copy; 2019, Leandro Macoretta.</div>
    </nav>
  );
};

export default ProfileMenu;
