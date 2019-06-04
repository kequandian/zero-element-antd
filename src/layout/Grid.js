import React from 'react';
import { Row, Col } from 'antd';

export default function Grid(props) {
  const { children } = props;
  return <Row gutter={{
    xs: 1,
    sm: 2,
    md: 4,
  }}>
    {React.Children.map(children, (child) => {
      const { props = {} } = child;
      const { span = 24, md = span, sm = (md * 2 > 24 ? 24 : md * 2) } = props;
      return <Col sm={sm} md={md}>
        {child}
      </Col>
    })}
  </Row>
}