import React from 'react';
import { Render } from 'zero-element/lib/config/layout';
import { Row, Col } from 'antd';
export default function SearchLayout(props) {
  const {
    value,
    children
  } = props;

  if (value && Array.isArray(value)) {
    const rst = []; // 使用 toArray 会自动 filter null

    React.Children.toArray(children).forEach(child => {
      const preRow = rst[rst.length - 1];

      if (preRow && preRow.items && preRow.items.length !== 0) {
        const count = preRow.items.reduce((pre, v, i) => pre + (v.props.span || value[i]), 0);

        if (count >= 24 || isNaN(count)) {
          rst.push({
            items: []
          });
        }
      } else {
        rst.push({
          items: []
        });
      }

      rst[rst.length - 1].items.push(child);
    });
    return rst.map((row, i) => {
      return /*#__PURE__*/React.createElement("div", {
        className: "newRow",
        key: i
        /* gutter={{
        xs: 1,
        sm: 2,
        md: 4,
        }} */

      }, row.items.map((child, i) => {
        const {
          props = {}
        } = child;
        const {
          span
        } = props;
        return /*#__PURE__*/React.createElement("div", {
          className: "newCol",
          key: i,
          sm: span || value[i]
        }, child);
      }));
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-Layout-SearchLayout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "SearchLayout-Row" // gutter={{
    //   xs: 1,
    //   sm: 2,
    //   md: 4,
    // }}

  }, React.Children.map(children, child => {
    const {
      props = {}
    } = child;
    const {
      span = 24,
      md = span,
      sm = md * 2 > 24 ? 24 : md * 2
    } = props;
    return /*#__PURE__*/React.createElement("div", {
      className: "SearchLayout-Col",
      style: {
        width: "500px"
      }
    }, child);
  })));
}