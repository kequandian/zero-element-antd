import React from 'react';
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
    searchItems = []
  } = options;
  const namespace = 'test';
  const form = {
    getFieldsValue: _ => {}
  };
  const model = {};
  const layout = 'Grid';
  const value = [6, 6, 6, 6];
  const fields = searchItems.map(field => getFormItem(field, model, {
    namespace,
    form,
    handle: {}
  }));
  return /*#__PURE__*/React.createElement(Render, {
    n: "SearchLayout"
  }, /*#__PURE__*/React.createElement(Render, {
    n: layout,
    value: value
  }, React.Children.toArray(fields), /*#__PURE__*/React.createElement(Button, {
    type: "primary"
  }, "\u641C\u7D22")));
}