import React from 'react';
import PropTypes from 'prop-types';

import './picture.scss';

const Picture = () => {
  return (
    <div className="picture">
      <div className="picture__container">
        <img
          src="/images/tours/tour-2-1.jpg"
          alt="Image-1"
          className="picture__img"
        />
      </div>

      <div className="picture__container">
        <img
          src="/images/tours/tour-2-2.jpg"
          alt="Image-1"
          className="picture__img"
        />
      </div>

      <div className="picture__container">
        <img
          src="/images/tours/tour-2-3.jpg"
          alt="Image-1"
          className="picture__img"
        />
      </div>
    </div>
  );
};

Picture.propTypes = {};

export default Picture;
