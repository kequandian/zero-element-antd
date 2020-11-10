import React, { useState } from 'react';
import { Button } from 'antd';
import { getFormItem } from "../../../utils/readConfig";
import { Render } from 'zero-element/lib/config/layout';
export default function Search({
  config
}) {
  const {
    options = {}
  } = config;
  const {
    searchItems = [],
    config: cfg
  } = options;
  const {
    collapse
  } = cfg;
  const collapseValue = collapse && collapse.value;
  const namespace = 'test';
  const form = {
    getFieldsValue: _ => {}
  };
  const model = {};
  const [expand, setExpand] = useState(false);
  const layout = 'Grid';
  const value = [6, 6, 6, 6];

  function renderFooter(validLength) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      type: "primary"
    }, "\u641C\u7D22"), validLength > collapseValue ? /*#__PURE__*/React.createElement(ExpandButton, {
      expand: expand,
      onExpand: handleExpand,
      onCollapse: handleCollapse
    }) : null);
  }

  function handleExpand() {
    setExpand(true);
  }

  function handleCollapse() {
    setExpand(false);
  }

  const fields = searchItems.map(field => getFormItem(field, model, {
    namespace,
    form,
    handle: {}
  }));
  const validLength = fields.length;

  if (expand === false) {
    fields.splice(collapseValue);
  }

  fields.splice(collapseValue, 0, renderFooter(validLength));
  return /*#__PURE__*/React.createElement(Render, {
    n: "SearchLayout"
  }, /*#__PURE__*/React.createElement(Render, {
    n: layout,
    value: value
  }, React.Children.toArray(fields)));
}

function ExpandButton({
  expand,
  onExpand,
  onCollapse
}) {
  if (expand === null) return null;

  if (expand) {
    return /*#__PURE__*/React.createElement(Button, {
      type: "link",
      onClick: onCollapse
    }, "\u6536\u8D77");
  } else {
    return /*#__PURE__*/React.createElement(Button, {
      type: "link",
      onClick: onExpand
    }, "\u5C55\u5F00");
  }
}