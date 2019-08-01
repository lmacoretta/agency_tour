import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/** Components */
import Header from './Header/Header';
import Description from './Description';
import Picture from './Picture';
import MapGL from './MapGL';

const CardDetail = () => {
  return (
    <Fragment>
      <Header />
      <Description />
      <Picture />
      <MapGL />
    </Fragment>
  );
};

CardDetail.propTypes = {};

export default CardDetail;
