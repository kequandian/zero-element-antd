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
    if (fields.length) {
      rst.push({
        key: 'overage',
        layout: 'Grid',
        value: value || [12, 12],
        items: fields,
      });
    }

    return rst.map(row => {
      const { layout, items, ...rest } = row;
      return <Render n={layout} {...rest}>
        {items}
      </Render>
    })
  }

  if (value && Array.isArray(value)) {
    const rst = [];
    // 使用 toArray 会自动 filter null
    React.Children.toArray(children).forEach(child => {
      const preRow = rst[rst.length - 1];
      if (preRow && preRow.items && preRow.items.length !== 0) {
        const count = preRow.items.reduce((pre, v, i) =>
          pre + (v.props.span || value[i])
          , 0);

        if (count >= 24 || isNaN(count)) {
          rst.push({
            items: [],
          });
        }
      } else {
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
          if (child) {
            const { props = {} } = child;
            const { span } = props;
            return <Col key={i} sm={span || value[i]}>
              {child}
            </Col>
          }

          return null;
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
      if (child) {
        const { props = {} } = child;
        const { span = 24, md = span, sm = (md * 2 > 24 ? 24 : md * 2) } = props;
        return <Col sm={sm} md={md}>
          {child}
        </Col>
      }

      return null;
    })}
  </Row>
}