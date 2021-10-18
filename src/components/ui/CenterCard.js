// Style
import { Row, Col, Card } from 'antd';

const CenterCard = ({ children, title, style }) => {
  return (
    <Row justify="center" style={style && style}>
      <Col style={{ backgroundColor: 'black' }}>
        <Card style={{ maxWidth: 480 }} title={title}>
          {children}
        </Card>
      </Col>
    </Row>
  );
};

export default CenterCard;
