import React, { Fragment } from 'react';

import ProfileMenu from '../ProfileMenu';

const UserMenu = props => {
  return (
    <div className="profile__container">
      <div className="profile__view">
        <ProfileMenu />
        {props.children}
      </div>
    </div>
  );
};

export default UserMenu;
