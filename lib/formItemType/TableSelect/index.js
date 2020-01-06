"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TableSelectWrapped;

var _react = _interopRequireDefault(require("react"));

var _zeroElement = _interopRequireDefault(require("zero-element"));

function TableSelectWrapped(props) {
  var value = props.value,
      options = props.options,
      namespace = props.namespace,
      onChange = props.onChange;
  var API = options.API,
      fields = options.fields,
      searchFields = options.searchFields,
      mountFetch = options.mountFetch;
  config.items[0].config.share = "".concat(namespace, "_tableSelect");

  if (searchFields) {
    config.items[0].config.fields = searchFields;
    config.items[0].config.layoutConfig = {
      value: [8, 8, 8],
      collapse: 2
    };
  }

  config.items[1].config.share = "".concat(namespace, "_tableSelect");
  config.items[1].config.API = {
    listAPI: API
  };
  config.items[1].config.fields = fields;
  return _react["default"].createElement(_zeroElement["default"], {
    MODAL: true,
    namespace: namespace,
    options: options,
    onChange: onChange,
    value: value,
    config: config,
    mountFetch: mountFetch
  });
}

var config = {
  layout: 'Empty',
  items: [{
    layout: 'Empty',
    component: 'BaseSearch',
    config: {
      share: '',
      layoutConfig: {
        value: [14, 10]
      },
      fields: [{
        label: '搜索',
        field: 'search',
        type: 'input',
        placeholder: '请输入搜索内容...'
      }]
    }
  }, {
    layout: 'Empty',
    component: 'TableSelect',
    config: {
      share: '',
      API: {
        listAPI: ''
      },
      fields: []
    }
  }]
};