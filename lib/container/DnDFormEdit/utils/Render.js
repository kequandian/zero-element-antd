"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Render;

var _react = _interopRequireWildcard(require("react"));

var _type = _interopRequireDefault(require("../type"));

var _RowTool = _interopRequireDefault(require("./components/RowTool"));

function Render(props) {
  var config = props.config,
      dispatch = props.dispatch;
  var type = config.type,
      tips = config.tips,
      items = config.items,
      options = config.options;
  var Component = match(type);

  if (type === 'Canvas') {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(Component, props, items.map(function (config) {
      return /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
        key: config.id
      }, /*#__PURE__*/_react["default"].createElement(Render, {
        config: config,
        dispatch: dispatch
      }));
    })));
  }

  if (tips) {
    return /*#__PURE__*/_react["default"].createElement(_RowTool["default"], {
      dispatch: dispatch,
      config: config,
      component: /*#__PURE__*/_react["default"].createElement(Component, props)
    });
  }

  var base = options.base,
      _options$rules = options.rules,
      rules = _options$rules === void 0 ? {} : _options$rules;
  var _base$label = base.label,
      label = _base$label === void 0 ? {} : _base$label;
  var labelClassNames = ['ZEleA-Form-item-label', rules.required && rules.required.value ? 'ZEleA-Form-item-required' : '', label.value ? 'ZEleA-Form-item-label-colon' : ''];
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, label.value ? /*#__PURE__*/_react["default"].createElement("label", {
    className: labelClassNames.join(' ')
  }, label.value) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-Form-item-element"
  }, /*#__PURE__*/_react["default"].createElement(Component, props)));
}

function match(type) {
  return _type["default"][type] || function () {
    return /*#__PURE__*/_react["default"].createElement("div", null, "\u672A\u77E5\u7684\u7C7B\u578B: ", type);
  };
}