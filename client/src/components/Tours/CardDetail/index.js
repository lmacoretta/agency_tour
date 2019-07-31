import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/** Components */
import Header from './Header/Header';
import Description from './Description';

const CardDetail = () => {
  return (
    <Fragment>
      <Header />
      <Description />
    </Fragment>
  );
};

CardDetail.propTypes = {};

export default CardDetail;
