import React from 'react';
import PropTypes from 'prop-types';

const Display = ({value}) => {
  return (
    <section>{value}</section>
  )
};

Display.propTypes = {
  value: PropTypes.any.isRequired
};

export default Display;
