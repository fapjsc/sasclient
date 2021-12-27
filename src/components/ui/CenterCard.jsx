import React from 'react';
import PropTypes from 'prop-types';

// Style
import { Row, Col, Card } from 'antd';

const CenterCard = ({ children, title, style }) => (
  <Row justify="center" style={style && style}>
    <Col>
      <Card style={{ maxWidth: 480 }} title={title}>
        {children}
      </Card>
    </Col>
  </Row>
);

CenterCard.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.shape().isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default CenterCard;
