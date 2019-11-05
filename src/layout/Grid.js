import React from 'react';
import { Render } from 'zero-element-global/lib/layout';
import { Row, Col } from 'antd';

export default function Grid(props) {
  const { layoutArea, value, children } = props;

  if (layoutArea && Array.isArray(layoutArea)) {
    const fields = React.Children.toArray(children);
    const rst = [];
    layoutArea.forEach((rowLayout, i) => {
      rst.push({
        key: i,
        layout: rowLayout.layout,
        value: rowLayout.value,
        items: fields.splice(0, rowLayout.length)
      })
    });

    return rst.map(row => {
      const { layout, items, ...rest } = row;
      return <Render n={layout} {...rest}>
        {items}
      </Render>
    })
  }

  if (value && Array.isArray(value)) {
    const rowSize = value.length;
    const rst = [];
    // 使用 toArray 会自动 filter null
    React.Children.toArray(children).forEach((child, i) => {
      if (i % rowSize === 0) {
        rst.push({
          items: [],
        });
      }
      rst[rst.length - 1].items.push(child);
    })
    return rst.map((row, i) => {
      return <Row key={i} gutter={{
        xs: 1,
        sm: 2,
        md: 4,
      }}>
        {row.items.map((child, i) => {
          const { props = {} } = child;
          const { span } = props;
          return <Col key={i} sm={span || value[i]}>
            {child}
          </Col>
        })}
      </Row>
    })
  }

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