import React from 'react';
import PropTypes from 'prop-types';

const NormalLayout = ({ children }) => {
  console.log('normal layout');
  return <div>{children}</div>;
};

NormalLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default NormalLayout;
